package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.Rack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RackRepository extends JpaRepository<Rack, Long> {

    Optional<Rack> findByName(String name);

}
