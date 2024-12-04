package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class NumberFunctions {
    public NumberFunctions() {
    }

    public static String generateRandomNumber() {
        Random rand = new Random();
        List<Integer> digits = new ArrayList();
        String ans = "";

        int digit0;
        for(digit0 = 0; digit0 <= 9; ++digit0) {
            digits.add(digit0);
        }

        digit0 = rand.nextInt(10);
        ans = ans + String.valueOf(digits.get(digit0));
        digits.remove(digit0);
        int digit1 = rand.nextInt(9);
        ans = ans + String.valueOf(digits.get(digit1));
        digits.remove(digit1);
        int digit2 = rand.nextInt(8);
        ans = ans + String.valueOf(digits.get(digit2));
        digits.remove(digit2);
        int digit3 = rand.nextInt(7);
        ans = ans + String.valueOf(digits.get(digit3));
        digits.remove(digit3);
        return ans;
    }

    public static List<Integer> getCenteredAndGuessed(String guessedNumber, String number) {
        List<Integer> ans = new ArrayList();
        int centered = 0;
        int guessed = 0;

        for(int i = 0; i < 4; ++i) {
            for(int j = 0; j < 4; ++j) {
                if (guessedNumber.charAt(i) == number.charAt(j) && i == j) {
                    ++centered;
                } else if (guessedNumber.charAt(i) == number.charAt(j) && i != j) {
                    ++guessed;
                }
            }
        }

        ans.add(centered);
        ans.add(guessed);
        return ans;
    }
}
