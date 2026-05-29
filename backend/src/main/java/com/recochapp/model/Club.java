package com.recochapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Document(collection = "clubes")
public class Club {

    @Id
    private String id;
    
    private String name;
    private String logo;
    private String admin;
    private List<String> members = new ArrayList<>();
    
    // Key: apodo, Value: PENDING, ACCEPTED
    private Map<String, String> invitados = new HashMap<>();

    @Transient
    private List<String> invitedApodos = new ArrayList<>();

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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    public Map<String, String> getInvitados() {
        return invitados;
    }

    public void setInvitados(Map<String, String> invitados) {
        this.invitados = invitados;
    }

    public List<String> getInvitedApodos() {
        return invitedApodos;
    }

    public void setInvitedApodos(List<String> invitedApodos) {
        this.invitedApodos = invitedApodos;
    }
}
