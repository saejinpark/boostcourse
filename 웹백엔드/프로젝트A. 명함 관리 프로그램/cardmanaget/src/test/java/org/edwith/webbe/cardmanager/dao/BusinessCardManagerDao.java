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
    private static String dburl = "jdbc:mysql://localhost:3306/connectdb";
    private static String dbUser = "root";
    private static String dbpasswd = "";

    public List<BusinessCard> searchBusinessCard(String keyword) {
        // 구현하세요.
        List<BusinessCard> list = new ArrayList<>();

        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        String sql =
                "SELECT name, phone, companyName, createDate FROM BusinessCard WHERE name LIKE '%"
                        + keyword + "%'";
        try (Connection conn = DriverManager.getConnection(dburl, dbUser, dbpasswd);
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
        // 구현하세요.
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        String sql =
                "INSERT INTO BusinessCard (name, phone, companyName, createDate) VALUES ( ?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(dburl, dbUser, dbpasswd);
                PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, businessCard.getName());
            ps.setString(2, businessCard.getPhone());
            ps.setString(3, businessCard.getCompanyName());
            ps.setString(4, businessCard.getCreateDate().getTime() + "");

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return businessCard;
    }
}
