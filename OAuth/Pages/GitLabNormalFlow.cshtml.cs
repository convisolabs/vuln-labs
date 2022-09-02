using System.Net;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OAuth.Models;
using OAuth.Services;
using OAuth.Utils;

namespace OAuth.Pages;


public class GitLabNormalFlowModel : PageModel
{
    private readonly ILogger<GitLabNormalFlowModel> _logger;

    public GitLabNormalFlowModel(ILogger<GitLabNormalFlowModel> logger)
    {
        _logger = logger;
    }

    public async Task<IActionResult> OnGet(string code, string state){
        try{

            if (string.IsNullOrEmpty(code) && string.IsNullOrEmpty(state)){
                HttpContext.Session.SetString("StateInitial", Guid.NewGuid().ToString());
                string page = $"{Util.GetEnvironmentVariable("GITLAB_URI_AUTHORIZE")}?client_id={Util.GetEnvironmentVariable("GITLAB_CLIENT_ID")}&redirect_uri={Util.GetEnvironmentVariable("URI_REDIRECT_NORMAL_FLOW")}&response_type=code&state={HttpContext.Session.GetString("StateInitial")}&scope={Util.GetEnvironmentVariable("GITLAB_SCOPE")}";
                return Redirect(page);
            }else{

                var parameters = new Dictionary<string, string> { 
                    {"client_id", Util.GetEnvironmentVariable("GITLAB_CLIENT_ID") }, 
                    {"code", code },
                    {"grant_type", "authorization_code"},
                    {"redirect_uri", Util.GetEnvironmentVariable("URI_REDIRECT_NORMAL_FLOW")},
                    {"client_secret", Util.GetEnvironmentVariable("GITLAB_CLIENT_SECRET")} 
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

