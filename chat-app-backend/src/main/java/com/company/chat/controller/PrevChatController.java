package com.company.chat.controller;


import com.company.chat.dto.ChatMessage;
import com.company.chat.service.PrevChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/messages")
@CrossOrigin("http://localhost:5173")
public class PrevChatController {

    private final PrevChatService prevChatService;

    @Autowired
    public PrevChatController(PrevChatService prevChatService) {
        this.prevChatService = prevChatService;
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getChatHistory(@PathVariable String roomId){
        try {
           List<ChatMessage> chatMessages = prevChatService.getPrevChat(roomId);
           return  ResponseEntity.ok(chatMessages);
        }
        catch (Exception e){
            log.error("Error fetching chat history: ", e);
            return  ResponseEntity.badRequest().body("Failed to retrieve chat history");
        }

    }
}
