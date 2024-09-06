package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "physical_ports")
public class Port {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "router_id")
    @JsonBackReference(value = "router-port")
    private Router router;

    @ManyToOne
    @JoinColumn(name = "switch_id")
    @JsonBackReference(value = "switch-port")
    private Switch sSwitch;

    @ManyToOne
    @JoinColumn(name = "patch_id")
    @JsonBackReference(value = "patch-port")
    private PatchPanel patchPanel;

    @ManyToOne
    @JoinColumn(name = "end_device_id")
    @JsonBackReference(value = "device-port")
    private EndDevice endDevice;

    @ManyToOne
    @JoinColumn(name = "servers_id")
    @JsonBackReference(value = "server-port")
    private Servers servers;

    @Column(name = "port_number")
    private int portNumber;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PortStatus status;


    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Router getRouter() {
        return router;
    }

    public void setRouter(Router router) {
        this.router = router;
    }

    public Switch getsSwitch() {
        return sSwitch;
    }

    public void setsSwitch(Switch sSwitch) {
        this.sSwitch = sSwitch;
    }

    public PatchPanel getPatchPanel() {
        return patchPanel;
    }

    public void setPatchPanel(PatchPanel patchPanel) {
        this.patchPanel = patchPanel;
    }

    public EndDevice getEndDevice() {
        return endDevice;
    }

    public void setEndDevice(EndDevice endDevice) {
        this.endDevice = endDevice;
    }


    public int getPortNumber() {
        return portNumber;
    }

    public void setPortNumber(int portNumber) {
        this.portNumber = portNumber;
    }

    public PortStatus getStatus() {
        return status;
    }

    public void setStatus(PortStatus status) {
        this.status = status;
    }

    public Servers getServers() {
        return servers;
    }

    public void setServers(Servers servers) {
        this.servers = servers;
    }
}
