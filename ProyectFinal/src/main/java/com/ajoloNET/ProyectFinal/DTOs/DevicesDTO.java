package com.ajoloNET.ProyectFinal.DTOs;

import com.ajoloNET.ProyectFinal.entities.*;

import java.util.List;

public class DevicesDTO {
    private List<Router> routers;
    private List<Switch> switches;
    private List<PatchPanel> patchPanels;
    private List<EndDevice> endDevices;
    private List<Servers> servers;

    public List<Router> getRouters() {
        return routers;
    }

    public void setRouters(List<Router> routers) {
        this.routers = routers;
    }

    public List<Switch> getSwitches() {
        return switches;
    }

    public void setSwitches(List<Switch> switches) {
        this.switches = switches;
    }

    public List<PatchPanel> getPatchPanels() {
        return patchPanels;
    }

    public void setPatchPanels(List<PatchPanel> patchPanels) {
        this.patchPanels = patchPanels;
    }

    public List<EndDevice> getEndDevices(List<EndDevice> all) {
        return endDevices;
    }

    public void setEndDevices(List<EndDevice> endDevices) {
        this.endDevices = endDevices;
    }

    public List<EndDevice> getEndDevices() {
        return endDevices;
    }

    public List<Servers> getServers() {
        return servers;
    }

    public void setServers(List<Servers> servers) {
        this.servers = servers;
    }
}
