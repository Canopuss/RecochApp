package com.recochapp.repository;

import com.recochapp.model.Torneo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TorneoRepository extends MongoRepository<Torneo, String> {
}
