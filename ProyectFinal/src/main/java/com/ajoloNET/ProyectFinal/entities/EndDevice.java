package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "End_Device")
public class EndDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "endDevice",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "device-port")
    private Set<Port> ports;

    @Column(name = "Name_Device")
    private String name;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

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

    public int getNumberOfPorts() {
        return numberOfPorts;
    }

    public void setNumberOfPorts(int numberOfPorts) {
        this.numberOfPorts = numberOfPorts;
    }
}
