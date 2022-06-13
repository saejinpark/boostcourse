package org.edwith.webbe.securityReservation.dto;

import java.util.Date;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String password;
    private String email;
    private String phone;
    private Date createDate;
    private Date modifyDate;
}