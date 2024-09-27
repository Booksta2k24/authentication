# API Documentation

## Overview
This document outlines the API for user authentication, including signup and login functionality. The API is built using Express and provides endpoints for creating a new user and authenticating an existing user.

---

## Base URL
http://localhost:3000/api



---

## Endpoints

### 1. Signup

**POST** `/signup`

#### Description
Creates a new user account.

#### Request Body
The request body should be in JSON format and include the following fields:

| Field      | Type     | Description                     |
|------------|----------|---------------------------------|
| firstName  | string   | The user's first name.         |
| lastName   | string   | The user's last name.          |
| email      | string   | The user's email address.      |
| password   | string   | The user's password.           |

**Example Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

**Example Response Body:**
```json
{
  "success": true,
  "data": {
    "userId": "12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com"
  }
}
```

### 2. Login

**POST** `/login`

#### Description
Login to user account.

#### Request Body
The request body should be in JSON format and include the following fields:

| Field      | Type     | Description                     |
|------------|----------|---------------------------------|
| email      | string   | The user's email address.      |
| password   | string   | The user's password.           |

**Example Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

**Example Response Body:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "def50200...",
  "user": {
    "userId": "12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com"
  }
}
```
