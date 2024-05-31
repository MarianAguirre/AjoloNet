package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.Router;
import com.ajoloNET.ProyectFinal.entities.Switch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SwitchRepository extends JpaRepository<Switch, Long> {

    Optional<Switch>findByName(String name);

    /*
    @Query("SELECT r FROM switch s WHERE s.name_switch ILIKE ?1 || '%';")
    List<Router> findMatchByName(String name);
    */
}
