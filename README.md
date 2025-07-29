# 🩺 MediTime - Backend

**MediTime** é a API backend de uma plataforma de agendamentos médicos, desenvolvida com Node.js, Express e MongoDB. A aplicação oferece suporte à autenticação via JWT, gerenciamento de usuários e agendamentos, upload de exames com Multer, e integração com dashboards do frontend.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express 5
- Mongoose (MongoDB)
- JWT (Autenticação)
- Multer (Upload de arquivos)
- Dotenv
- CORS
- Cookie-parser
- Bcrypt / BcryptJS

---

## 📦 Scripts Disponíveis

| Comando           | Descrição                                     |
|------------------|------------------------------------------------|
| `npm run dev`    | Inicia o servidor com Nodemon (desenvolvimento) |
| `npm start`      | Inicia o servidor normalmente (produção)       |
| `npm test`       | Script de teste padrão                         |

---

## 🔐 Funcionalidades Implementadas

- Registro e login de usuários com hash de senha
- Autenticação JWT com cookies HTTP-only
- Proteção de rotas com middleware
- CRUD de agendamentos médicos
- Upload e listagem de exames com suporte a arquivos
- Integração com MongoDB Atlas
- Suporte a CORS para ambientes locais e produção

---

## ⚙️ Variáveis de Ambiente (.env)

Crie um arquivo `.env` com as seguintes chaves:

```env
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meditime
JWT_SECRET=sua_chave_secreta
PORT=0000