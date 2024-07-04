package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
@Table(name = "VLAN")
public class VLAN {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vlan_id", nullable = false)
    private int vlanId;

    @Column(name = "vlan_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "switch_id")
    @JsonBackReference(value = "switch-vlan")
    private Switch sSwitch;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getVlanId() {
        return vlanId;
    }

    public void setVlanId(int vlanId) {
        this.vlanId = vlanId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Switch getsSwitch() {
        return sSwitch;
    }

    public void setsSwitch(Switch sSwitch) {
        this.sSwitch = sSwitch;
    }
}
