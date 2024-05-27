package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Puerto_Router")
public class PuertoRouter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Num_Puerto")
    private Short puerto;

    @ManyToOne(fetch = FetchType.EAGER)
    private Router router;
}
