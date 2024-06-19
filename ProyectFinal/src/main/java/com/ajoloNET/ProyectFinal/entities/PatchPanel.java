package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Patch")
public class PatchPanel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "patchPanel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "patch-port")
    private Set<Port> ports = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "rack_id")
    @JsonBackReference(value = "rack-patch")
    private Rack rack;

    @Column(name = "number_of_ports")
    private int numberOfPorts;

    @Column(name = "name", nullable = false)
    private String name = "Patch Panel";

    @Column(name = "device_name", nullable = false)
    private String deviceType = "patch-panel";


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
        this.ports.clear();
        if (ports != null) {
            this.ports.addAll(ports);
            for (Port port : ports) {
                port.setPatchPanel(this);
            }
        }
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }
}
