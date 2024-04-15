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

    NodeJS
    Nest.js
    Docker
    PostgreSQL
    Redis

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

  - Iniciar o projeto com o Docker com o seguinte comando:

    ```bash
    docker-compose --env-file .env  up -d
    ```

    OBS - no caso de rodar o projeto direto com o docker, utilizar "db" como POSTGRES_HOST e "cache" como REDIS_HOST no arquivo .env, pois é como estão referenciados no arquivo .env


      