package org.edwith.webbe.reservation.dao;

import static org.edwith.webbe.reservation.dao.FileInfoDaoSqls.*;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.edwith.webbe.reservation.dto.FileInfo;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class FileInfoDao {
    private NamedParameterJdbcTemplate jdbc;

    private RowMapper<FileInfo> rowMapper = BeanPropertyRowMapper.newInstance(FileInfo.class);

    public FileInfoDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }
    
    public Integer insertFileInfo(
    		String fileName, String saveFileName, String contentType
    		) {
    	final KeyHolder holder = new GeneratedKeyHolder();
    	MapSqlParameterSource parameters = new MapSqlParameterSource();
    	parameters.addValue("fileName", fileName);
    	parameters.addValue("saveFileName", saveFileName);
    	parameters.addValue("contentType", contentType); 		
    	jdbc.update(INSERT_FILE_INFO, parameters, holder, new String[] {"GENERATED_ID"} );
    	Number generatedId = holder.getKey();
    	return generatedId.intValue();
    }
    
    public FileInfo selectById(Integer fileId) {
		Map<String, Integer> params = new HashMap<>();
		params.put("fileId", fileId);
		return jdbc.queryForObject(SELECT_BY_ID, params, rowMapper);
    }

}
