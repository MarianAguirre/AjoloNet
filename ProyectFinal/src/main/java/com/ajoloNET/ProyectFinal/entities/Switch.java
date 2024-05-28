package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Switch")
public class Switch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Marca_Switch")
    private String marca;

    @OneToMany(mappedBy = "aSwitch", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Port> ports;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;

    private boolean poe;

    private boolean administrable;


    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
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
