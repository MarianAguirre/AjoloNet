package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Switch")
public class Switch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nombre_Switch")
    private String name;

    @OneToMany(mappedBy = "sSwitch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Port> ports;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;

    @Column(name = "Es_Poe")
    private boolean poe;

    @Column(name = "Es_Administrable")
    private boolean administrable;


    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Port> getPorts() {
        return ports;
    }

    public void setPorts(Set<Port> ports) {
        this.ports = ports;
    }

    public Rack getRack() {
        return rack;
    }

    public void setRack(Rack rack) {
        this.rack = rack;
    }

    public boolean isPoe() {
        return poe;
    }

    public void setPoe(boolean poe) {
        this.poe = poe;
    }

    public boolean isAdministrable() {
        return administrable;
    }

    public void setAdministrable(boolean administrable) {
        this.administrable = administrable;
    }
}
