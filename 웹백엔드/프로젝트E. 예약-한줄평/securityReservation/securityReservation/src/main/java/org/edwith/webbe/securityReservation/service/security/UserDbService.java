package org.edwith.webbe.securityReservation.service.security;

import java.util.List;

public abstract interface UserDbService {
    public UserEntity getUser(String loginUserId);
    public List<UserRoleEntity> getUserRoles(String loginUserId);
}