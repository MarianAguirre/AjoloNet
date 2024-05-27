package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Patch")
public class Patch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Rack rack;
}
