# desafio-microsservicos

## 🚀 Projeto
Projeto do curso de Microsserviços da [@Rocketseat](https://app.rocketseat.com.br/), feito em set/25.

## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone url-do-projeto.git
```

### ▶️ Rodando o App:

```bash
  $ cd desafio-microsservicos     # change to that directory
  $ cd app-orders                 # change to that directory
```

- Terminal 1: Server:
```bash
  # V1: run @ localhost:
  $ npm install     # download dependencies
  $ npm run dev     # start the project by running the package.json script

  # V2: run @ Docker:
  $ docker build -t name-of-docker-image .    # build the image
  $ docker build -t service-orders .          # ex
  $ docker run [flags] name-of-docker-image   # run the container
  $ docker run -p 3333:3333 service-orders    # ex
  $ ctrl + C                                  # stop the container
```

- Terminal 2: Database:
```bash
  $ docker compose up         # build the image and runs the container
  $ ctrl + C                  # stop the container
  $ docker compose down       # delete the container
```

- Terminal 3: SQL:
```bash
  $ npx drizzle-kit generate  # create the .sql files based on the db schema
  $ npx drizzle-kit migrate   # execute the SQL commands from the db/migrations files
  $ npx drizzle-kit studio    # db UI (OBS: Safari browsers block access to localhost by default)
```

- Terminal 4: RabbitMQ broker messager:
```bash
  # path: root ("docker-compose.yaml" file @ root of dir)
  $ docker compose up         # build the image and runs the container
  # RabbitMQ UI: http://localhost:5672    user: "guest"   password: "guest"
```
