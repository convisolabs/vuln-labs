writeup: https://github.com/blabla1337/skf-labs/blob/master/md/Python/kbid-262-server-side-request-forgery.md

Exploit:
  1. Realize o build do container Docker `docker build -t javaxss .`;
  2. Rode o container com `docker run -p 5000:5000 javaxss`;
  3. Acesse a aplicação rodando na porta 5000;
  4. No input da página inicial, alguns xss, como "teste<script>alert(1)</script>";
  11. Perceba que o input é vulnerável a xss;

Solução:
  1. Para corrigir a vulnerabilidade, basta descomentar a linha 7 e 15 em `XssController.java`
  2. A partir dessa nova imagem, rode e teste a aplicação (caso de build novamente, lembre de usar a flag --no-cache)