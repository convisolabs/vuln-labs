using System.Net;
using System.Net.Http.Headers;
using OAuth.Models;
using OAuth.Utils;

namespace OAuth.Services;

public class GitLabService
{


    public static async Task<Token> SendPostToken(string code, Dictionary<string, string> parameters){
        HttpClient httpclient = new HttpClient(); 
        var encodedContent = new FormUrlEncodedContent (parameters);        
        var response =  await httpclient.PostAsync (Util.GetEnvironmentVariable("GITLAB_URI_TOKEN"), encodedContent);
        Token token = new Token();
        if (response.StatusCode == HttpStatusCode.OK) {
            token = await response.Content.ReadFromJsonAsync<Token>().ConfigureAwait(false);
        }else{
            throw new Exception(response.ReasonPhrase);
        }
        return token;
    }

    public static async Task<GitLabUser> GetUserGitLab(Token token){
        GitLabUser gitLabUser = new GitLabUser();

        HttpClient httpClient = new HttpClient(); 
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
        var response =  await httpClient.GetAsync(Util.GetEnvironmentVariable("GITLAB_URI_USER"));

        if (response.StatusCode == HttpStatusCode.OK) {
            gitLabUser = await response.Content.ReadFromJsonAsync<GitLabUser>().ConfigureAwait (false);
        }
 
        return gitLabUser;
    } 


}