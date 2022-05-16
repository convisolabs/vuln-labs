Essa aplicação é a versão segura, com as vulnerabilidades apresentadas em `bca_wc_sqli` mitigadas.

Alguns dos pontos de atenção:
  1. Utilização das informações de usuário salvos no token jwt, ao invés de utilizar parâmetros passados por query, para prevenir Broken Access Control;
  2. Utilização de query params, ao invés de concatenação de string, na construção das consultas SQL;
  3. Utilização da lib bcrypt para salvar a senha com hash+salt, ao invés de métodos inseguros de criptografia.

Para criar e popular o banco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`.

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`.

Para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`.