# 🎮 API de Games - CRUD Completo

Uma API RESTful para gerenciamento de games desenvolvida com Node.js, Express e MongoDB.

## 📋 Funcionalidades Implementadas

### ✅ CRUD Completo

- **CREATE**: Criar novos games
- **READ**: Listar todos os games ou buscar por ID
- **UPDATE**: Atualizar games existentes
- **DELETE**: Remover games

### 🔍 Filtros e Buscas

- Busca por título (case-insensitive)
- Filtro por gênero
- Filtro por plataforma
- Listagem com ordenação por data de criação

### 🛡️ Middlewares Implementados

#### 1. **Middlewares Globais**

- **express.json()**: Parse de requisições JSON
- **express.urlencoded()**: Parse de dados de formulário
- **cors()**: Habilita CORS para requisições cross-origin
- **Logger personalizado**: Registra todas as requisições

#### 2. **Middleware de Log (Bônus)**

```javascript
// Registra: timestamp, método, URL, IP, User-Agent
[2024-12-29T10:30:45.123Z] GET /games - IP: 127.0.0.1 - User-Agent: PostmanRuntime/7.37.0
```

- Salva logs no console
- Salva logs em arquivo (`logs/requests.log`)

#### 3. **Middleware de Validação**

- **validateGameData**: Valida dados de entrada para criação/atualização

  - Nome: obrigatório, string, 2-100 caracteres
  - Gênero: obrigatório, string não vazia
  - Plataforma: obrigatório, string não vazia
  - Preço: obrigatório, número válido, não negativo, máximo 9999.99

- **validateObjectId**: Valida formato de IDs do MongoDB

#### 4. **Middleware de Tratamento de Erros Centralizado**

Trata diferentes tipos de erro:

- **CastError**: IDs inválidos do MongoDB
- **ValidationError**: Erros de validação do Mongoose
- **Duplicate Key Error**: Recursos duplicados
- **JSON Syntax Error**: JSON malformado
- **Erros internos**: Erro genérico do servidor
- **404**: Rotas não encontradas

## 🚀 Como Rodar o Projeto

### 1. **Pré-requisitos**

- Node.js (v14 ou superior)
- MongoDB Atlas ou MongoDB local
- Git

### 2. **Clonando o Repositório**

```bash
git clone https://github.com/seu-usuario/api-games.git
cd api-games
```

### 3. **Instalando Dependências**

```bash
npm install
```

### 4. **Configurando Variáveis de Ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

**Configurações necessárias no `.env`:**

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/games?retryWrites=true&w=majority
```

### 5. **Executando o Projeto**

```bash
npm start
# ou
node index.js
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### **Base URL**: `http://localhost:3000`

| Método | Endpoint             | Descrição              | Body |
| ------ | -------------------- | ---------------------- | ---- |
| GET    | `/games`             | Lista todos os games   | -    |
| GET    | `/games?titulo=nome` | Busca games por título | -    |
| GET    | `/games/:id`         | Busca game por ID      | -    |
| POST   | `/games`             | Cria novo game         | JSON |
| PUT    | `/games/:id`         | Atualiza game          | JSON |
| DELETE | `/games/:id`         | Remove game            | -    |

### **Exemplo de Body para POST/PUT:**

```json
{
  "titulo": "The Witcher 3",
  "genero": "RPG",
  "plataforma": "PC",
  "lancamento": 2015
}
```

### **Exemplo de Resposta:**

```json
{
  "message": "Game criado com sucesso",
  "data": {
    "_id": "64abc123def456789",
    "titulo": "The Witcher 3",
    "genero": "RPG",
    "plataforma": "PC",
    "lancamento": 2015
  },
  "timestamp": "2024-12-29T10:30:45.123Z"
}
```

## 🛠️ Estrutura do Projeto

```
projeto/
├── middlewares/
│   ├── errorHandler.js      # Tratamento centralizado de erros
│   ├── logger.js           # Log de requisições
│   └── validation.js       # Validação de dados
├── models/
│   └── Game.js            # Schema do MongoDB
├── routes/
│   └── game.routes.js     # Rotas da API
├── logs/
│   └── requests.log       # Arquivo de logs
├── .env                   # Variáveis de ambiente (não commitado)
├── .env.example          # Exemplo de configuração
├── .gitignore           # Arquivos ignorados pelo Git
├── db.js               # Configuração do banco
├── index.js           # Arquivo principal
├── package.json      # Dependências e scripts
└── README.md        # Este arquivo
```

## 🧪 Testando a API

### **Com cURL:**

```bash
# Listar games
curl http://localhost:3000/games

# Criar game
curl -X POST http://localhost:3000/games \
  -H "Content-Type: application/json" \
  -d '{"nome":"Cyberpunk 2077","genero":"RPG","plataforma":"PC","preco":39.99}'

# Buscar por ID
curl http://localhost:3000/games/64abc123def456789
```

### **Com Postman/Insomnia:**

Importe a collection ou teste manualmente os endpoints listados acima.

## 🚧 Desafios Encontrados e Soluções

### 1. **Problema**: Validação de dados inconsistente

**Solução**: Criado middleware `validateGameData` para validação padronizada em todas as rotas de criação/atualização.

### 2. **Problema**: Tratamento de erros espalhado pelo código

**Solução**: Implementado middleware centralizado `errorHandler` que captura e formata todos os tipos de erro de forma consistente.

### 3. **Problema**: Falta de logs para debugging

**Solução**: Criado middleware `logger` que registra todas as requisições com timestamp, método, URL, IP e User-Agent.

### 4. **Problema**: IDs inválidos causavam crashes

**Solução**: Middleware `validateObjectId` valida formato de ObjectId antes de processar a requisição.

### 5. **Problema**: Respostas inconsistentes da API

**Solução**: Padronizado formato de resposta com `message`, `data` e `timestamp` em todas as rotas.

## 🔒 Segurança Implementada

- **CORS** habilitado para requisições cross-origin
- **Validação rigorosa** de entrada de dados
- **Rate limiting** de JSON (10MB máximo)
- **Sanitização** de dados através do Mongoose
- **Logs detalhados** para auditoria

## 📦 Dependências

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "mongodb": "^6.20.0",
    "mongoose": "^8.18.0"
  }
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Seu Nome - seu.email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/api-games](https://github.com/seu-usuario/api-games)
