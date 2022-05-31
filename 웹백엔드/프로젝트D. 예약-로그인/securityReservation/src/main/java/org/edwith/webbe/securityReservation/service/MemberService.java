package org.edwith.webbe.securityReservation.service;

import org.edwith.webbe.securityReservation.dto.Member;
import org.edwith.webbe.securityReservation.service.security.UserDbService;

public interface MemberService extends UserDbService {

	void addMember(Member member, boolean admin);

	Member getMemberByEmail(String loginId);

}