Essa aplicação é a versão segura, com as vulnerabilidades apresentadas em `bca_wc_sqli` mitigadas;

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`.

Para criar e popular o banco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`.

Para rodar a aplicação, rode inicialmente o `server` com o comando `npm run dev` e copie a url do backend;

Em `client`, copie `.env.example` na raiz como `.env` e preencha a varia´vel `BACKEND_URL` com a url do backend;

Por fim, inicie o frontend em `client` com `npm run start`;

Alguns dos pontos de atenção:
  1. Utilização das informações de usuário salvos no token jwt, ao invés de utilizar parâmetros passados por query, para prevenir Broken Access Control;
  2. Utilização de query params, ao invés de concatenação de string, na construção das consultas SQL;
  3. Utilização da lib bcrypt para salvar a senha com hash+salt, ao invés de métodos inseguros de criptografia.