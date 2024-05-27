package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Puertos_Switch")
public class PuertoSwitch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Num_Puerto")
    private Short numPuerto;

    @ManyToOne(fetch = FetchType.EAGER)
    private Switch aSwitch;
    @OneToOne(fetch = FetchType.EAGER)
    private PuertoRouter puertoRouter;
}
