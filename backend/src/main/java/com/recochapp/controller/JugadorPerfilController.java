package com.recochapp.controller;

import com.recochapp.model.JugadorPerfil;
import com.recochapp.repository.JugadorPerfilRepository;
import com.recochapp.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "*")
@Tag(name = "Jugadores Perfil")
public class JugadorPerfilController {

    @Autowired
    private JugadorPerfilRepository perfilRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/opciones")
    public ResponseEntity<Map<String, List<String>>> getOpciones() {
        Map<String, List<String>> opciones = new HashMap<>();
        
        List<String> posiciones = Arrays.asList(
            "POR", "CB", "LB", "RB", "MCD", "MC", "MCO", "MI", "MD", "EI", "ED", "SD", "DC", "MP"
        );
        
        List<String> ubicaciones = Arrays.asList(
            "Comuna 1 - Norte",
            "Comuna 2 - Nororiental",
            "Comuna 3 - San Francisco",
            "Comuna 4 - Occidental",
            "Comuna 5 - García Rovira",
            "Comuna 6 - La Concordia",
            "Comuna 7 - La Ciudadela",
            "Comuna 8 - Sur Occidente",
            "Comuna 9 - La Pedregosa",
            "Comuna 10 - Provenza",
            "Comuna 11 - Sur",
            "Comuna 12 - Cabecera del Llano",
            "Comuna 13 - Oriental",
            "Comuna 14 - Morrorico",
            "Comuna 15 - Centro",
            "Comuna 16 - Lagos del Cacique",
            "Comuna 17 - Mutis"
        );
        
        opciones.put("posiciones", posiciones);
        opciones.put("ubicaciones", ubicaciones);
        
        return ResponseEntity.ok(opciones);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<JugadorPerfil>> buscarJugadores(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) List<String> posiciones,
            @RequestParam(required = false) String club,
            @RequestParam(required = false) String ubicacion) {
        
        Query query = new Query();
        
        if (nombre != null && !nombre.trim().isEmpty()) {
            query.addCriteria(Criteria.where("nombreCompleto").regex(nombre, "i"));
        }
        
        if (club != null && !club.trim().isEmpty()) {
            query.addCriteria(Criteria.where("clubNombre").regex(club, "i"));
        }
        
        if (posiciones != null && !posiciones.isEmpty() && !posiciones.contains("Cualquiera")) {
            query.addCriteria(Criteria.where("posiciones").in(posiciones));
        }
        
        if (ubicacion != null && !ubicacion.trim().isEmpty() && !"Cualquiera".equals(ubicacion)) {
            query.addCriteria(Criteria.where("ubicacion").is(ubicacion));
        }

        List<JugadorPerfil> resultados = mongoTemplate.find(query, JugadorPerfil.class);
        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/perfil/{usuarioId}")
    public ResponseEntity<JugadorPerfil> getPerfil(@PathVariable Long usuarioId) {
        return perfilRepository.findByUsuarioId(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/perfil")
    public ResponseEntity<?> createPerfil(@RequestBody JugadorPerfil perfil) {
        if (perfil.getUsuarioId() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "usuarioId es requerido"));
        }
        
        Optional<JugadorPerfil> existente = perfilRepository.findByUsuarioId(perfil.getUsuarioId());
        if (existente.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El perfil ya existe para este usuario"));
        }

        JugadorPerfil guardado = perfilRepository.save(perfil);
        return new ResponseEntity<>(guardado, HttpStatus.CREATED);
    }

    @PutMapping("/perfil/{usuarioId}")
    public ResponseEntity<?> updatePerfil(@PathVariable Long usuarioId, @RequestBody JugadorPerfil details) {
        return perfilRepository.findByUsuarioId(usuarioId).map(perfil -> {
            perfil.setNombreCompleto(details.getNombreCompleto());
            perfil.setEmail(details.getEmail());
            perfil.setPosiciones(details.getPosiciones());
            perfil.setClubNombre(details.getClubNombre());
            perfil.setUbicacion(details.getUbicacion());
            perfil.setEdad(details.getEdad());
            perfil.setSexo(details.getSexo());
            perfil.setPiernaHabil(details.getPiernaHabil());
            if (details.getFotoPerfil() != null) {
                perfil.setFotoPerfil(details.getFotoPerfil());
            }
            perfilRepository.save(perfil);
            return ResponseEntity.ok(perfil);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<?> deleteCuentaCompleta(@PathVariable Long usuarioId) {
        // Eliminar Perfil de MongoDB
        perfilRepository.deleteByUsuarioId(usuarioId);
        
        // Eliminar Usuario de H2 (y relacionados por cascade)
        usuarioRepository.deleteById(usuarioId);
        
        return ResponseEntity.ok(Map.of("message", "Cuenta eliminada permanentemente"));
    }
}
