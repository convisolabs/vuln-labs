writeup: https://owasp-skf.gitbook.io/asvs-write-ups/content-security-policy-csp/kbid-178-csp-1

Exploit:
  1. Realize o build do container Docker `docker build -t javacsp .`;
  2. Rode o container com `docker run -p 5000:5000 javacsp`;
  3. Acesse a aplicação rodando na porta 5000;
  4. Perceba que existem dois inputs na tela inicial, uma com CSP header e outra sem;
  5. Teste XSS nos dois inputs, perceba que o header CSP previne de ataques XSS.