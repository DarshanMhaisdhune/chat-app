import { useState } from 'react';
import chatIcon from '../assets/icons8-chat-96.png';
import toast from 'react-hot-toast';
import { createRoomApi, createUSerApi, joinRoomApi, joinRoomValidateApi } from '../services/Roomservice';
import axios from 'axios';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router';

const Joinpage = () => {

    const [details, setDetails] = useState({
        roomId: "",
        userName: "",
    });

    const { setRoomId, setCurrentUser, setConnected } = useChatContext();
    const navigate = useNavigate();

    function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDetails({
            ...details,
            [event.target.name]: event.target.value
        });
    }

    function validateForm() {
        if (!details.roomId.trim()) {
            toast.error("Room Id cannot be empty!");
            return false;
        }
        if (!details.userName.trim()) {
            toast.error("Username cannot be empty!");
            return false;
        }
        return true;

    }

    async function joinChat() {
        if (validateForm()) {
            try {
                const response = await joinRoomApi(details.roomId);
                // console.log(response);
                const userResponse = await createUSerApi(details.userName);
                const roomResponse = await createRoomApi({ roomId: details.roomId });
                const validateResponse = await joinRoomValidateApi(details.roomId, details.userName);

                setRoomId(response.roomId);
                setCurrentUser(details.userName);

                setConnected(true);
                navigate('/chat');
                toast.success("Joined room successfully!");

            }
            catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 400) {
                        toast.error("Room already exists!");
                    } else {
                        toast.error("Failed to join room!");
                    }
                } else {
                    toast.error("Failed to join room!");
                }
            }
        }

    }
    async function createRoom() {
        if (validateForm()) {
            try {
                const response = await createRoomApi({ roomId: details.roomId });
                // console.log(response);
               
                toast.success("Room created successfully!");
                setRoomId(response.roomId);
                setCurrentUser(details.userName)
                await joinChat();
            }
            catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 409) {
                        toast.error("Room already exists!");
                    } else {
                        toast.error("Failed to create room!");
                    }
                } else {
                    toast.error("Failed to create room!");
                }
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-softGray dark:bg-blue-950">

            <div className="flex flex-col item-center p-4 gap-3 bg-light-background dark:bg-dark-background rounded-lg w-5/6 h-96 lg:w-3/6 lg:h-5/6 border ">
                <div className='flex justify-center'>
                    <img src={chatIcon} alt="ChatIcon" className='lg:w-40' />
                </div>

                <h1 className="text-light-primary dark:text-dark-text font-semibold text-lg lg:text-xl">Join Room / Create Room</h1>

                <div>
                    <label htmlFor="name" className=" block font-medium mb-1 lg:mt-2 text-light-primary dark:text-dark-text lg:text-lg "> Your name</label>
                    <input onChange={handleFormInputChange} value={details.userName} name='userName' placeholder='Enter your name' type="text" id="name" className="w-full lg:w-3/4 py-1 px-1 border dark:border-white bg-light-secondary dark:bg-blue-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label htmlFor="roomId" className=" block font-medium mb-1 lg:mt-2 text-light-primary dark:text-dark-text lg:text-lg ">Room ID/New Room ID</label>
                    <input name='roomId' onChange={handleFormInputChange} value={details.roomId} placeholder='Enter room id..' type="text" id="roomId" className="w-full lg:w-3/4 py-1 px-1 border dark:border-white bg-light-secondary dark:bg-blue-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-center gap-3 my-2 lg:my-4 lg:gap-6">
                    <button onClick={joinChat} className="px-2 py-1 m-2 bg-light-primary dark:bg-dark-primary font-medium rounded-lg text-light-background dark:text-white lg:text-lg         ">
                        Join Room
                    </button>
                    <button onClick={createRoom} className="px-2 py-1 m-2 bg-orange-500 dark:bg-orange-500 font-medium rounded-lg text-light-background dark:text-white lg:text-lg">
                        Create Room
                    </button>
                </div>


            </div>



        </div>
    )
}

export default Joinpage;
