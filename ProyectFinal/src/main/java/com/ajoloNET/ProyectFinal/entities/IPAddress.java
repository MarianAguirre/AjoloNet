package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
@Table(name = "IPAddress")
public class IPAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address", nullable = false)
    private String ipAddress;

    @ManyToOne
    @JoinColumn(name = "switch_id")
    @JsonBackReference(value = "switch-ip")
    private Switch sSwitch;

    @ManyToOne
    @JoinColumn(name = "router_id")
    @JsonBackReference(value = "router-ip")
    private Router router;

    @ManyToOne
    @JoinColumn(name = "end_device_id")
    @JsonBackReference(value = "end_device-ip")
    private EndDevice endDevice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Switch getsSwitch() {
        return sSwitch;
    }

    public void setsSwitch(Switch sSwitch) {
        this.sSwitch = sSwitch;
    }

    public Router getRouter() {
        return router;
    }

    public void setRouter(Router router) {
        this.router = router;
    }

    public EndDevice getEndDevice() {
        return endDevice;
    }

    public void setEndDevice(EndDevice endDevice) {
        this.endDevice = endDevice;
    }
}
