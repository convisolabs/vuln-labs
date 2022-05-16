Essa aplicação é a versão insegura da aplicação `root_nosql`. Essa aplicação apresenta broken access control e nosql injection.

Copie o arquivo `.env.example` para a raiz do projeto como `.env` e preencha as variáveis.

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`.

Cheque se o banco de dados já não está populado no Atlas, caso não esteja basta rodar `node startDb.js` na pasta `server/config`.

Para inicializar a aplicação, abra dois terminais e em um rode `npm run start` dentro de `client` e `npm run dev` dentro de `server`.

Hints:
  1. `id` enviado via query param, podendo ser manipulável, tal como mostrado em `server/dashboard.js`, tendo acesso a informações de outros usuários.
