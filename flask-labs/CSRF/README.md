write-up: https://owasp-skf.gitbook.io/asvs-write-ups/csrf/kbid-5-csrf

para setup do sistema, rode `pip3 install -r requirements.txt`, python 3.7 foi utilizado

CSRF na prática:
  1. Rode `python3 CSRF.py` para subir a aplicação;
  2. Logue no sistem utilizando as credenciais admin:admin;
  3. Rode `python3 evil_server.py` para subir a aplicação que será usada no ataque;
  5. Note que em `evil.html` existe um form escondido que envia requisição para a aplicação principal para trocar
  o nome da cor, isso acontece graças a já estarmos logado na aplicação principal;
  6. verifique que a cor foi trocada para `Hackzord!` foi de fato trocado;
  7. Se não trocou, tente recarregar a página `evil.html` para reenviar a requisição.

Solução:
  1. Devemos utilizar soluções para se prefinir desse tipo de ataque, para isso será utilizado a lib flask_wtf
  2. Adicione em `CSRF.py`:
  ```
    3. from flask_wtf.csrf import CSRFProtect
    4. csrf = CSRFProtect()
    ...
    9. # Não devemos guardar secrets no código, token utilizado para validação do forms
    10. app.config['WTF_CSRF_SECRET_KEY'] = "Frybv%#$ç754"
    ...
    59. csrf.init_app(app)
    ...
  ```
  3. Adicione em `loggedin.html`
  ```
  ...
  <!-- validate if token is present -->
  <input type="hidden" name="csrf_token" value="{{ csrf_token() }}" />
  ...
  ```