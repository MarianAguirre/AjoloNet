package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.Switch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SwitchRepository extends JpaRepository<Switch, Long> {

    Optional<Switch>findByName(String name);
}
