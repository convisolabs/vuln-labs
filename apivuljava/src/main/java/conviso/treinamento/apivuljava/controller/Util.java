package conviso.treinamento.apivuljava.controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.List;

import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import conviso.treinamento.apivuljava.model.Login;
import conviso.treinamento.apivuljava.repository.UserRepository;

@RequestMapping("/api/util")
@RestController
public class Util {


    public String getSha256(String input){
        String toReturn = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();
            digest.update(input.getBytes());
            toReturn = String.format("%064x", new BigInteger(1, digest.digest()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return toReturn;        
    }

    public static String getSHA512(String input){

        String toReturn = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            digest.reset();
            digest.update(input.getBytes());
            toReturn = String.format("%0128x", new BigInteger(1, digest.digest()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return toReturn;
    }    

    public static String getMD5(String input){

        String toReturn = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.reset();
            digest.update(input.getBytes());
            toReturn = new BigInteger(1,digest.digest()).toString(16);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return toReturn;
    } 
    
    @GetMapping("/getHash")
    public String GetHash(@RequestBody String value) throws NoSuchAlgorithmException{
        return getMD5(value);
    }      

	@PostMapping("/login")
	@ResponseBody
    public ResponseEntity<List<Login>> Login(@RequestBody Login login) throws SQLException{


        return ResponseEntity.ok(UserRepository.selectAll(login));

    }        
}
