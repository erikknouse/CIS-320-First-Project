package edu.simpson.computerscience.cis320.knouse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "SetSessionServlet")
public class GetLoginServlet extends HttpServlet {

    /** Method for posts */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession();
        String loginId = (String)session.getAttribute("loginId");

        if(loginId == null){
            out.println("Not currently logged in");
        }
        else{
            out.println("You are logged in as "+ loginId);
            System.out.println(loginId);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}