Essa aplicação é a versão segura, com as vulnerabilidades apresentadas em `bca_nosqli` mitigadas.

Copie o arquivo `.env.example` para a raiz do projeto como `.env` e preencha as variáveis.

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`.

Para criar e popular o baco de dados SQLite basta rodar `node startDb.js` dentro de `server/database`

Para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`