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
```

- Run @ localhost:
```bash
  $ npm install     # download dependencies
  $ npm run dev     # start the project by running the package.json script
```

- Run @ Docker (with "Dockerfile"):
```bash
  $ docker build -t name-of-docker-image .    # build the image
  $ docker build -t service-orders .          # ex
  $ docker run [flags] name-of-docker-image   # run the container
  $ docker run -p 3333:3333 service-orders    # ex
  $ ctrl + C                                  # stop the container
```
