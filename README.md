<h1 align="center">Welcome to Node-TS Auth API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A production‑grade REST API built with **Node.js**, **TypeScript**, **Express**, **Prisma** & **PostgreSQL**, featuring:
> - JWT‑based authentication (signup/login)  
> - Role‑based authorization + ownership guards  
> - User profile CRUD + user‑details (DOB, height, weight) with on‑the‑fly age & BMI  
> - Zod validation and layered service/repo architecture with pino as logger 

### 🌟 Key Features

---

- 🔐 **Role-Based Access**  
  - **Users** can register, log in, and manage **only their own** account.  
  - **Admins** have full visibility and control: view, update, or delete **any** user.

- ⚙️ **Account Management**  
  - Update or delete your profile at any time (requires authentication).  
  - Sessions expire after **1 hour**—you’ll need to re‑authenticate to continue.

- 📊 **Health Endpoint**  
  - Authenticated users can call `POST /:userId/details` to calculate and retrieve their **BMI** & **Age**.



✨ _Clean, secure, and focused on giving users the right level of control!_

---

  
  ## 🚀 API Reference

> **Base URL:** `http://localhost:3000/api/users/`

---

### 🔑 Authentication

All protected endpoints require a JWT Bearer token in the `Authorization` header:

---

## 📋 Endpoints

### 🔐 Authentication

#### Sign Up
Creates a new user account and returns an access token valid for 1 hour. Once signed in you have successfully logged in and ready to compute your health metrics like age and BMI.

- **Endpoint:** `POST /`
- **Authentication:** Not required

**Request Body:**
```json
{
  "name": "John",
  "email": "example@gmail.com",
  "password": "123456"
}
```



---

#### Log In
Authenticates an existing user and returns a fresh access token.

- **Endpoint:** `POST /login`
- **Authentication:** Not required

**Request Body:**
```json
{
  "email": "example@gmail.com",
  "password": "123456"
}
```



---

### 👤 User Details

#### Calculate BMI & Age
Computes and returns the user's BMI and current age based on provided details.

- **Endpoint:** `POST /:userId/get_age_and_bmi`
- **Authentication:** Required 🔒

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | Unique identifier for the user |

**Request Body:**
```json
{
  "dob": "15-08-1990",
  "weight": 70,
  "height": 175
}
```

**Field Descriptions:**
- `dob`: Date of birth in dd-mm-yyyy format
- `weight`: Weight in kilogram
- `height`: Height in centimeter


  

## 1. Install the necessary modules

```sh
npm install
```

## 2. Create .env file 

- Use .env.example file to create your own .env file
- Create your own database in Postgres

## 3. Run migrations

```sh
npx prisma migrate dev --name init_migration
```

## 4. Run the API

```sh
npm run dev
```

## 5. Author

👤 **Sumit Jaiswar**


## 6. Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_