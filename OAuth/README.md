# OAuth

Esse projeto possui dois fluxos referente ao OAuth 2.0. Um fluxo utilizando PKCE e outro sem utilizar PKCE. O Fluxo que não utiliza o PKCE é possível realizar o ataque de Authorization Code Injection.


## Pré requisitos
É preciso ter uma conta criada no GitLab. E no caso para explorer o ataque de Authorization Code Injection, é interessante ter duas contas.

## Cadastre uma aplicação no GitLab 
Vá em gitlab --> sua foto --> preferences --> applications:
Name: O que desejar.  
Redirect URI:  
https://localhost:7290/GitLabNormalFlow  
https://localhost:7290/GitLabPKCEFlow  

## Configurações Básicas
No arquivo Properties/launchSettings.json configure as variáveis de ambientes:

"GITLAB_URI_AUTHORIZE":"https://gitlab.com/oauth/authorize",  
"GITLAB_URI_TOKEN":"https://gitlab.com/oauth/token",  
"GITLAB_URI_USER":"https://gitlab.com/api/v4/user",  
"GITLAB_CLIENT_ID":"SEU_CLIENT_ID",  
"GITLAB_CLIENT_SECRET":"SEU_CLIENT_SECRET",  
"GITLAB_SCOPE":"read_repository email read_user",  
"URI_REDIRECT_NORMAL_FLOW":"https://localhost:7290/GitLabNormalFlow",  
"URI_REDIRECT_PKCE_FLOW":"https://localhost:7290/GitLabPKCEFlow"  
