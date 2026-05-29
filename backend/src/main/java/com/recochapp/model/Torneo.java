package com.recochapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "torneos")
public class Torneo {

    @Id
    private String id;
    
    private String name;
    private String teams; // "4", "8", "16"
    private String date;
    private String time;
    private String location;
    private String format;
    private List<String> registeredTeams = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeams() {
        return teams;
    }

    public void setTeams(String teams) {
        this.teams = teams;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public List<String> getRegisteredTeams() {
        return registeredTeams;
    }

    public void setRegisteredTeams(List<String> registeredTeams) {
        this.registeredTeams = registeredTeams;
    }
}
