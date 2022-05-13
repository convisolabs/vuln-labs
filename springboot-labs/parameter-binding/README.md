writeup: https://owasp-skf.gitbook.io/asvs-write-ups/parameter-binding/kbid-147-parameter-binding-1

Exploit:
  1. Realize o build do container Docker `docker build -t javapb .`;
  2. Rode o container com `docker run -p 5000:5000 javapb`;
  3. Acesse a aplicação rodando na porta 5000;
  4. Utilize algum software de proxy para interceptar a requisição de criar novo usuário ou adicione um novo input para enviar admin: true no body da requisição;
  5. perceba que o usuário foi criado como administrador.

Solução:
  1. Para corrigir a vulnerabilidade, basta seguir as instruções descritas em `ParameterBindingModel.java`;
  2. A partir dessa nova imagem, rode e teste a aplicação (caso de build novamente, lembre de usar a flag --no-cache).