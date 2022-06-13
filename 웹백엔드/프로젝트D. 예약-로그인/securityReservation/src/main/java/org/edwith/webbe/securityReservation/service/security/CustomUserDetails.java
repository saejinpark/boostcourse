package org.edwith.webbe.securityReservation.service.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

import java.util.Collection;

@Data
public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;
	private String username;
    private String password;
    private boolean isEnabled;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private Collection<? extends GrantedAuthority>authorities ;
}