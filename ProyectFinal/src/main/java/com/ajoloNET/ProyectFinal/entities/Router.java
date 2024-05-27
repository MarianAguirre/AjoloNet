package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Router")
public class Router {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Marca_Router")
    private String marca;

    @Column(name = "Descripcion")
    private String descripcion;
}
