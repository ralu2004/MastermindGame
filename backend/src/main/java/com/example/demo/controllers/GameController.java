package com.example.demo.controllers;

import com.example.demo.data.GameDto;
import com.example.demo.data.Move;
import com.example.demo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api/game"})
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<Integer> startGame(@RequestBody GameDto gameDto) {
        return ResponseEntity.ok().body(this.gameService.createNewGame(gameDto));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<GameDto> getGame(@PathVariable Integer id) {
        return ResponseEntity.ok().body(this.gameService.getGame(id));
    }

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames() {
        return ResponseEntity.ok().body(this.gameService.getAllGames());
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<Move> updateGame(@PathVariable Integer id, @RequestParam Integer turn, @RequestParam String guessedNumber) {
        return ResponseEntity.ok().body(this.gameService.addMove(id, turn, guessedNumber));
    }

    @PutMapping
    public void endGame(@RequestParam Integer id, @RequestParam Integer win) {
        this.gameService.endGame(id, win);
    }

    @DeleteMapping({"/{id}"})
    public void deleteGame(@PathVariable Integer id) {
        this.gameService.deleteGame(id);
    }
}

