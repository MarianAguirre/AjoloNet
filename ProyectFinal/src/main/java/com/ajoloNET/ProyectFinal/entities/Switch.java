package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Switch")
public class Switch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Marca_Switch")
    private String marca;

    private boolean poe;

    private boolean administrable;

    @Column(name = "Descripcion")
    private String descripcion;

}
