package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Rack")
public class Rack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rack_name")
    private String name;


    @OneToMany(mappedBy = "rack", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "rack-switch")
    private List<Switch> aSwitch;

    @OneToMany(mappedBy = "rack", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "rack-patch")
    private Set<PatchPanel> patchPanels;

    @OneToMany(mappedBy = "rack", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "rack-router")
    private List<Router> routers;

    @OneToMany(mappedBy = "rack", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "rack-server")
    private List<Servers> servers;


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

    public List<Servers> getServers() {
        return servers;
    }

    public void setServers(List<Servers> servers) {
        this.servers = servers;
    }
}
