package com.recochapp.controller;

import com.recochapp.model.Club;
import com.recochapp.model.JugadorPerfil;
import com.recochapp.model.Recocha;
import com.recochapp.repository.ClubRepository;
import com.recochapp.repository.JugadorPerfilRepository;
import com.recochapp.repository.RecochaRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recochas")
@CrossOrigin(origins = "*")
@Tag(name = "Recochas")
public class RecochaController {

    @Autowired
    private RecochaRepository recochaRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private JugadorPerfilRepository perfilRepository;

    @GetMapping("/usuario/{apodo}")
    public List<Recocha> getRecochasByUsuario(@PathVariable String apodo) {
        return recochaRepository.findByUsuarioRelacionado(apodo);
    }

    @PostMapping
    public ResponseEntity<Recocha> createRecocha(@RequestBody Recocha recocha) {
        return new ResponseEntity<>(recochaRepository.save(recocha), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/invitar")
    public ResponseEntity<?> invitar(@PathVariable String id, @RequestBody Map<String, String> body) {
        String target = body.get("target");
        if (target == null || target.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El objetivo (target) no puede estar vacío"));
        }

        Optional<Recocha> optionalRecocha = recochaRepository.findById(id);
        if (optionalRecocha.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Recocha recocha = optionalRecocha.get();

        boolean invited = false;

        // 1. Intentar buscar como Club (ignorando mayúsculas/minúsculas de manera simple)
        // Como no tenemos un findByName exacto que ignore case en el repo base, traemos todos y filtramos
        List<Club> clubes = clubRepository.findAll();
        Optional<Club> clubOpt = clubes.stream()
                .filter(c -> c.getName() != null && c.getName().equalsIgnoreCase(target.trim()))
                .findFirst();

        if (clubOpt.isPresent()) {
            Club club = clubOpt.get();
            if (club.getMembers() != null) {
                for (String memberApodo : club.getMembers()) {
                    // No invitar al creador a su propia recocha
                    if (!memberApodo.equals(recocha.getCreadorApodo()) && !recocha.getInvitados().containsKey(memberApodo)) {
                        recocha.getInvitados().put(memberApodo, "PENDING");
                        invited = true;
                    }
                }
            }
        } else {
            // 2. Buscar como Jugador por Apodo
            List<JugadorPerfil> perfiles = perfilRepository.findAll();
            Optional<JugadorPerfil> perfilOpt = perfiles.stream()
                    .filter(p -> p.getApodo() != null && p.getApodo().equalsIgnoreCase(target.trim()))
                    .findFirst();

            if (perfilOpt.isPresent()) {
                String apodo = perfilOpt.get().getApodo();
                if (!apodo.equals(recocha.getCreadorApodo()) && !recocha.getInvitados().containsKey(apodo)) {
                    recocha.getInvitados().put(apodo, "PENDING");
                    invited = true;
                } else if (recocha.getInvitados().containsKey(apodo)) {
                    return ResponseEntity.badRequest().body(Map.of("error", "El jugador ya está invitado."));
                } else {
                    return ResponseEntity.badRequest().body(Map.of("error", "No puedes invitarte a ti mismo."));
                }
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "No se encontró ningún club o jugador con ese nombre/apodo."));
            }
        }

        if (invited) {
            recochaRepository.save(recocha);
            return ResponseEntity.ok(Map.of("message", "Invitación(es) enviada(s) con éxito."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "No se enviaron invitaciones (los jugadores ya estaban invitados o el club estaba vacío)."));
        }
    }

    @PutMapping("/{id}/respuesta")
    public ResponseEntity<?> responderInvitacion(@PathVariable String id, @RequestBody Map<String, String> body) {
        String apodo = body.get("apodo");
        String respuesta = body.get("respuesta"); // "ACCEPTED" o "REJECTED"

        if (apodo == null || respuesta == null || (!respuesta.equals("ACCEPTED") && !respuesta.equals("REJECTED"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Datos inválidos"));
        }

        Optional<Recocha> optionalRecocha = recochaRepository.findById(id);
        if (optionalRecocha.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recocha recocha = optionalRecocha.get();
        if (!recocha.getInvitados().containsKey(apodo)) {
            return ResponseEntity.badRequest().body(Map.of("error", "No tienes una invitación a esta recocha."));
        }

        if (respuesta.equals("REJECTED")) {
            recocha.getInvitados().remove(apodo);
        } else {
            recocha.getInvitados().put(apodo, "ACCEPTED");
        }

        recochaRepository.save(recocha);
        return ResponseEntity.ok(Map.of("message", "Respuesta registrada."));
    }
}
