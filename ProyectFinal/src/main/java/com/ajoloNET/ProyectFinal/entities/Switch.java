package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.micrometer.core.instrument.config.validate.Validated;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Switch")
public class Switch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name_Switch", nullable = false)
    private String name;

    @OneToMany(mappedBy = "sSwitch", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "switch-port")
    private Set<Port> ports = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "rack_id")
    @JsonBackReference(value = "rack-switch")
    private Rack rack;

    @Column(name = "is_Poe")
    private boolean poe;

    @Column(name = "is_Manageable")
    private boolean manageable;

    @Column(name = "device_type", nullable = false)
    private String deviceType = "switch";

    @Column(name = "number_of_ports", nullable = false)
    private int numberOfPorts;

    @Transient
    private String rackName;


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
        this.ports.clear();
        if (ports != null) {
            this.ports.addAll(ports);
            for (Port port : ports) {
                port.setsSwitch(this);
            }
        }
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

    public boolean isManageable() {
        return manageable;
    }

    public void setManageable(boolean manageable) {
        this.manageable = manageable;
    }

    public int getNumberOfPorts() {
        return numberOfPorts;
    }

    public void setNumberOfPorts(int numberOfPorts) {
        this.numberOfPorts = numberOfPorts;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getRackName() {
        return rackName;
    }

    public void setRackName(String rackName) {
        this.rackName = rackName;
    }
}
