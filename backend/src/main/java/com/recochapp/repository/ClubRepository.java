package com.recochapp.repository;

import com.recochapp.model.Club;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface ClubRepository extends MongoRepository<Club, String> {
    List<Club> findByAdmin(String admin);
    List<Club> findByMembersContaining(String email);

    @Query("{ $or: [ { 'admin': ?0 }, { 'members': ?0 }, { 'invitados.?0': { $exists: true } } ] }")
    List<Club> findByUsuarioRelacionado(String apodo);
}
