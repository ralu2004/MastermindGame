package com.example.demo.data;

import java.util.List;

public class UserDto {
    private Integer id;

    private String name;

    private String password;

    private List<GameDto> games;

    public UserDto() {}
    public UserDto(Integer id, String name, String password, List<GameDto> games) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.games = games;
    }

    public Integer getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public List<GameDto> getGames() { return games; }

    public void setItems(List<GameDto> items) { this.games = games; }
}
