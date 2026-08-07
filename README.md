# Mini Kanban de Tarefas

Desafio Fullstack desenvolvido para a Veritas Consultoria Empresarial.

Aplicação Kanban para gerenciamento de tarefas, permitindo criar, editar, excluir e movimentar tarefas entre três colunas fixas: **A Fazer**, **Em Progresso** e **Concluídas**.

O projeto foi desenvolvido utilizando React no frontend e Go no backend, com comunicação através de uma API REST.

---

## Tecnologias utilizadas

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Go
- Gorilla Mux
- API REST
- Persistência em arquivo JSON

---

## Funcionalidades

- Criar tarefas com título e descrição opcional;
- Visualizar tarefas separadas por status;
- Mover tarefas entre colunas:
  - A Fazer;
  - Em Progresso;
  - Concluídas;
- Editar tarefas existentes;
- Excluir tarefas com confirmação;
- Validação de título obrigatório;
- Validação de status permitido;
- Feedbacks visuais de carregamento e erros;
- Indicadores visuais de status das tarefas;
- Contador de tarefas por coluna;
- Comunicação entre frontend e backend através de API REST;
- Persistência dos dados em arquivo JSON.

---

# Como executar o projeto

## Backend

Entre na pasta:

```bash
cd backend
```

Execute a API:

```bash
go run .
```

O backend será iniciado em:

```bash
http://localhost:8080
```

---

## Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Após iniciar, acesse o endereço informado pelo terminal.

---

## User Flow

Fluxo das principais ações do usuário no sistema:

![User Flow](docs/user-flow.png)

---

## Decisões técnicas

O frontend foi desenvolvido utilizando React com Vite, buscando uma estrutura simples e organizada de componentes.

A aplicação foi dividida em componentes responsáveis por diferentes partes do sistema, como:

- Formulário de criação e edição de tarefas;
- Quadro Kanban;
- Colunas;
- Cards de tarefas.

O backend foi desenvolvido em Go utilizando uma API REST responsável pelo gerenciamento das tarefas.

Foram implementados os seguintes endpoints:

- `GET /tasks` - retorna todas as tarefas;
- `POST /tasks` - cria uma nova tarefa;
- `PUT /tasks/{id}` - atualiza uma tarefa existente;
- `DELETE /tasks/{id}` - remove uma tarefa.

A comunicação entre frontend e backend é realizada através de requisições HTTP utilizando os métodos REST.

O backend utiliza persistência em arquivo JSON para manter os dados das tarefas mesmo após o encerramento da aplicação. As informações são carregadas automaticamente ao iniciar o servidor e atualizadas após operações de criação, edição e exclusão.

Também foi configurado CORS para permitir a comunicação entre o frontend e a API.

---

## Validações implementadas

O sistema possui validações básicas para garantir o funcionamento correto da aplicação:

- O título da tarefa é obrigatório;
- O status da tarefa deve possuir um valor permitido:
  - `todo`
  - `doing`
  - `done`

Caso uma informação inválida seja enviada, a API retorna uma mensagem de erro.

---

## Limitações conhecidas e melhorias futuras

Apesar da aplicação atender ao escopo proposto, algumas melhorias podem ser implementadas futuramente:

- Implementação de testes automatizados;
- Adição de drag and drop para movimentação das tarefas;
- Migração da persistência JSON para um banco de dados;
- Implementação de autenticação de usuários;
- Melhorias adicionais de acessibilidade;
- Criação de filtros e busca de tarefas.

---

## Estrutura do projeto

```
/backend
  main.go
  handlers.go
  models.go
  tasks.json

/frontend
  package.json
  src/

/docs
  user-flow.png

README.md
```