# OAuth
Creating a Authentication using javascript , express , bcrypt and mongodb

Here is a GitHub `README.md` template for your sign-in and sign-up API implementation:

```md
# User Authentication API

This project provides a basic user authentication system using Node.js, Express, bcrypt for password hashing, and JWT (JSON Web Tokens) for secure authentication.

## Features

- User registration (sign-up) with validation for username and password
- Password hashing using `bcrypt`
- User login (sign-in) with validation and JWT token generation
- Authentication middleware to protect routes using JWT

## Technologies

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **bcrypt**: Library to hash passwords
- **jsonwebtoken**: Library to generate and verify JWT tokens
- **MongoDB**: Database to store user information

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14+)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project with the following environment variables:

   ```
   JWT_SECRET=Pavan#9963
   BCRYPT_SALT_ROUNDS=11
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ```

5. Start your MongoDB instance locally or use a MongoDB cloud instance.

6. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## API Endpoints

### Sign Up

**POST** `/api/signup`

Creates a new user account.

**Request Body:**

```json
{
  "userName": "yourUsername",
  "password": "yourPassword",
  "confirmpassword": "yourPassword"
}
```

**Response:**

- `200 OK` if the user is successfully created
- `422 Unprocessable Entity` if validation fails

---

### Sign In

**POST** `/api/signin`

Logs in an existing user and returns a JWT token.

**Request Body:**

```json
{
  "userName": "yourUsername",
  "password": "yourPassword"
}
```

**Response:**

- `200 OK` with a JWT token if login is successful
- `422 Unprocessable Entity` if the username or password is incorrect

---

### Protected Route

**GET** `/api/`

A protected route that requires a valid JWT token in the `Authorization` header.

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

- `200 OK` if the token is valid and the user is authenticated
- `422 Unprocessable Entity` if the token is invalid

---

## Middleware

### `validateSigninName`

Validates the username in the request body. The username must not be null and must contain at least 5 characters.

### `validatePassword`

Validates the password. The password must not be null and must not contain the username. It also checks if the password matches the confirmation password (`confirmpassword`).

### `hashPassword`

Hashes the user's password using `bcrypt` before saving the user to the database.

### `validateSignin`

Validates the user's login credentials and compares the provided password with the hashed password in the database. If the password is correct, it attaches the user's payload (username and Slack ID) to the `req` object for token generation.

### `Authentication`

Checks the `Authorization` header for a valid JWT token to protect routes.

---



## License

This project is licensed under the MIT License.
```

### Steps for Usage:
- Update the placeholder text like `your-username` and `your-repo-name` with your actual GitHub details.
- Modify `JWT_SECRET` and `MONGO_URI` in the `.env` file as needed for your environment.
  
This `README.md` provides a clear guide for setting up and using your API with all the necessary information.