para criar e popular o baco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`

para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`

hints:
  1. MD5 Utilizado para hashear senhas;
  2. `userId` salvo em localStorage utilizado para obter dados do usuário, facilmente manipulável;
  3. Concatenação de string em consulta de todos, abrindo espaço para injeção de comandos SQL.


Correções dessa aplicação se encontram em `root_sql`