package com.example.demo.service;

import com.example.demo.data.Move;

import java.util.*;

public class OptimalPlay {
    private List <String> possibleStates;

    private String guess;

    private String numberToBeGuessed;

    private Map<String, Boolean> usedGuess;

    public OptimalPlay() {}
    public OptimalPlay(String numberToBeGuessed){
        this.usedGuess = new HashMap<String, Boolean>();
        this.possibleStates = getAllPossibleStates();
        this.numberToBeGuessed = numberToBeGuessed;
        Random rand = new Random();
        int guessPosition = rand.nextInt(possibleStates.size());
        this.guess = possibleStates.get(guessPosition);
    }

    private List <String> getAllPossibleStates(){
        List <String> ans = new ArrayList<>();
        for(char d1 = '0'; d1 <= '9'; ++d1)
            for(char d2 = '0'; d2 <= '9'; ++d2)
                if(d1 != d2)
                    for(char d3 = '0'; d3 <= '9'; ++d3)
                        if(d1 != d3 && d2 != d3)
                            for(char d4 = '0'; d4 <= '9'; ++d4)
                                if(d1 != d4 && d2 != d4 && d3 != d4) {
                                    String nr = "";
                                    nr = nr + d1 + d2 + d3 + d4;
                                    ans.add(nr);
                                    usedGuess.put(nr, false);
                                }
        return ans;
    }

    private List <Integer> getFeedback(String guess, String number){
        return NumberFunctions.getCenteredAndGuessed(guess, number);
    }

    private List <String> newPossibleStatesAfterGuess(String guessedNumber, int centered, int guessed){
        List <String> newPossibleStates = new ArrayList<>();
        for(int i = 0; i < possibleStates.size(); i++){
            String state = possibleStates.get(i);
            int c = getFeedback(state, guessedNumber).get(0);
            int g = getFeedback(state, guessedNumber).get(1);
            if(c == centered && g == guessed)
                newPossibleStates.add(state);
        }
        return newPossibleStates;
    }

    private String calculateNewGuess(){
        /*
            for each unused guess
                for each (centered, guess) pair
                    calculate number of states that remain in newPossibleState
                    and take max
            From maxs take the minimum max
            and in case of equality take the guess that is minimum and is in possibleStates
         */
        int minim = 2000000000;
        String nextGuess = "";
        for(Map.Entry<String, Boolean> entry : usedGuess.entrySet()){
            if(!entry.getValue()){
                int maxim = 0;
                for(int c = 0; c <= 4; ++c){
                    for(int g = 0; c + g <= 4; ++g){
                        int remainingStates = newPossibleStatesAfterGuess(entry.getKey(), c, g).size();
                        if(remainingStates > maxim){
                            maxim = remainingStates;
                        }
                    }
                }
                if(minim > maxim) {
                    minim = maxim;
                    nextGuess = entry.getKey();
                }
                else if(minim == maxim){
                    if(!possibleStates.contains(nextGuess) && possibleStates.contains(entry.getKey())){
                        nextGuess = entry.getKey();
                    }
                }
            }
        }
        return nextGuess;
    }

    public List <Move> play() {
        List <Move> ans = new ArrayList<>();
        int centered = 0;
        int guessed = 0;
        while(centered != 4) {
            usedGuess.put(guess, true);

            centered = getFeedback(guess, numberToBeGuessed).get(0);
            guessed = getFeedback(guess, numberToBeGuessed).get(1);

            ans.add(new Move(guess, centered, guessed));

            possibleStates = newPossibleStatesAfterGuess(guess, centered, guessed);

            guess = calculateNewGuess();
        }
        return ans;
    }
}


