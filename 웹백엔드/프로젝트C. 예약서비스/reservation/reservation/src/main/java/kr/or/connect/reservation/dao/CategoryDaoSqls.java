package kr.or.connect.reservation.dao;

public class CategoryDaoSqls {
	public static final String CATEGORY__SELECT_ALL = "SELECT * FROM category";
	public static final String CATEGORY__SELECT_COUNT_ALL = "SELECT count(*) FROM category";
	public static final String CATEGORY__SELECT_BY__ID = "SELECT * FROM category WHERE id = :id";
}
