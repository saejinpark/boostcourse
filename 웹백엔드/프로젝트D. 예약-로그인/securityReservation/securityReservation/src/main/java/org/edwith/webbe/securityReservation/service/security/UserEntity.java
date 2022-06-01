package org.edwith.webbe.securityReservation.service.security;

import lombok.Data;

@Data
public class UserEntity {
    private String loginUserId;
    private String password;

    public UserEntity(String loginUserId, String password) {
        this.loginUserId = loginUserId;
        this.password = password;
    }
}