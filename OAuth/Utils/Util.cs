using System.Security.Cryptography;
using System.Text;
using IdentityModel;

namespace OAuth.Utils;

public class Util
{
    public static string GetEnvironmentVariable(string environmentVariable){
        // string ret  = "";        
        // try{
        //     ret = 
        // }catch(Exception ex){
        //     //_logger.LogError(ex,"Error to access environment variable");
        // }
        return Environment.GetEnvironmentVariable(environmentVariable);;
    }    

    public static string CreateCodeVerifier(){
        var codeVerifier = CryptoRandom.CreateUniqueId(32);
        return codeVerifier;
    }

    public static string CreateCodeChallenge(string codeVerifier){
        SHA256 mySHA256 = SHA256.Create();
        var challengeBytes = mySHA256.ComputeHash(Encoding.UTF8.GetBytes(codeVerifier));
        var codeChallenge = Base64Url.Encode(challengeBytes);
        return codeChallenge;
    }
}