Essa aplicação é a versão insegura da aplicação `root_sql`. Essa aplicação apresenta falhas de criptografia, broken access control e sql injection;

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`;

Para criar e popular o banco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`;

Para rodar a aplicação, rode inicialmente o `server` como o comando `npm run dev` e copie a url do backend;

Em `client`, copie `.env.example` na raiz como `.env` e preencha a variável `BACKEND_URL` com a url do backend;

Por fim, inicie o frontend em `client` com `npm run start`.