package com.recochapp.repository;

import com.recochapp.model.Recocha;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RecochaRepository extends MongoRepository<Recocha, String> {
    
    // Find recochas where the user is either the creator, or is in the invitados map
    @Query("{ $or: [ { 'creadorApodo': ?0 }, { 'invitados.?0': { $exists: true } } ] }")
    List<Recocha> findByUsuarioRelacionado(String apodo);
}
