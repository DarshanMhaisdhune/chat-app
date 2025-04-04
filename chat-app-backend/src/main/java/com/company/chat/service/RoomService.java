package com.company.chat.service;

import com.company.chat.dto.RoomDTO;
import com.company.chat.entity.Room;
import com.company.chat.entity.User;
import com.company.chat.exception.ResourceNotFoundException;
import com.company.chat.exception.RoomAlreadyExistsException;
import com.company.chat.repository.RoomRepository;
import com.company.chat.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public RoomDTO createRoomService(String roomId) {

        if (roomRepository.findByRoomId(roomId).isPresent()) {
            throw new RoomAlreadyExistsException("Room Already Exists!");
        }
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        return new RoomDTO(savedRoom.getRoomId());

    }

    public RoomDTO joinRoomService(String roomId) {

        Optional<Room> room = roomRepository.findByRoomId(roomId);
        if (room.isPresent()) {
            return new RoomDTO(room.get().getRoomId());
        } else {
            throw new ResourceNotFoundException("Room Not Found !");
        }

    }

    public void joinRoom(String roomId, String username) {
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    }






}
