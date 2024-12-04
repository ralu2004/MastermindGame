package com.example.demo.data;

import jakarta.persistence.Embeddable;

@Embeddable
public class Move {
    private String guessedNumber;
    private int centered;
    private int guessed;

    public Move() {
    }

    public Move(String guessedNumber, int centered, int guessed) {
        this.guessedNumber = guessedNumber;
        this.centered = centered;
        this.guessed = guessed;
    }

    public String getGuessedNumber() {
        return this.guessedNumber;
    }

    public void setGuessedNumber(String guessedNumber) {
        this.guessedNumber = guessedNumber;
    }

    public int getCentered() {
        return this.centered;
    }

    public void setCentered(int centered) {
        this.centered = centered;
    }

    public int getGuessed() {
        return this.guessed;
    }

    public void setGuessed(int guessed) {
        this.guessed = guessed;
    }
}
