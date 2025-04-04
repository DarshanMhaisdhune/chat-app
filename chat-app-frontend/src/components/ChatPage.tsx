import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { useChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";

export default function ChatPage() {

    type Message = {
        sender: string;
        content: string;
    };
    
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [stompClient, setStompClient] = useState<any>(null);


    const { connected, roomId, currentUser, setConnected, setRoomId, setCurrentUser } = useChatContext();
    console.log(roomId, currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!connected) {
            navigate('/');
        }

    }, [connected, roomId, currentUser])

    useEffect(() => {
        const connectWebSocket = () => {
            const sock = new SockJS("http://localhost:8080/ws-chat");

            const stompClient = new Client({
                webSocketFactory: () => sock,
                reconnectDelay: 5000, // Enable auto-reconnect
                debug: (str) => console.log(str),
            });

            stompClient.onConnect = () => {
                console.log("connected to webSocket");

                stompClient.subscribe("/topic/messages", (messages) => {
                    const receivedMessage: Message = JSON.parse(messages.body);
                    setMessages(prev=> [...prev, receivedMessage]);
                    // console.log("New message received:", JSON.parse(messages.body));
                });

                stompClient.publish({
                    destination: "/app/chat.sendMessage",
                    body: JSON.stringify({
                        sender: "user1",
                        content: "Hello!",
                        roomId: "room123",
                    }),
                });
            };

            stompClient.activate();
        };
        connectWebSocket();
    }, [roomId])


    function leaveChat() {
        setRoomId("");
        setCurrentUser("");
        setConnected(false);
        navigate('/');
    }



    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (newMessage.trim() === "" || !stompClient || !connected) return;

        const chatMessage = {
            sender: currentUser,
            content: newMessage,
            roomId: roomId
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

        setNewMessage("");
    };



    return (
        <div >
            <header className="fixed top-0 w-full flex justify-around items-center bg-green-400 dark:bg-gray-800 dark:text-white lg:text-lg py-2 lg:py-4">
                <div className="flex items-center">
                    <FaUserCircle />
                    <h1 className="text-sm font-bold font-serif my-3 mx-1 text-red-500">{currentUser}</h1>
                </div>
                <h4 className="font-serif my-2">{roomId}</h4>
                <button onClick={leaveChat} className="bg-red-400 hover:bg-red-600 rounded-lg px-2 py-1 m-1 border-2 border-black">Leave</button>
            </header>


            <main className="mb-16 bg-white dark:bg-gray-950 p-4 overflow-y-auto h-screen  md:max-h-[calc(100vh-5rem)]">
                <div className="message_container mt-7 md:mt-10 flex flex-col p-2 rounded">
                    {messages.map((message, index) => (
                        <div key={index} className={`my-3 ${message.sender === "You" ? "self-end" : "self-start"}`}>
                            <p className="text-xs lg:text-sm text-black dark:text-white font-semibold font-sans">{message.sender}</p>
                            <p className="bg-blue-200 w-fit p-2 rounded-lg ">{message.content}</p>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>
            </main>


            <div className="fixed bottom-0 w-full border dark:border-gray-950 bg-green-400 dark:bg-gray-900 dark:text-white lg:text-lg py-2 lg:py-4 h-20 lg:h-24">
                <div className="bg-green-200 dark:bg-gray-900 rounded-lg h-full w-2/3 mx-auto flex items-center px-4">
                    <input

                        type="text"
                        placeholder="Type your message here..."
                        className="px-2 py-1 rounded h-full lg:h-4/5 lg:w-3/4 dark:bg-gray-800 font-serif flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white font-medium px-4 py-3 rounded mx-2" onClick={sendMessage}>
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    );
}
