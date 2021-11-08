# Time Management

API Rest para o gerenciamento de horários NodeJS, Typescript, Express.

## Começando

### Pré-requisitos

Para executar este projeto em desenvolvimento, você precisará ter um ambiente básico com o NodeJS instalado (Estou desenvolvendo ele na versão 16.9.0).

### Instalando

#### Clonando o Repositório

```
$ git clone https://github.com/iannisacksson/time-management.git

$ cd time-management
```

#### Instalando dependências

```
$ yarn
```

_ou_

```
$ npm install
```

#### Executando o projeto na máquina

Com todas as dependências instaladas e o ambiente configurado corretamente, agora você pode executar o back-end:

```
$ yarn dev:server
```

_ou_

```
$ npm run dev:server
```

## Rotas

A URL para testar se está em execução o back-end é: [http://localhost:3000/](http://localhost:3000/).

### Rota para cadastrar regras.

- Rota do tipo **POST**.
  [http://localhost:3333/times](http://localhost:3333/times).

- AS regras são por tipo: *specific*, *daily* e *weekly*. Dependendo da opção escolhida é chamado regras próprias para elas.

### Rota para listar regras

- Rota do tipo **GET**
  [http://localhost:3333/times](http://localhost:3333/times).

### Rota para listar horários

- Rota do tipo **POST** para realizar um agendamento.
  [http://localhost:3000/times/available?start_date=2021-11-07T00%3A00%3A00-03%3A00&end_date=2021-11-28T00%3A00%3A00-03%3A00](http://localhost:3333/times/available?start_time=2021-11-07T00:00:00-03:00&end_time=2021-11-28T00:00:00-03:00).

- É obrigatório informar as query: *start_date* e *end_date*

### Rota para deletar regra

- - Rota do tipo **DELETE**
  [http://localhost:3333/times/:id](http://localhost:3333/times/:id).
