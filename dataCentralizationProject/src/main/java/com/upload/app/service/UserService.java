package com.upload.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.upload.app.dto.UserDto;
import com.upload.app.entity.Role;
import com.upload.app.entity.User;
import com.upload.app.entity.UserType;
import com.upload.app.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(UserDto userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());

        if (existingUser.isPresent()) {
            return "Email already registered";
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setMdp(userDto.getMdp());
        user.setRole(Role.valueOf(userDto.getRole().toUpperCase()));

        if (user.getRole() == Role.USER) {
            if (userDto.getUserType() == null || userDto.getUserType().isEmpty()) {
                return "User type is required for users with role USER";
            }
            user.setUserType(UserType.valueOf(userDto.getUserType().toUpperCase()));
        } else {
            user.setUserType(null);
        }

        userRepository.save(user);

        return "User registered successfully";
    }

    public Map<String, Object> loginUser(String email, String mdp) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getMdp().equals(mdp)) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.get().getId());
            response.put("email", user.get().getEmail());
            response.put("username", user.get().getUsername());
            response.put("role", user.get().getRole().name());
            if (user.get().getRole() == Role.USER) {
                response.put("userType", user.get().getUserType().name());
            }
            return response;
        } else {
            return null;
        }
    }
    
    public long countUsers() {
        return userRepository.count();
    }
    
    public String changePassword(Long userId, String currentPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return "User not found";
        }

        User user = userOptional.get();
        if (!user.getMdp().equals(currentPassword)) {
            return "Current password is incorrect";
        }

        user.setMdp(newPassword);
        userRepository.save(user);

        return "Password changed successfully";
    }

    public String deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }
}
