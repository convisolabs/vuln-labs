para criar e popular o baco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`

Para rodar a aplicação, rode inicialmente o `server` como o comando `npm run dev` e copie a url do backend;

Em `client`, copie `.env.example` na raiz como `.env` e preencha a varia´vel `BACKEND_URL` com a url do backend

Por fim, inicie o frontend em `client` com `npm run start`

hints:
  1. MD5 Utilizado para hashear senhas;
  2. `userId` salvo em localStorage utilizado para obter dados do usuário, facilmente manipulável;
  3. Concatenação de string em consulta de todos, abrindo espaço para injeção de comandos SQL.


Correções dessa aplicação se encontram em `root_sql`