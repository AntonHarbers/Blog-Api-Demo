# Blog API - The Odin Project

A simple backend only API made for the odin project. Made using express, passport and mongoDB.

[Frontend App Repo](https://github.com/AntonHarbers/blog-frontend-demo)
[Frontend App Live]()
[Author Page Repo](https://github.com/AntonHarbers/blog-author-page-demo)
[Author Page]()
[Rest-API Enpoint]()

## Key Concepts

In this Blog API, several key concepts are utilized to ensure a robust, secure, and efficient system. Below are some of the core concepts with examples:

### JWT Authentication

JSON Web Tokens (JWT) are used for securely transmitting information between parties as a JSON object. This is implemented in the authentication of users.

**Example**:

```javascript
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};
```

### Password Hashing

For security, user passwords are hashed using bcrypt before storing in the database.

**Example**:

```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
```

### Async/Await for Asynchronous Code

Async/Await is used to handle asynchronous operations, making the code cleaner and more readable.

**Example**:

```javascript
async function getUser(id) {
  try {
    return await User.findById(id);
  } catch (error) {
    // Handle error
  }
}
```

## API Route Documentation

This API provides various routes for handling blog-related functionalities:

### Authentication Routes

- `POST /auth/signup`: Registers a new user.
- `POST /auth/login`: Authenticates a user and returns a JWT.
- `GET /auth/logout`: Ends the user session (client-side token deletion).
- `GET /auth/session`: Responds with users logged in status and how long the session will last.

### User Routes

- `GET /users`: Retrieves a list of users (admin only).
- `GET /users/:id`: Retrieves a specific user's details.
- `PUT /users/:id`: Updates a user's information.
- `DELETE /users/:id`: Deletes a user account.

### Post Routes

- `GET /posts`: Retrieves all posts.
- `GET /posts/:id`: Retrieves a specific post.
- `POST /posts`: Creates a new post.
- `PUT /posts/:id`: Updates a post.
- `DELETE /posts/:id`: Deletes a post.

### Comment Routes

- `GET /comments`: Retrieves all comments.
- `GET /comments/:id`: Retrieves a specific comment.
- `POST /comments`: Adds a new comment to a post.
- `PUT /comments/:id`: Updates a comment.
- `DELETE /comments/:id`: Deletes a comment.

## Final Notes

Through the development of this Blog API, I've gained valuable insights into backend development, especially in Node.js and Express. Key learnings include:

- **Security Practices**: Implementing JWT for secure authentication and bcrypt for password hashing has emphasized the importance of security in web development.
- **Asynchronous Programming**: Mastery of async/await has greatly improved the handling of asynchronous operations, making the code more readable and maintainable.
- **RESTful API Design**: Developing a set of coherent and well-structured API endpoints has taught me the principles of RESTful design, crucial for scalable and efficient web services.

### Real-World Applicability

The concepts and practices used in this project are directly applicable to real-world scenarios:

- Building secure and scalable APIs for web applications.
- Implementing authentication and authorization in e-commerce platforms, social networks, or any user-based application.
- Utilizing async/await in managing database operations, external API calls, or any asynchronous tasks in server-side logic.

This project has been a stepping stone in my journey as a backend developer, solidifying my foundation and preparing me for more complex and impactful projects in the future.
