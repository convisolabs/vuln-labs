copie o arquivo `.env.example` para a raiz do projeto como `.env` e preencha as variáveis

cheque se o banco de dados já não está populado no Atlas, caso não esteja basta rodar `node startDb.js` na pasta `config/`

para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`

hints:
  1. `id` enviado via query param, podendo ser manipulável, tal como mostrado em `server/dashboard.js`, tendo acesso a informações de outros usuários.


Correções dessa aplicação se encontram em `root_nosql`