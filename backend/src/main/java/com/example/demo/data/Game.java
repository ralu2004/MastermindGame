package com.example.demo.data;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="game")
public class Game {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "in_progress")
    private boolean inProgress;

    @Column( name = "winner" )
    private int winner;

    @Column( name = "my_number" )
    private String myNumber;

    @Column( name = "opponent_number" )
    private String opponentNumber;

    @ElementCollection( targetClass = Move.class, fetch = FetchType.EAGER )
    @Column( name = "my_moves" )
    private List<Move> myMoves;

    @ElementCollection( targetClass = Move.class, fetch = FetchType.EAGER )
    @Column( name = "opponent_moves" )
    private List<Move> opponentMoves;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ElementCollection(targetClass = Move.class, fetch = FetchType.EAGER)
    @Column(name = "opponent_moves")
    private List <Move> futureOpponentMoves;

    public Game() {
    }

    public Game(Integer id, boolean inProgress, int winner, String myNumber, String opponentNumber, List<Move> myMoves, List<Move> opponentMoves, User user, List<Move> futureOpponentMoves) {
        this.id = id;
        this.inProgress = inProgress;
        this.winner = winner;
        this.myNumber = myNumber;
        this.opponentNumber = opponentNumber;
        this.myMoves = myMoves;
        this.opponentMoves = opponentMoves;
        this.futureOpponentMoves = futureOpponentMoves;
        this.user = user;
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

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}