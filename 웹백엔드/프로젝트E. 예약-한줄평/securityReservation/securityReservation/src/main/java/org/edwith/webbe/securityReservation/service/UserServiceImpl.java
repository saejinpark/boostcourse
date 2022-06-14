package org.edwith.webbe.securityReservation.service;

import org.edwith.webbe.securityReservation.dao.UserDao;
import org.edwith.webbe.securityReservation.dao.UserRoleDao;
import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.dto.UserRole;
import org.edwith.webbe.securityReservation.service.security.UserEntity;
import org.edwith.webbe.securityReservation.service.security.UserRoleEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final UserRoleDao userRoleDao;

    @Override
    @Transactional
    public UserEntity getUser(String loginUserId) {
        User user = userDao.getUserByEmail(loginUserId);
        return new UserEntity(user.getEmail(), user.getPassword());
    }

    @Override
    @Transactional
    public List<UserRoleEntity> getUserRoles(String loginUserId) {
        List<UserRole> userRoles = userRoleDao.getRolesByEmail(loginUserId);
        List<UserRoleEntity> list = new ArrayList<>();

        for(UserRole userRole : userRoles) {
            list.add(new UserRoleEntity(loginUserId, userRole.getRoleName()));
        }
        return list;
    }

	@Override
	@Transactional(readOnly = false)
	public void addUser(User user, boolean admin) {
		userDao.addUser(user);
		
		User selectedMember = userDao.getUserByEmail(user.getEmail());
		Long userId = selectedMember.getId();
		if(admin) {
			userRoleDao.addAdminRole(userId);
		}
		userRoleDao.addUserRole(userId);
	}

	@Override
	public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
	}
}