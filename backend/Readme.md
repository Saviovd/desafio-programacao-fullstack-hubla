# Technical test Hubla (Back-end)

## Scripts

The following scripts are available in this project:

- **`dev`:**  
  Starts the development server using `nodemon` and watches for changes in `src/server.ts`.  
  Command: `nodemon src/server.ts`

- **`build`:**  
  Compiles TypeScript files into JavaScript using `tsc` (TypeScript Compiler).  
  Command: `tsc`

- **`start`:**  
  Starts the production server using the compiled `dist/app.js` file.  
  Command: `node dist/app.js`

- **`test`:**  
  Runs the test suite using Jest.  
  Command: `jest`

---

## Dependencies

These are the main dependencies used in the project:

- **`cors`** (`^2.8.5`):  
  Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express applications.

- **`dotenv`** (`^16.4.7`):  
  Loads environment variables from a `.env` file into `process.env`.

- **`express`** (`^4.21.2`):  
  A fast, unopinionated, minimalist web framework for Node.js.

- **`moment-timezone`** (`^0.5.46`):  
  A library for handling time zones using Moment.js.

- **`multer`** (`^1.4.5-lts.1`):  
  Middleware for handling `multipart/form-data`, primarily used for uploading files.

- **`mysql2`** (`^3.11.5`):  
  A MySQL client for Node.js, with support for prepared statements and promises.

---

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saviovd/desafio-programacao-fullstack-hubla
1. **Access the backend folder**:
   ```bash
    cd .\backend\
1. **Install dependencies**:
   ```bash
    npm install
1. **Run the development server**:
   ```bash
   npm run dev
1. **Build for production**:
   ```bash
   npm run build
1. **Start the production server**:
   ```bash
   npm run start