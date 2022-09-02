namespace OAuth.Models;

public class Token{
    public string access_token { get; set; }
    public string token_type { get; set; }
    public Int64 expires_in { get; set; }
    public string refresh_token { get; set; }
    public string scope { get; set; }
    public Int64 created_at { get; set; }
}