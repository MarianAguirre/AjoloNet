package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;

@Entity
public class Port {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "router_id")
    private Router router;

    @ManyToOne
    @JoinColumn(name = "switch_id")
    private Switch sSwitch;

    @ManyToOne
    @JoinColumn(name = "patch_id")
    private PatchPanel patchPanel;

    @ManyToOne
    @JoinColumn(name = "end_device_id")
    private EndDevice endDevice;

    @Column(columnDefinition = "port_type")
    @Enumerated(value = EnumType.STRING)
    private PortType portType;


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

    public PortType getPortType() {
        return portType;
    }

    public void setPortType(PortType portType) {
        this.portType = portType;
    }
}
