package com.example.demo.service;

import com.example.demo.data.Game;
import com.example.demo.data.GameDto;
import com.example.demo.data.User;

public class GameConverter {
    public GameConverter() {
    }

    public static Game DtoToEntity(GameDto gameDto, User userEntity) {
        return new Game(gameDto.getId(), gameDto.isInProgress(), gameDto.getWinner(), gameDto.getMyNumber(), gameDto.getOpponentNumber(), gameDto.getMyMoves(), gameDto.getOpponentMoves(), userEntity, gameDto.getFutureOpponentMoves());
    }

    public static GameDto EntityToDto(Game game) {
        return new GameDto(game.getId(), game.isInProgress(), game.getWinner(), game.getMyNumber(), game.getOpponentNumber(), game.getMyMoves(), game.getOpponentMoves(), game.getFutureOpponentMoves(), game.getUser().getId());
    }
}

