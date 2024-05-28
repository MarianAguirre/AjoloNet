package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Rack")
public class Rack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String powerSplit;

    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Switch aSwitch;

    @OneToMany(mappedBy = "rack", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PatchPanel> patchPanels;


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

    public Switch getaSwitch() {
        return aSwitch;
    }

    public void setaSwitch(Switch aSwitch) {
        this.aSwitch = aSwitch;
    }

    public Set<PatchPanel> getPatchPanels() {
        return patchPanels;
    }

    public void setPatchPanels(Set<PatchPanel> patchPanels) {
        this.patchPanels = patchPanels;
    }
}
