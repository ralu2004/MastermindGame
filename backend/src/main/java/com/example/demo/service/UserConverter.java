package com.example.demo.service;

import com.example.demo.data.Game;
import com.example.demo.data.GameDto;
import com.example.demo.data.User;
import com.example.demo.data.UserDto;

import java.util.ArrayList;
import java.util.List;

public class UserConverter {

    public static UserDto EntityToDto(User userEntity) {
        List<Game> gameEntities = userEntity.getGames();
        List<GameDto> gameDtos = new ArrayList<>();
        if(gameEntities != null) {
            for (Game gameEntity : gameEntities) {
                gameDtos.add(GameConverter.EntityToDto(gameEntity));
            }
        }
        return new UserDto(userEntity.getId(), userEntity.getName(), userEntity.getPassword(), gameDtos);
    }

    public static User DtoToEntity(UserDto dto, List<Game> gameEntities) {
        return new User(dto.getId(), dto.getName(), dto.getPassword(), gameEntities);
    }
}