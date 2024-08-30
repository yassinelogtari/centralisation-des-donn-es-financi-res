package com.upload.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.upload.app.dto.UserDto;
import com.upload.app.entity.User;
import com.upload.app.repository.UserRepository;
import com.upload.app.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;

    //register
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        String result = userService.registerUser(userDto);
        if (result.equals("User registered successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
        Map<String, Object> userDetails = userService.loginUser(userDto.getEmail(), userDto.getMdp());
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    //users count
    @GetMapping("/users/count")
    public ResponseEntity<Long> countUser() {
        long count = userService.countUsers();
        return ResponseEntity.ok(count);
    }
    
    //get all users
    @GetMapping("/users/getAll")
    public ResponseEntity<List<User>>getAllUsers(){
    	 List<User> userList = userRepository.findAll();
         return ResponseEntity.ok(userList);
    }
    
    //change password 
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> request) {
        Long userId = Long.parseLong(request.get("userId"));
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");
        String result = userService.changePassword(userId, currentPassword, newPassword);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        
        if (result.equals("Password changed successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        String result = userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        
        if (result.equals("User deleted successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
