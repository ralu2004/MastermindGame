package com.example.demo.data;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "token")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Game> games;

    public User() {}
    public User(Integer id, String name, String password, List<Game> games) {
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

    public List<Game> getGames() { return games; }

    public void setItems(List<Game> items) { this.games = games; }
}