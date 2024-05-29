package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Router")
public class Router {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "router", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Port> ports;

    @Column(name = "Name_Router")
    private String name;


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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
