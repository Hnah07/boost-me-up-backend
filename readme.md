# Boost Me Up - Backend API

A Node.js backend API built with Express, TypeScript, and MongoDB, featuring authentication and user management.

This API powers a positive reinforcement web application where users can record and reflect on their daily achievements and positive actions. By documenting these positive moments, users can combat negative self-perception and build a more balanced view of their accomplishments and personal growth.

## Features

- **TypeScript**: Strongly typed language for writing robust and maintainable code
- **Express.js**: Fast, unopinionated web framework for Node.js
- **MongoDB**: NoSQL database with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Security**: CORS enabled, cookie-parser for secure session management
- **Environment Configuration**: Dotenv for environment variable management
- **Development Tools**:
  - TSX for TypeScript execution and hot-reloading
  - Pkgroll for efficient bundling and minification

## Project Structure

```
├── src/
│   ├── controllers/     # Request handlers and business logic
│   ├── middleware/      # Custom middleware functions
│   ├── models/          # Database models and schemas
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   └── server.ts        # Main application entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── .gitignore          # Git ignore rules
```

## API Documentation

The API documentation is available at `/api-docs` when running the server.

## Dependencies

### Core Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcrypt: Password hashing
- cors: Cross-Origin Resource Sharing
- cookie-parser: Cookie parsing middleware
- dotenv: Environment variable management

### Development Dependencies

- typescript: TypeScript compiler
- tsx: TypeScript execution
- pkgroll: Bundling and minification
- @types/\*: TypeScript type definitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository or contact me.
