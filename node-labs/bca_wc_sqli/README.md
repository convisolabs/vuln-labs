Essa aplicação é a versão insegura da aplicação `root_sql`. Essa aplicação apresenta falhas de criptografia, broken access control e sql injection.

Para criar e popular o banco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`.

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`.

Para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`.