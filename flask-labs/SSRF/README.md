writeup: https://github.com/blabla1337/skf-labs/blob/master/md/Python/kbid-262-server-side-request-forgery.md

Baixe as dependênciais rodando `pip3 install -r requirements.txt`

Para Comprovar a vulnerabilidade desse laboratório, devemos ter o pacote nmap, ou outro software para realizar scan das portas

Exploit:
  1. Rode a aplicação com `python3 SSRF.py`;
  2. Rode o script `run_services.sh` para escutar as portas 3306 e 5432;
  3. Realize o scan das portas abertas, se estiver usando nmap rode: `nmap -vvvv -sT -sV -p -P0 ip_da_maquina`, ip_da_maquina=127.0.0.1 se estiver rodando local;
  4. Note que a porta 3306 não é encontrada no scan;
  5. Na rota `/check_existence`, teste alguns sites conhecidos e outros errados e cheque a validade da aplicação;
  6. Envie `http://127.0.0.1:3306` e verifique que encontramos o serviço mesmo não encontrando-o via nmap.

Solução:
  1. Para prevenir acesso aos serviços internos, troque o if do handler `check_existence` por:
  ```
  ...
  18. protocol = str(urlparse(url).scheme)
  19. hostServ = str(urlparse(url).netloc)
  20. isLocalService = "127.0.0.1" in hostServ or "0.0.0.0" in hostServ or "localhost" in hostServ
  21.  if not validators.url(url) or "http" not in protocol or isLocalService:
  ...
  ```