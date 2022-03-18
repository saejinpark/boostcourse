package org.edwith.webbe.guestbook.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.edwith.webbe.guestbook.dao.GuestbookDao;

@WebServlet(urlPatterns = {"/", "/guestbooks"})
public class GuestbookListServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GuestbookDao guestbookDao = new GuestbookDao();
        request.setAttribute("list", guestbookDao.getGuestbooks());
        RequestDispatcher rd = request.getRequestDispatcher("/WEB-INF/guestbook/guestbooks.jsp");
        rd.forward(request, response);
    }

}
