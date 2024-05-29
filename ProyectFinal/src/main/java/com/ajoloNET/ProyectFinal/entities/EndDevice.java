package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "End_Device")
public class EndDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "endDevice",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Port> ports;

    @Column(name = "Name_Device")
    private String name;

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

    public List<Port> getPorts() {
        return ports;
    }

    public void setPorts(List<Port> ports) {
        this.ports = ports;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

}
