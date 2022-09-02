using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OAuth.Services;
using OAuth.Utils;

namespace OAuth.Pages;

public class GitLabPKCEFlowModel : PageModel
{
    private readonly ILogger<GitLabPKCEFlowModel> _logger;

    public GitLabPKCEFlowModel(ILogger<GitLabPKCEFlowModel> logger)
    {
        _logger = logger;
    }

    public async Task<IActionResult> OnGet(string code, string state)
    {
       try{

            if (string.IsNullOrEmpty(code) && string.IsNullOrEmpty(state)){
                HttpContext.Session.SetString("StateInitial", Guid.NewGuid().ToString());
                HttpContext.Session.SetString("CodeVerifier", Util.CreateCodeVerifier());
                string codeChallenge = Util.CreateCodeChallenge(HttpContext.Session.GetString("CodeVerifier"));
                string page = $"{Util.GetEnvironmentVariable("GITLAB_URI_AUTHORIZE")}?client_id={Util.GetEnvironmentVariable("GITLAB_CLIENT_ID")}&redirect_uri={Util.GetEnvironmentVariable("URI_REDIRECT_PKCE_FLOW")}&response_type=code&state={HttpContext.Session.GetString("StateInitial")}&scope={Util.GetEnvironmentVariable("GITLAB_SCOPE")}&code_challenge={codeChallenge}&code_challenge_method=S256";
                return Redirect(page);
            }else{

                var parameters = new Dictionary<string, string> { 
                    {"client_id", Util.GetEnvironmentVariable("GITLAB_CLIENT_ID") }, 
                    {"code", code },
                    {"grant_type", "authorization_code"},
                    {"redirect_uri", Util.GetEnvironmentVariable("URI_REDIRECT_PKCE_FLOW")},
                    {"client_secret", Util.GetEnvironmentVariable("GITLAB_CLIENT_SECRET")},
                    {"code_verifier",HttpContext.Session.GetString("CodeVerifier")} 
                };            

                var token = await GitLabService.SendPostToken(code, parameters);

                if (token != null)
                {
                    var gitlabuser = await GitLabService.GetUserGitLab(token);
                    ViewData["gitLabUser"] = gitlabuser;
                }                        
                return null;
            }
        }catch(Exception ex){
            _logger.LogError(ex,"Error to access environment variable");
            return null;
        }        
    }
}

