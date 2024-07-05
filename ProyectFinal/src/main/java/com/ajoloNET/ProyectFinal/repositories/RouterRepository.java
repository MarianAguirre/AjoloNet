package com.ajoloNET.ProyectFinal.repositories;

import com.ajoloNET.ProyectFinal.entities.Router;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RouterRepository extends JpaRepository<Router, Long> {


//    @Query("SELECT r FROM Router r WHERE UPPER(r.name) LIKE CONCAT(UPPER(:name), '%')")
//    List<Router> findMatchByName(@Param("name") String name);


    Optional<Router>findByName(String name);
}
