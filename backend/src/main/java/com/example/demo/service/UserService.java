package com.example.demo.service;

import com.example.demo.data.UserDto;
import com.example.demo.data.User;
import com.example.demo.repositories.GameRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    public UserDto findByName(String name) {
        Optional<User> user = userRepository.findByName(name);
        if(!user.isPresent())
            return null;
        UserDto userDto = UserConverter.EntityToDto(user.get());
        return userDto;
    }

    public UserDto findById(Integer id){
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent())
            return null;
        UserDto userDto = UserConverter.EntityToDto(user.get());
        return userDto;
    }

    public List<UserDto> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for (User user : users) {
            userDtos.add(UserConverter.EntityToDto(user));
        }
        return userDtos;
    }

    public UserDto createUser(UserDto userDto) {
        Optional <User> userExists = userRepository.findByName(userDto.getName());
        if(userExists.isPresent())
            return null;
        User userEntity = UserConverter.DtoToEntity(userDto, null);
        userEntity = userRepository.save(userEntity);
        return UserConverter.EntityToDto(userEntity);
    }

    public Integer verifyUser(UserDto userDto) {
        UserDto foundUser = this.findByName(userDto.getName());
        if(foundUser != null){
            if(userDto.getPassword().equals(foundUser.getPassword())) {
                return foundUser.getId();
            }
        }
        return -1;
    }

    public String deleteUser(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            return "User not found!";
        }
        User userEntity = user.get();
        userRepository.delete(userEntity);
        return "User deleted!";
    }

    public UserDto updateUser(Integer id, UserDto userDto) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            return null;
        }
        User userEntity = user.get();
        if(userDto.getName() != null) {
            userEntity.setName(userDto.getName());
        }
        if(userDto.getPassword() != null) {
            userEntity.setPassword(userDto.getPassword());
        }
        //handle user games here
        userRepository.save(userEntity);
        return UserConverter.EntityToDto(userEntity);
    }
}