# Software Design

### Type of software design

---

### How module system will work in system design

---

### Benefits of modular system from others

---

### Difference between modular system and MVC pattern

---

### Working with mongoose and typescript for better dev experience

interface => schema => model => DB query

# Project Folder Structure

```javascript
├── src
│    ├── modules
│    │   ├── auth
│    │   │   ├── auth.controller.ts
│    │   │   ├── auth.services.ts
│    │   │   ├── auth.models.ts
│    │   │   └── auth.routes.ts
│    │   ├── user
│    │   │   ├── user.controllers.ts
│    │   │   ├── user.services.ts
│    │   │   ├── user.models.ts
│    │   │   └── user.routes.ts
│    │   ├── product
│    │   │   ├── product.controllers.ts
│    │   │   ├── product.services.ts
│    │   │   ├── product.models.ts
│    │   │   └── product.routes.ts
│    │   ├── config
│    │   ├── middlewares
│    │   ├── utils
│    │   └── server.ts
│    │   └── app.ts
├── tests
│   ├── unit
│   └── integration
├── public
├── scripts
├── .env
├── package.json
└── README.md
```

## Folder Descriptions

- **src/modules/auth/**: Handles everything related to authentication (login, signup, etc.).
  - **auth.controller.ts**: Processes incoming HTTP requests for authentication.
  - **auth.services.ts**: Contains business logic like user verification.
  - **auth.models.ts**: Defines the schema for user credentials.
  - **auth.routes.ts**: Routes that handle authentication-related API requests.
- **src/modules/user/**: Manages user-related functionalities (e.g., profiles, updates).
  - **user.controllers.ts**: Processes user requests like updating a profile.
  - **user.services.ts**: Core logic for user management.
  - **user.models.ts**: User database schema and models.
  - **user.routes.ts**: API endpoints for user operations.
- **src/modules/product/**: Manages product-related features (e.g., inventory, listings).
  - **product.controllers.ts**: Handles product requests like adding or updating a product.
  - **product.services.ts**: Business logic for managing products.
  - **product.models.ts**: Defines the product database schema.
  - **product.routes.ts**: API routes for interacting with products.
- **config/**: Configuration files (e.g., database, API keys) for different environments.
- **middlewares/**: Custom middleware (e.g., for authentication, request validation).
- **utils/**: Reusable utility functions across the application (e.g., helpers, logging).
- **server.ts**: Main server file to start the application.
- **app.ts**: Configures and sets up the app (e.g., middleware, routes).

- **tests/**: Contains test cases to verify application functionality.
  - **unit/**: Contains unit tests for individual modules.
  - **integration/**: Integration tests that check how different modules interact together.
- **public/**: Public files like images or HTML that are served statically.
- **scripts/**: Automation scripts for deployment or data seeding.

- **.env**: Configuration for environment-specific variables.

- **package.json**: Contains project dependencies and scripts for running the app.

- **README.md**: Documentation for the project.
