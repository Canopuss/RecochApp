package com.recochapp.controller;

import com.recochapp.model.Club;
import com.recochapp.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.recochapp.repository.JugadorPerfilRepository;
import com.recochapp.model.JugadorPerfil;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/clubes")
@CrossOrigin(origins = "*")
public class ClubController {

    @Autowired
    private ClubRepository repository;

    @Autowired
    private JugadorPerfilRepository perfilRepository;

    @GetMapping
    public List<Club> getAllClubes() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable String id) {
        Optional<Club> club = repository.findById(id);
        return club.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Club createClub(@RequestBody Club club) {
        // Handle invited apodos directly on creation
        if (club.getInvitedApodos() != null && !club.getInvitedApodos().isEmpty()) {
            for (String apodo : club.getInvitedApodos()) {
                Optional<JugadorPerfil> invitadoOpt = perfilRepository.findByApodoIgnoreCase(apodo);
                if (invitadoOpt.isPresent()) {
                    club.getInvitados().put(apodo, "PENDING");
                }
            }
        }
        return repository.save(club);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable String id, @RequestBody Club clubDetails) {
        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isPresent()) {
            Club club = optionalClub.get();
            club.setName(clubDetails.getName());
            club.setLogo(clubDetails.getLogo());
            club.setAdmin(clubDetails.getAdmin());
            club.setMembers(clubDetails.getMembers());
            return ResponseEntity.ok(repository.save(club));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable String id) {
        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isPresent()) {
            Club club = optionalClub.get();
            List<String> members = club.getMembers();
            repository.deleteById(id);
            if (members != null) {
                for (String member : members) {
                    actualizarClubPrincipalSiEsNecesario(member, club.getName());
                }
            }
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void actualizarClubPrincipalSiEsNecesario(String apodo, String clubEliminadoODejado) {
        Optional<JugadorPerfil> perfilOpt = perfilRepository.findByApodoIgnoreCase(apodo);
        if (perfilOpt.isPresent()) {
            JugadorPerfil perfil = perfilOpt.get();
            if (clubEliminadoODejado.equals(perfil.getClubNombre())) {
                List<Club> clubesRestantes = repository.findByUsuarioRelacionado(apodo);
                if (!clubesRestantes.isEmpty()) {
                    perfil.setClubNombre(clubesRestantes.get(0).getName());
                } else {
                    perfil.setClubNombre("");
                }
                perfilRepository.save(perfil);
            }
        }
    }

    @GetMapping("/usuario/{apodo}")
    public ResponseEntity<List<Club>> getClubesByUser(@PathVariable String apodo) {
        List<Club> clubes = repository.findByUsuarioRelacionado(apodo);
        return ResponseEntity.ok(clubes);
    }

    @PutMapping("/{id}/invitar")
    public ResponseEntity<?> invitar(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String targetApodo = payload.get("target");
        
        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Club no encontrado"));
        }
        
        Club club = optionalClub.get();
        
        Optional<JugadorPerfil> invitadoOpt = perfilRepository.findByApodoIgnoreCase(targetApodo);
        if (invitadoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El jugador (apodo) no existe"));
        }

        if (club.getAdmin().equals(targetApodo) || club.getMembers().contains(targetApodo)) {
            return ResponseEntity.badRequest().body(Map.of("error", "El jugador ya pertenece al club"));
        }

        if (club.getInvitados().containsKey(targetApodo)) {
            return ResponseEntity.badRequest().body(Map.of("error", "El jugador ya tiene una invitación pendiente"));
        }

        club.getInvitados().put(targetApodo, "PENDING");
        repository.save(club);
        
        return ResponseEntity.ok(Map.of("message", "Jugador invitado exitosamente"));
    }

    @PutMapping("/{id}/respuesta")
    public ResponseEntity<?> responderInvitacion(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String apodo = payload.get("apodo");
        String respuesta = payload.get("respuesta"); // ACCEPTED o REJECTED

        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Club no encontrado"));
        }

        Club club = optionalClub.get();

        if (!club.getInvitados().containsKey(apodo)) {
            return ResponseEntity.badRequest().body(Map.of("error", "No tienes invitación pendiente para este club"));
        }

        if ("ACCEPTED".equals(respuesta)) {
            club.getInvitados().remove(apodo);
            club.getMembers().add(apodo);
        } else if ("REJECTED".equals(respuesta)) {
            club.getInvitados().remove(apodo);
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Respuesta inválida"));
        }

        repository.save(club);
        return ResponseEntity.ok(Map.of("message", "Invitación procesada exitosamente"));
    }

    @PutMapping("/{id}/transferirAdmin")
    public ResponseEntity<?> transferirAdmin(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String adminActual = payload.get("adminActual");
        String nuevoAdmin = payload.get("nuevoAdmin");

        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Club no encontrado"));
        }

        Club club = optionalClub.get();

        if (!club.getAdmin().equals(adminActual)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Solo el administrador actual puede transferir el mando"));
        }

        if (!club.getMembers().contains(nuevoAdmin)) {
            return ResponseEntity.badRequest().body(Map.of("error", "El nuevo administrador debe ser miembro del club"));
        }

        club.setAdmin(nuevoAdmin);
        repository.save(club);
        
        return ResponseEntity.ok(Map.of("message", "Mando transferido exitosamente"));
    }

    @PutMapping("/{id}/salir")
    public ResponseEntity<?> salirDelClub(@PathVariable String id, @RequestBody Map<String, String> payload) {
        String apodo = payload.get("apodo");

        Optional<Club> optionalClub = repository.findById(id);
        if (optionalClub.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Club no encontrado"));
        }

        Club club = optionalClub.get();

        if (club.getAdmin().equals(apodo)) {
            return ResponseEntity.badRequest().body(Map.of("error", "El administrador no puede salir por la puerta trasera. Transfiere el mando o elimina el club."));
        }

        if (club.getMembers().contains(apodo)) {
            club.getMembers().remove(apodo);
            repository.save(club);
            actualizarClubPrincipalSiEsNecesario(apodo, club.getName());
            return ResponseEntity.ok(Map.of("message", "Has salido del club exitosamente"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "No eres miembro de este club"));
        }
    }
}
