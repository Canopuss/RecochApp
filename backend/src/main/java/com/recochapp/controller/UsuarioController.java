package com.recochapp.controller;

import com.recochapp.model.Usuario;
import com.recochapp.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping("/users")
    public List<Usuario> getAll() {
        return repository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        return new ResponseEntity<>(repository.save(usuario), HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Usuario details) {
        return repository.findById(id).map(user -> {
            user.setEmail(details.getEmail());
            user.setPassword(details.getPassword());
            user.setNombre_completo(details.getNombre_completo());
            repository.save(user);
            return ResponseEntity.ok(Map.of("message", "Usuario actualizado"));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Usuario eliminado"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        return repository.findByEmailAndPassword(credentials.get("email"), credentials.get("password"))
            .map(user -> ResponseEntity.ok(Map.of("message", "Login successful", "user", user)))
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Credenciales invalidas")));
    }
}
