writeup: https://github.com/blabla1337/skf-labs/blob/master/md/Python/kbid-262-server-side-request-forgery.md

Exploit:
  1. Realize o build do container Docker `docker build -t pythonssrf .`;
  2. Rode o container com `docker run -p 5000:5000 pythonssrf`;
  3. Acesse a aplicação rodando na porta 5000;
  5. No input da página inicial, teste a existência de alguns websites;
  7. Acesse o container rodando `docker exec -it container_id bash`;
  8. Dentro do container, rode `netstat -tulpn` e perceba que temos duas portas abertas rodando netcat;
  9. Rode `docker port container_id` e perceba que somente a porta 5000 está a mostra;
  10. Escolha uma das portas do netcat e, na página inicial da aplicação, teste a existência de um serviço nessa porta (se estiver em localhost, `http://127.0.0.1:nc_port`);
  11. Perceba que existe um serviço acessável, comprovando o SSRF;

Solução:
  1. Devemos aplicar políticas de allow-list para evitarmos ataques SSRF para isso, iremos permitir somente teste de existência em URLs. Em `SSRF.py`, adicione às seguintes linhas e troque o if:
  ```
  5. import re
  ...
  19. urlRegex = r"https?:\/\/(www\.)?[a-zA-Z.]{1,256}\.[a-zA-Z]{1,6}\b([a-zA-Z.]*)"
  20. if not validators.url(url) or not re.match(urlRegex, url):
  21. # if not validators.url(url) or "http" not in protocol:
  ...
  ```
  2. A partir dessa nova imagem, rode e teste a aplicação (caso de build novamente, lembre de usar a flag --no-cache)
