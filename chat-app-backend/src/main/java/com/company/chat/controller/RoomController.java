package com.company.chat.controller;

import com.company.chat.dto.JoinRoomRequest;
import com.company.chat.dto.RoomDTO;
import com.company.chat.dto.UserDTO;
import com.company.chat.service.RoomService;
import com.company.chat.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {


    private final RoomService roomService;
    private final UserService userService;

    public RoomController(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@RequestBody Map<String, String> resource)  {
        String roomId = resource.get("roomId");
        RoomDTO createdRoom = roomService.createRoomService(roomId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoom);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDTO> joinRoom(@PathVariable String roomId){
        RoomDTO joinRoom = roomService.joinRoomService(roomId);
        return ResponseEntity.ok(joinRoom);

    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDto) {

            UserDTO result = userService.createUserIfNoUser(userDto);
                return ResponseEntity.ok(result);

    }

    @PostMapping("/join")
    public ResponseEntity<String> joinRoom(@RequestBody JoinRoomRequest request) {
        try {
            roomService.joinRoom(request.getRoomId(), request.getUsername());
            return ResponseEntity.ok("Joined room successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to join room: " + e.getMessage());
        }
    }


}
