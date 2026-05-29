package com.recochapp.controller;

import com.recochapp.model.Torneo;
import com.recochapp.repository.TorneoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/torneos")
@CrossOrigin(origins = "*")
public class TorneoController {

    @Autowired
    private TorneoRepository repository;

    @GetMapping
    public List<Torneo> getAllTorneos() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Torneo> getTorneoById(@PathVariable String id) {
        Optional<Torneo> torneo = repository.findById(id);
        return torneo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Torneo createTorneo(@RequestBody Torneo torneo) {
        return repository.save(torneo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Torneo> updateTorneo(@PathVariable String id, @RequestBody Torneo torneoDetails) {
        Optional<Torneo> optionalTorneo = repository.findById(id);
        if (optionalTorneo.isPresent()) {
            Torneo torneo = optionalTorneo.get();
            torneo.setName(torneoDetails.getName());
            torneo.setTeams(torneoDetails.getTeams());
            torneo.setDate(torneoDetails.getDate());
            torneo.setTime(torneoDetails.getTime());
            torneo.setLocation(torneoDetails.getLocation());
            torneo.setFormat(torneoDetails.getFormat());
            torneo.setRegisteredTeams(torneoDetails.getRegisteredTeams());
            return ResponseEntity.ok(repository.save(torneo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTorneo(@PathVariable String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
