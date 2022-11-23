package org.edwith.webbe.reservation.service;

import org.edwith.webbe.reservation.dao.FileInfoDao;
import org.edwith.webbe.reservation.dto.FileInfo;
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
