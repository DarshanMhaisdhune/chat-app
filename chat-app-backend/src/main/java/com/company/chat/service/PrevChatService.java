package com.company.chat.service;

import com.company.chat.dto.ChatMessage;
import com.company.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrevChatService {

    private final MessageRepository messageRepository;

    @Autowired
    public PrevChatService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<ChatMessage> getPrevChat(String roomId) {
        return messageRepository.findMessagesByRoomIdOrdered(roomId)
                .stream()
                .map(msg -> new ChatMessage(
                        msg.getSender() != null ? msg.getSender().getUsername() : "Unknown",
                        msg.getContent(),
                        roomId))
                .collect(Collectors.toList());
    }

}
