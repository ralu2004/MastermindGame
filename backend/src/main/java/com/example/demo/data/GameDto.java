package com.example.demo.data;

import java.util.List;

public class GameDto {
    private Integer id;
    private boolean inProgress;
    private int winner;
    private String myNumber;
    private String opponentNumber;
    private List<Move> myMoves;
    private List<Move> opponentMoves;
    private List<Move> futureOpponentMoves;
    private Integer userId;

    public GameDto() {
    }

    public GameDto(Integer id, boolean inProgress, int winner, String myNumber, String opponentNumber, List<Move> myMoves, List<Move> opponentMoves, List<Move> futureOpponentMoves, Integer userId) {
        this.id = id;
        this.inProgress = inProgress;
        this.winner = winner;
        this.myNumber = myNumber;
        this.opponentNumber = opponentNumber;
        this.myMoves = myMoves;
        this.opponentMoves = opponentMoves;
        this.futureOpponentMoves = futureOpponentMoves;
        this.userId = userId;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isInProgress() {
        return this.inProgress;
    }

    public void setInProgress(boolean inProgress) {
        this.inProgress = inProgress;
    }

    public int getWinner() {
        return this.winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }

    public String getMyNumber() {
        return this.myNumber;
    }

    public void setMyNumber(String myNumber) {
        this.myNumber = myNumber;
    }

    public String getOpponentNumber() {
        return this.opponentNumber;
    }

    public void setOpponentNumber(String opponentNumber) {
        this.opponentNumber = opponentNumber;
    }

    public List<Move> getMyMoves() {
        return this.myMoves;
    }

    public void setMyMoves(List<Move> myMoves) {
        this.myMoves = myMoves;
    }

    public List<Move> getOpponentMoves() {
        return this.opponentMoves;
    }

    public void setOpponentMoves(List<Move> opponentMoves) {
        this.opponentMoves = opponentMoves;
    }

    public List<Move> getFutureOpponentMoves() {
        return futureOpponentMoves;
    }

    public void setFutureOpponentMoves(List<Move> futureOpponentMoves) {
        this.futureOpponentMoves = futureOpponentMoves;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}


