package com.company.chat.service;

import com.company.chat.dto.UserDTO;
import com.company.chat.entity.User;
import com.company.chat.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUserIfNoUser(UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findByUsername(userDTO.getUsername());
        if (existingUser.isPresent()) {
            return convertToDto(existingUser.get());
        } else {
            User newUser = new User();
            newUser.setUsername(userDTO.getUsername());
            User savedUser = userRepository.save(newUser);
            return convertToDto(savedUser);
        }
    }

    private UserDTO convertToDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setUsername(user.getUsername());
        return dto;
    }
}