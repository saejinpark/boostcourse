package org.edwith.webbe.securityReservation.service;

import org.edwith.webbe.securityReservation.dao.FileInfoDao;
import org.edwith.webbe.securityReservation.dto.FileInfo;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FilesService {
	private final FileInfoDao fileInfoDao;
	
	public FileInfo files(Integer fileId) {
		return fileInfoDao.selectById(fileId);
	}
}
