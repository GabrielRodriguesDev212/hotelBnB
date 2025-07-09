# 🏨 HotelBnB

- [Acesse aqui](https://hotelbnb-vng7.onrender.com)

Sistema de reservas estilo BnB desenvolvido com **React.js**, **Node.js**, **Express**, **MongoDB** e **Tailwind CSS**. O projeto permite que usuários criem contas, cadastrem hospedagens e façam reservas de forma simples, funcional e intuitiva.

---

## 🚀 Tecnologias

### 🔧 Back-end

- Node.js
- Express
- MongoDB + Mongoose
- JWT (Autenticação)
- Multer (Upload de imagens)
- Cookie-Parser

### 💻 Front-end

- React.js
- Tailwind CSS
- React Router DOM
- Axios

---

## ⚙️ Funcionalidades

- ***

## 🧽 Como executar

### 🔄 Clone o repositório

```bash
git clone https://github.com/GabrielRodriguesDev212/hotelBnB.git
cd hotelBnB
```

### 📁 Backend (API)

```bash
cd api
npm install
```

Crie um arquivo `.env` dentro da pasta `api` com as variáveis:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/hotelbnb
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor:

```bash
npm run dev
```

### 🌐 Frontend (Cliente)

```bash
cd ../client
npm install
npm run dev
```

Abra em seu navegador:\
`http://localhost:5173`

---

## 🗂 Estrutura de Pastas

```
hotelBnB/
├── api/
│   ├── domains/
│   ├── uploads/
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── README.md
```

---

## 📌 Informações adicionais

- Projeto em desenvolvimento para fins de estudo e portfólio.
- Futuras melhorias incluem filtros de hospedagem, sistema de avaliação e integração com pagamentos.

---

## 🧑‍💻 Autor

Desenvolvido por [Gabriel Rodrigues](https://github.com/GabrielRodriguesDev212) 💙

---

## 📃 Licença

Este projeto está licenciado sob a licença MIT.
