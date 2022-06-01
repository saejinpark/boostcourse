package org.edwith.webbe.securityReservation.service;


import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.service.security.UserDbService;

public interface UserService extends UserDbService {

	void addUser(User user, boolean admin);

	User getUserByEmail(String loginId);

}