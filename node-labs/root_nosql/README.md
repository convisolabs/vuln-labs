Para rodar esse laboratório, é preciso criar um banco MongoDB, como na cloud da [Atlas](https://www.mongodb.com/atlas/database);

Para instalar as dependências, rode `npm i` na pasta `client` e na pasta `server`;

Em `server`, copie o arquivo `.env.example` para a raiz do projeto como `.env` e preencha as variáveis;

Para rodar a aplicação, rode inicialmente o `server` como o comando `npm run dev` e copie a url do backend;

Em `client`, copie `.env.example` na raiz como `.env` e preencha a varia´vel `BACKEND_URL` com a url do backend;

Por fim, inicie o frontend em `client` com `npm run start`;