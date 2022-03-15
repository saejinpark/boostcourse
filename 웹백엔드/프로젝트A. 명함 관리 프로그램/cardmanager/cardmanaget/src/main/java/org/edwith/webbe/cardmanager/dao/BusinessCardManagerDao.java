package org.edwith.webbe.cardmanager.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.edwith.webbe.cardmanager.dto.BusinessCard;

public class BusinessCardManagerDao {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/connectdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWD = "";

    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public List<BusinessCard> searchBusinessCard(String keyword) {
        List<BusinessCard> list = new ArrayList<>();

        String sql =
                "SELECT name, phone, companyName, createDate FROM BusinessCard WHERE name LIKE '%"
                        + keyword + "%'";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWD);
                PreparedStatement ps = conn.prepareStatement(sql)) {
            try (ResultSet rs = ps.executeQuery()) {

                while (rs.next()) {
                    String name = rs.getString("name");
                    String phone = rs.getString("phone");
                    String companyName = rs.getString("companyName");
                    BusinessCard businessCard = new BusinessCard(name, phone, companyName);
                    Date createDate = new Date(rs.getLong("createDate"));
                    businessCard.setCreateDate(createDate);
                    list.add(businessCard);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return list;
    }

    public BusinessCard addBusinessCard(BusinessCard businessCard) {
        String sql =
                "INSERT INTO BusinessCard (name, phone, companyName, createDate) VALUES( ?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWD);
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, businessCard.getName());
            ps.setString(2, businessCard.getPhone());
            ps.setString(3, businessCard.getCompanyName());
            ps.setLong(4, businessCard.getCreateDate().getTime());

            ps.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return businessCard;
    }
}
