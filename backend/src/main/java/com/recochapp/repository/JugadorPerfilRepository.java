package com.recochapp.repository;

import com.recochapp.model.JugadorPerfil;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface JugadorPerfilRepository extends MongoRepository<JugadorPerfil, String> {

    Optional<JugadorPerfil> findByUsuarioId(String usuarioId);

    Optional<JugadorPerfil> findByEmail(String email);

    Optional<JugadorPerfil> findByApodoIgnoreCase(String apodo);

    void deleteByUsuarioId(String usuarioId);

    List<JugadorPerfil> findByNombreCompletoContainingIgnoreCase(String nombre);

    @Query("{ " +
           "$and: [ " +
           "  { $or: [ { $expr: { $eq: [?0, null] } }, { 'nombreCompleto': { $regex: ?0, $options: 'i' } } ] }," +
           "  { $or: [ { $expr: { $eq: [?1, null] } }, { 'posiciones': { $in: ?1 } } ] }," +
           "  { $or: [ { $expr: { $eq: [?2, null] } }, { 'clubNombre': { $regex: ?2, $options: 'i' } } ] }," +
           "  { $or: [ { $expr: { $eq: [?3, null] } }, { 'apodo': { $regex: ?3, $options: 'i' } } ] }" +
           "] }")
    List<JugadorPerfil> buscarJugadores(String nombre, List<String> posiciones, String club, String apodo);
}
