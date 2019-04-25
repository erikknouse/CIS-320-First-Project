package edu.simpson.computerscience.cis320.knouse;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    private Pattern firstNameValidationPattern;
    private Pattern lastNameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit() {
        // --- Compile and set up all the regular expression patterns here ---
        firstNameValidationPattern = Pattern.compile("^[A-Za-z]+(((\\'|\\-|\\.)?([A-Za-z])+))?$");
        lastNameValidationPattern = Pattern.compile("^[A-Za-z]+(((\\'|\\-|\\.)?([A-Za-z])+))?$");
        emailValidationPattern = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
        phoneValidationPattern = Pattern.compile("((\\(\\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}");
        birthdayValidationPattern = Pattern.compile("^\\d{4}\\-\\d{2}\\-\\d{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = request.getReader();
        Gson gson = new Gson();

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Print that this is a post
        out.println("Post");
        boolean hasID = false;
        try{

            String line;
            while((line = bufferedReader.readLine()) != null){
                System.out.println("test");
                stringBuilder.append(line).append("\n");
                System.out.println(line);
                if(line.contains("id")){
                    System.out.println("line contains id");
                    hasID = true;
                }
            }
        }
        finally {
            bufferedReader.close();
        }

        Person person = gson.fromJson(stringBuilder.toString(), Person.class);
        boolean valid = false;
        System.out.println(person.getFirst());
        // Just print the data out to confirm we got it.
        //out.println("fieldname='"+fieldname+"'");
        System.out.println(firstNameValidationPattern.matcher(person.getFirst()));
        System.out.println(firstNameValidationPattern.matcher(person.getFirst()).find());
        System.out.println(lastNameValidationPattern.matcher(person.getLast()).find());
        System.out.println(emailValidationPattern.matcher(person.getEmail()).find());
        // Now create matcher object.
        if (firstNameValidationPattern.matcher(person.getFirst()).find() &&
            lastNameValidationPattern.matcher(person.getLast()).find() &&
            emailValidationPattern.matcher(person.getEmail()).find() &&
            phoneValidationPattern.matcher(person.getPhone()).find() &&
            birthdayValidationPattern.matcher(person.getBirthday()).find()) {
            System.out.println("Passed validation");
            valid = true;
        } else {
            System.out.println("Did not pass validation");
        }
        if(valid){
            if(hasID){
                System.out.println("testhas");
                PersonDAO.editPerson(person);
            }
            else{
                System.out.println("testnot");
                PersonDAO.addPerson(person);
            }
        }


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
