package org.edwith.webbe.securityReservation.service.security;

import lombok.Data;

@Data
public class UserRoleEntity {
    private String userLoginId;
    private String roleName;

    public UserRoleEntity(String userLoginId, String roleName) {
        this.userLoginId = userLoginId;
        this.roleName = roleName;
    }
}