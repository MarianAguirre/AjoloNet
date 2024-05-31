package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.Router;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RouterRepository extends JpaRepository<Router, Long> {

    /*
    @Query("SELECT r FROM router r WHERE r.name_router ILIKE ?1 || '%';")
    List<Router> findMatchByName(String name);
    */

    Optional<Router>findByName(String name);
}
