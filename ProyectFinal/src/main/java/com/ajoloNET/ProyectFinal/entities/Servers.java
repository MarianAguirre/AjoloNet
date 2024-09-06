package com.ajoloNET.ProyectFinal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Servers")
@Getter
@Setter
public class Servers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name_Of_Server")
    private String name;

    @OneToMany(mappedBy = "servers", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.LAZY)
    @JsonManagedReference(value = "server-port")
    private Set<Port> ports = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "rack_id")
    @JsonBackReference(value = "rack-server")
    private Rack rack;

    @Column(name = "number_of_ports", nullable = false)
    private int numberOfPorts;

    @Column(name = "device_type",nullable = false)
    private String deviceType = "server";

    @Column(name = "MAC_Address")
    private String mac;

    @Column(name = "IP_Address")
    @Pattern(
            regexp = "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
            message = "Invalid IP address"
    )
    private String ipAddress;

    @ManyToOne
    @JoinColumn(name = "area_id")
    @JsonBackReference(value = "server_area")
    private Area area;

    @Transient
    private String rackName;

    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "server-vm")
    private Set<ServersVM> virtualMachines = new HashSet<>();

    public void setPorts(Set<Port> ports) {
        this.ports.clear();
        if (ports != null) {
            this.ports.addAll(ports);
            for (Port port : ports) {
                port.setServers(this);
            }
        }

    }

    public void setVirtualMachines(Set<ServersVM> virtualMachines) {
        this.virtualMachines.clear();
        if (virtualMachines != null) {
            this.virtualMachines.addAll(virtualMachines);
            for (ServersVM vm : virtualMachines) {
                vm.setServer(this);
            }
        }
    }
}
