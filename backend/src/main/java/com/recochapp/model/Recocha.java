package com.recochapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "recochas")
public class Recocha {
    @Id
    private String id;
    private String creadorApodo;
    private String date;
    private String time;
    private String location;
    
    // Key: apodo del jugador, Value: estado (PENDING, ACCEPTED)
    private Map<String, String> invitados = new HashMap<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreadorApodo() {
        return creadorApodo;
    }

    public void setCreadorApodo(String creadorApodo) {
        this.creadorApodo = creadorApodo;
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

    public Map<String, String> getInvitados() {
        return invitados;
    }

    public void setInvitados(Map<String, String> invitados) {
        this.invitados = invitados;
    }
}
