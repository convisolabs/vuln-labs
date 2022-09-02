package conviso.treinamento.apivuljava.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import conviso.treinamento.apivuljava.model.Login;

public final class UserRepository {
    private static Connection connect() {  
        // SQLite connection string  
        String url = "jdbc:sqlite:brokenaccesscontrol.db";  
        Connection conn = null;  
        try {  
            Class.forName("org.sqlite.JDBC");
            conn = DriverManager.getConnection(url);  
        } catch (SQLException e) {  
            System.out.println(e.getMessage());  
        }  
        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }        
        return conn;  
    }      
    
    public static void selectAll(){  
        String sql = "SELECT * FROM users";  
          
        try {  
            Connection conn = connect();  
            Statement stmt  = conn.createStatement();  
            ResultSet rs    = stmt.executeQuery(sql);  
              
            // loop through the result set  
            while (rs.next()) {  
                System.out.println(rs.getString("id") +  "\t" +   
                                   rs.getString("name") + "\t");  
            }  
        } catch (SQLException e) {  
            System.out.println(e.getMessage());  
        }  
    }      

    public static List<Login> selectAll(Login login) throws SQLException{  
        String sql = "SELECT * FROM users where login = '" + login.login + "'";  
          
        List<Login> lstLogin = new ArrayList<Login>();

            Connection conn = connect();  
            Statement stmt  = conn.createStatement();  
            ResultSet rs    = stmt.executeQuery(sql);  
              

            while (rs.next()) {  
                Login auxLogin = new Login();
                auxLogin.login = rs.getString("login");
                auxLogin.senha = rs.getString("password");
                lstLogin.add(auxLogin);
            }  

        return lstLogin;
    }      
}
