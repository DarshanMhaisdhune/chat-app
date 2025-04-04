package com.company.chat.dto;

import lombok.Data;

@Data
public class JoinRoomRequest {
    private String username;
    private String roomId;
}
