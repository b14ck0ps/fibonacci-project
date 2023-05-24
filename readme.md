# Fibonacci Series Project

_*This project was created for learning Docker and Kubernetes._

This project calculates the Fibonacci series based on user input. It consists of a client application built with Vite React, an API built with Express, and a worker. Redis is used for local caching of calculated values, while Postgres is used to store all previously calculated values.

## Description

The Fibonacci series is a sequence of numbers in which each number is the sum of the two preceding ones. In this project, the user can input an index, and the application will calculate and display the corresponding Fibonacci value.

The project is divided into the following components:

- **Client Application**: A front-end interface built with Vite React. Users can input an index and view the calculated Fibonacci values.

- **API**: An Express API that provides endpoints to interact with the application. It handles user requests, stores the calculated values in Postgres, and retrieves values from Redis cache for improved performance.

- **Worker**: A background worker that subscribes to Redis channel events. It calculates Fibonacci values for new indexes and stores them in Redis cache.

## Installation

To run the project, make sure you have Docker installed on your system. Then, follow these steps:

1. Clone the repository: `git clone https://github.com/b14ck0ps/fibonacci-project.git`
2. Navigate to the project directory: `cd fibonacci-project`
3. Build and start the containers: `docker-compose up --build`
4. Access the client application at `http://localhost:3050`

## Technologies Used

- Vite React
- Express
- Redis
- Postgres
- Docker
- Nginx

## Usage

1. Start the Docker containers: `docker-compose up`
2. Access the client application at `http://localhost:3050`
3. Enter an index to calculate the corresponding Fibonacci value.
4. Previously calculated values will be fetched from the Redis cache for faster retrieval.
