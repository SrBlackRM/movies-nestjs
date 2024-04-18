## Desafio Backend MKS Desenvolvimento de Sistemas

Esse repositório é uma resolução do desafio para vaga backend da MKS Desenvolvimento de Sistemas e Empreendimentos Ltda.

### Informações

O desafio basicamente é desenvolver um sistema de autenticação JWT e uma API CRUD de um catálogo de filme usando as seguintes ferramentas:
  *TypeScript,*
  *Nest.js,*
  *TypeORM,*
  *Swagger,*
  *Docker,*
  *Redis,*
  *PostgreSQL.*


#### *Instalação e Execução*

  1. Requisitos:

    - NodeJS
    - Nest.js
    - Docker
    - PostgreSQL
    - Redis

  2. Execução desse repositório:
  
  - Clonar para uma pasta local
  - instalar as dependências usando npm install ou yarn install.
  - criar um arquivo .env
  - preencher com as seguintes variáveis de ambiente, exemplo:

    ```bash
    POSTGRES_HOST=localhost
    POSTGRES_DB_PORT=5432
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB_NAME=nome_do_banco

    REDIS_HOST=localhost
    REDIS_PORT=6379

    JWT_SECRET=chave_secreta
    ```
    
    OBS - no caso de rodar o projeto direto com o docker, utilizar "db" como POSTGRES_HOST e "cache" como REDIS_HOST no arquivo .env, pois é como estão referenciados no arquivo .env

    Para o caso de querer rodar a aplicação local, deixar como localhost

  - Iniciar o projeto com o Docker com o seguinte comando:

    ```bash
    docker-compose --env-file .env  up -d
    ```
  
  - Acessar o container do docker, usando o comando `docker ps` encontrar o ID do container do postgres e executar:

    ```bash
    docker exec -it nome_do_container psql -U postgres -c 'CREATE DATABASE nome_do_banco;'
    ```

  - Após criar a database, reiniciar o container da aplicação no docker, ou parar e usar localmente com `npm run start`  

### Rotas

Porta padrão do projeto é 8080, mas pode ser alterado

* Filmes: catálogo em `GET /api/v1/movies` (deixei como publico, para que mesmo sem autenticação seja possível visualizar), CRUD completo a partir desse endpoint (autenticado) exemplo criar um novo filme no catálogo ```POST /api/v1/movies/add```
* Usuários: criação de usuário em `POST /api/v1/users`
* Autenticação: autenticação de login em `POST /api/v1/auth/login`, validado o login é gerado um JWT que garante usuário autenticado para o resto da aplicação

#### Exemplos usando as rotas

##### Filmes

**Listando o catálogo de filmes**

`GET localhost:8080/api/v1/movies/`

**Listando filme pelo id**

`GET localhost:8080/api/v1/movies/1`

**Criando filme no banco *Autenticado***

`POST localhost:8080/api/v1/movies/add`
```JSON
  {
    "title": "Homem Aranha 1",
    "release": "07/02/2004",
    "releaseAge": 2004,
    "genre": "Action",
    "country": "United States",
    "runtime": "02:04",
    "score": 98,
    "overview": "Peter Parker was bited by an radioactive spider and became SpiderMan"
  }
```

**Atualiza um filme no banco *Autenticado***

`PUT localhost:8080/api/v1/movies/1/update`
```JSON
  {
    "title": "Homem Aranha 1",
    "release": "07/02/2004"
  }
```

**Deleta um filme no banco *Autenticado***

`DELETE localhost:8080/api/v1/movies/1/delete`

##### Usuários / Autenticação

**Cria um novo usuário (não autenticado para poder criar o primeiro)**

`POST localhost:8080/api/v1/users`
```JSON
  {
    "name": "Michel",
    "username": "SrBlackRM",
    "email": "teste@gmail.com",
    "password": "Test123!"
  }
```

**Faz o login (não autenticado, gera autenticação)**

`POST localhost:8080/api/v1/auth/login`
```JSON
  {
    "email": "teste@gmail.com",
    "password": "Test123!"
  }
```




### Documentação

O projeto conta com uma documentação interativa usando Swagger que você pode acessar facilmente através da rota `/docs`. Lá, é possível ter uma visão completa de todos os endpoints disponíveis, permitindo explorar suas funcionalidades e até mesmo experimentá-los diretamente.

### Deploy

O deploy da aplicação foi feito usando a plataforma Render, e está em pleno funcionamento no seguinte endereço:
https://movies-nestjs.onrender.com