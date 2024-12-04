package com.example.demo.service;

import com.example.demo.data.Game;
import com.example.demo.data.GameDto;
import com.example.demo.data.Move;
import com.example.demo.data.User;
import com.example.demo.repositories.GameRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public Integer createNewGame(GameDto gameDto){
        gameDto.setInProgress(true);
        gameDto.setWinner(0);
        gameDto.setMyMoves(new ArrayList<>());
        gameDto.setOpponentMoves(new ArrayList<>());
        gameDto.setOpponentNumber(NumberFunctions.generateRandomNumber());
        OptimalPlay optimalPlay = new OptimalPlay(gameDto.getMyNumber() );
        gameDto.setFutureOpponentMoves(optimalPlay.play());
        User user = userRepository.findById(gameDto.getUserId()).get();
        Game savedGame = gameRepository.save(GameConverter.DtoToEntity(gameDto, user));
        return savedGame.getId();
    }

    public GameDto getGame(Integer gameId){
        Optional <Game> game = gameRepository.findById(gameId);
        if(!game.isPresent()){
            return null;
        }
        return GameConverter.EntityToDto(game.get());
    }

    public List <GameDto> getAllGames(){
        List<Game> games = gameRepository.findAll();
        List <GameDto> gameDtos = new ArrayList<>();
        for(Game game : games){
            gameDtos.add(GameConverter.EntityToDto(game));
        }
        return gameDtos;
    }

    public Move addMove(Integer gameId, Integer turn, String guessedNumber){
        Game game = gameRepository.findById(gameId).get();
        List <Integer> ans;
        Move newMove;
        if(turn % 2 == 0) {
            ans = NumberFunctions.getCenteredAndGuessed(guessedNumber, game.getOpponentNumber());
            newMove = new Move(guessedNumber, ans.get(0), ans.get(1));
            List<Move> myNewMoves = game.getMyMoves();
            myNewMoves.add(newMove);
            game.setMyMoves(myNewMoves);
        }
        else {
            newMove = game.getFutureOpponentMoves().get(game.getOpponentMoves().size());
            List<Move> opponentNewMoves = game.getOpponentMoves();
            opponentNewMoves.add(newMove);
            game.setOpponentMoves(opponentNewMoves);
        }
        gameRepository.save(game);
        return newMove;
    }

    public void endGame(Integer gameId, Integer win){
        Game game = gameRepository.findById(gameId).get();
        game.setInProgress(false);
        game.setWinner(win);
        gameRepository.save(game);
    }

    public void deleteGame(Integer gameId){
        gameRepository.deleteById(gameId);
    }
}
