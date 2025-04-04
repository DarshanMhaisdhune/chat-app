package com.company.chat.exception;

public class RoomAlreadyExistsException extends RuntimeException{

    public RoomAlreadyExistsException(String msg){
        super(msg);
    }
}
