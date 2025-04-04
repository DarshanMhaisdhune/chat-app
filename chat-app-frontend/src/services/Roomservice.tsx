import { httpClient } from "../config/AxiosProvider"

type RoomDetails ={
    roomId:string

}

export const createRoomApi = async(roomId:RoomDetails)=>{
    const response = await httpClient.post(`/api/v1/rooms`, roomId,{
        headers:{
            'Content-Type':'application/json'
        }       
    });
    return response.data;

};

export const joinRoomApi = async(roomId: string)=>{
    const response = await httpClient.get(`/api/v1/rooms/${roomId}`,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data;

};

export const createUSerApi = async(userName: string)=>{
    const response = await httpClient.post(`/api/v1/rooms/users`, userName,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data;
};

export const joinRoomValidateApi = async(roomId:string, userName:string)=>{
    const response = await httpClient.post(`/api/v1/rooms/join}`,{roomId,userName},{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data;
}