package org.edwith.webbe.securityReservation.dto;

import lombok.Data;

@Data
public class UserRole {
	private Long id;
	private Long userId;
	private String roleName;
}