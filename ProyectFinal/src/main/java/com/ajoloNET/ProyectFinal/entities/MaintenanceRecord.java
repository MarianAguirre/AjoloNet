package com.ajoloNET.ProyectFinal.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Maintenance_Record")
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "device_type", nullable = false)
    private DeviceType deviceType;

    @Column(name = "device_name", nullable = false)
    private String deviceName;

    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @Column(name = "maintenance_date", nullable = false)
    private Date maintenanceDate;

    @Column(name = "performed_by", nullable = false)
    private String performedBy;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "materials_used")
    private String materialsUsed;
}
