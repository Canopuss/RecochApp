package com.recochapp.repository;

import com.recochapp.model.Usuario;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmailAndPassword(String email, String password);
    java.util.List<Usuario> findByEmail(String email);
}
