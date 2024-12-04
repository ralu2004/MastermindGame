package com.example.demo.controllers;

import com.example.demo.data.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/user")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> getUsers() { return userService.getAllUsers(); }

    @GetMapping("/get-by-id/{id}")
    public UserDto getUser(@PathVariable Integer id){
        return userService.findById(id);
    }
    @GetMapping("/{name}")
    public UserDto getUser(@PathVariable String name) { return userService.findByName(name); }

    @PostMapping
    public ResponseEntity <UserDto> createUser(@RequestBody UserDto userDto) { return ResponseEntity.ok().body(userService.createUser(userDto)); }

    @PostMapping("/login")
    public ResponseEntity<Integer> login(@RequestBody UserDto userDto) { return ResponseEntity.ok().body(userService.verifyUser(userDto)); }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) { return userService.deleteUser(id); }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        return userService.updateUser(id, userDto);
    }
}

