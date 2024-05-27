package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Puerto_Patch")
public class PuertoPatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Num_Puerto")
    private Short puerto;

    @OneToOne(fetch = FetchType.EAGER)
    private Patch patch;

    @OneToOne(fetch = FetchType.EAGER)
    private PuertoSwitch puertoSwitch;
}
