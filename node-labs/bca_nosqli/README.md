Para rodar esse laboratório, é preciso criar um banco MongoDB, como na cloud da [Atlas](https://www.mongodb.com/atlas/database)

Em `server`, copie o arquivo `.env.example` para a raiz do projeto como `.env` e preencha as variáveis

Para rodar a aplicação, rode inicialmente o `server` como o comando `npm run dev` e copie a url do backend;

Em `client`, copie `.env.example` na raiz como `.env` e preencha a varia´vel `BACKEND_URL` com a url do backend

Por fim, inicie o frontend em `client` com `npm run start`

hints:
  1. `id` enviado via query param, podendo ser manipulável, tal como mostrado em `server/dashboard.js`, tendo acesso a informações de outros usuários.


Correções dessa aplicação se encontram em `root_nosql`