# Project Setup Documentation

This repository contains both the **frontend** and **backend** projects. Below are the instructions to run both projects using Docker.

---

## Prerequisites

Ensure that the following are installed on your machine:

- **Docker** (for running containers)
- **WSL (Windows Subsystem for Linux)**: If you're on Windows, make sure that you have WSL installed. Docker Desktop uses WSL 2 for its backend on Windows, so it is required for Docker to work properly. Follow the instructions to install WSL:
  - [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)

---

## Running with Docker

To run both the **frontend** and **backend** together using Docker Compose, follow these steps:

1. **Build and start the containers**:

   In the root directory of the project (where the `docker-compose.yml` file is located), run the following command:

   ```bash
   docker-compose up --build

## This command will:

- Build the Docker images for both the frontend and backend.
- Start the containers for both services.
1. **Access the services**:

- The frontend will be accessible at http://localhost:3000.
- The backend will be accessible at http://localhost:5000.
