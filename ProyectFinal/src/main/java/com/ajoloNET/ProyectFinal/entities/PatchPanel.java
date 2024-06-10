package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Patch")
public class PatchPanel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "patchPanel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Port> ports;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;

    @Column(name = "number_of_ports")
    private int numberOfPorts;


    //Getters and Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getNumberOfPorts() {
        return numberOfPorts;
    }

    public void setNumberOfPorts(int numberOfPorts) {
        this.numberOfPorts = numberOfPorts;
    }
}
