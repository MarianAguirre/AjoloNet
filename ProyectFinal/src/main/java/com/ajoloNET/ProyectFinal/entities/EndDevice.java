package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
public class EndDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "endDevice",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Port port;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;


    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Port getPort() {
        return port;
    }

    public void setPort(Port port) {
        this.port = port;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}
