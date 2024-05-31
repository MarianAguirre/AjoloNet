package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Rack")
public class Rack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Power_Split")
    private String powerSplit;

    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Switch> aSwitch;

    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PatchPanel> patchPanels;

    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Router> routers;


    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPowerSplit() {
        return powerSplit;
    }

    public void setPowerSplit(String powerSplit) {
        this.powerSplit = powerSplit;
    }

    public List<Switch> getaSwitch() {
        return aSwitch;
    }

    public void setaSwitch(List<Switch> aSwitch) {
        this.aSwitch = aSwitch;
    }

    public Set<PatchPanel> getPatchPanels() {
        return patchPanels;
    }

    public void setPatchPanels(Set<PatchPanel> patchPanels) {
        this.patchPanels = patchPanels;
    }

    public List<Router> getRouters() {
        return routers;
    }

    public void setRouters(List<Router> routers) {
        this.routers = routers;
    }
}
