# Node TS URL shortener

![Test Status](https://img.shields.io/badge/Jest-tested-brightgreen?logo=jest)
![Build Status](https://img.shields.io/badge/build-passing-success?logo=github)

## 🧰 Stack

[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-ORM-red?logo=typeorm)](https://typeorm.io/)
[![MySQL](https://img.shields.io/badge/MySQL-DB-4479A1?logo=mysql)](https://www.mysql.com/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-brightgreen?logo=swagger)](https://swagger.io/)
[![Jest](https://img.shields.io/badge/Tested%20with-Jest-99425b?logo=jest)](https://jestjs.io/)
[![Testcontainers](https://img.shields.io/badge/Testcontainers-Integration--Testing-green?logo=docker)](https://testcontainers.com/)
[![Husky](https://img.shields.io/badge/Husky-Git%20Hooks-8e44ad?logo=git)](https://typicode.github.io/husky/)
[![Supertest](https://img.shields.io/badge/Supertest-API%20Testing-blueviolet)](https://github.com/visionmedia/supertest)
[![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/linting-eslint-yellow?logo=eslint)](https://eslint.org/)

---

## 🔐 Introduction

This is a REST API built with **TypeScript**, **Node.js** and **Express** that implements URL shortener. It's a great base for systems that require this basic management.

Features include:

- 🧪 Real **MySQL** integration testing using **Testcontainers**.
- ✨ **ESLint** + **Prettier** + **Husky** for code quality enforcement.
- 🔁 **GitHub Actions** for automated CI/CD.

---

## 📁 Project Structure

```
├── .github/
├── .husky/
├── .vscode/                # Debuggers and workspace configuration.
├── src/
|   ├── constants/          # HTTP codes, error messages, table/model names.
|   ├── controllers/        # Endpoint logic.
|   ├── errors/             # Custom error classes.
|   ├── middlewares/        # Auth, error handling, swagger auth.
|   ├── models/             # Typeorm models.
|   ├── repositories/       # Data access abstraction.
|   ├── routes/             # Route definitions.
|   ├── services/           # Business logic.
|   ├── types/              # Data structure definitions.
|   ├── utils/              # Reusable functions.
|   ├── app.ts              # Express app configuration.
|   ├── configuration.ts    # .env configuration entry point.
|   ├── data-source.ts      # Typeorm configuration.
|   ├── server.ts           # Entry point.
|   └── swagger.ts          # Swagger configuration.
├── test/                   # Unit and integration tests using jest, supertest and testcontainers.
├── .gitignore              # Default gitignore file provided by GitHub.
├── .prettierrc             # Prettier configuration file.
├── eslint.config.mjs       # ESLint configuration file.
├── jest.config.ts          # Jest configuration file.
├── LICENSE                 # MIT License.
├── package-lock.json       # Exact project dependencies tree.
├── package.json            # Project dependencies, scripts and more stuff.
├── README.md               # Current file.
├── tsconfig.eslint.json    # ESLint typescript config file.
└── tsconfig.json           # Project typescript config.
```

---

## 🚀 Quick Installation

```bash
git clone https://github.com/cristiancosta/node-ts-url-shortener.git
cd node-ts-url-shortener
npm install
```

Then create a `.env` file in the project root with the following content:

```env
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=nodeurlshortener
DB_PORT=3306

SERVER_PORT=8081

SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=admin
```

Make sure you have a MySQL database up and running. In my case, I use Docker since it's the easiest way:

```bash
$ docker run -p 3306:3306 -e MYSQL_ROOT_USER=root -e MYSQL_ROOT_PASSWORD=root -d mysql
```

Log into the container and create the database:

```bash
$ docker exec -it <CONTAINER ID> mysql -uroot -proot
$ CREATE DATABASE nodeurlshortener;
```

Start the server:

```bash
npm start
```

📍 The API will be available at: `http://localhost:8081`

---

## 📚 Interactive Documentation

You can explore and test all endpoints using Swagger UI:

🔗 [http://localhost:8081/api-docs/](http://localhost:8081/api-docs/)

Basic Auth required:

- **Username:** `admin`
- **Password:** `admin`

You can change Swagger credentials on `.env` file.

---

## 🧪 Testing with Testcontainers

This project uses **Testcontainers** to spin up a real MySQL instance during tests. This ensures:

- A test environment **identical to production**.
- No fragile mocks.
- Automatic container cleanup.

Run tests:

```bash
npm test
```

---

## ✅ Husky + Pre-commit hooks

The project uses **Husky** to automatically run the following before each commit:

```bash
npx lint-staged  # Runs ESLint + Prettier
```

---

## ⚙️ GitHub Actions CI

The project runs automated tests and perform building process on Node.js 20 and 22 via GitHub Actions.

---

## 🛠️ Useful Scripts

| Command            | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `npm start`        | Starts the server with Nodemon                                |
| `npm test`         | Runs all tests using Jest + Testcontainers                    |
| `npm run lint`     | Lints the code using ESLint                                   |
| `npm run lint:fix` | Lints and auto-fixes issues                                   |
| `npm run format`   | Formats code with Prettier                                    |
| `npm run build`    | Builds the project with tsc                                   |
| `npm run serve`    | Starts the server with Node (previous build script execution) |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create a new branch.
3. Submit a Pull Request.
4. Make sure lint and tests pass.

📩 For direct contact: **cristiancosta1991@gmail.com**  
🌟 Found it useful? Give the project a ⭐ on GitHub!

[https://github.com/cristiancosta/node-ts-url-shortener](https://github.com/cristiancosta/node-ts-url-shortener)

---

## ☕ Donations

If you'd like to support this project, feel free to donate a coffee.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C81GYN0D)

---

## 📝 License

MIT © [Cristian Costa](mailto:cristiancosta1991@gmail.com)
