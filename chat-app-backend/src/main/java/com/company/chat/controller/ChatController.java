package com.company.chat.controller;

import com.company.chat.dto.ChatMessage;
import com.company.chat.entity.Message;
import com.company.chat.entity.Room;
import com.company.chat.entity.User;
import com.company.chat.exception.ResourceNotFoundException;
import com.company.chat.repository.MessageRepository;
import com.company.chat.repository.RoomRepository;
import com.company.chat.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;


    @Autowired
    public ChatController(MessageRepository messageRepository,UserRepository userRepository, RoomRepository roomRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage message) {
//        System.out.println("Received Message: " + message);


        User sender = userRepository.findByUsername(message.getSender())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Room room = roomRepository.findByRoomId(message.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found."));

        Message savedMessage = new Message( room,sender, message.getContent());
        messageRepository.save(savedMessage);

        messagingTemplate.convertAndSend("/topic/messages", message);
    }

}
