Sure, I'll add the instructions for setting up the MySQL database and table in the `README.md` file. Here is the updated version with the additional MySQL setup instructions:

### README.md

```markdown
# Redis API with Node.js and MySQL

## Description

This project demonstrates how to create a simple RESTful API using Node.js, MySQL, and Redis. The API supports fetching, adding, and updating country data, leveraging Redis for caching to improve performance.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/redis_api.git
    cd redis_api
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

## Configuration

1. **Create a `.env` file in the root directory and configure your environment variables:**

    ```env
    MYSQL_HOST=localhost
    MYSQL_USER=your_user
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=your_database
    REDIS_HOST=localhost
    REDIS_PORT=6379
    PORT=8080
    ```

2. **Update MySQL user authentication method (if necessary):**
    ```sh
    sudo mysql -u root -p
    ```

    ```sql
    ALTER USER 'your_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
    FLUSH PRIVILEGES;
    EXIT;
    ```

## Database Setup

1. **Login to MySQL as root:**
    ```sh
    sudo mysql -u root -p
    ```

2. **Enter your MySQL root password and press ENTER to proceed. Then, issue the following SQL commands to create a sample e-commerce database and a user account. Replace `EXAMPLE_PASSWORD` with a strong password:**
    ```sql
    CREATE DATABASE e_commerce;
    CREATE USER 'e_commerce_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'EXAMPLE_PASSWORD';
    GRANT ALL PRIVILEGES ON e_commerce.* TO 'e_commerce_user'@'localhost';
    FLUSH PRIVILEGES;
    ```

    **Output:**
    ```
    Query OK, 0 rows affected (0.01 sec)
    ```

3. **Switch to the new e_commerce database:**
    ```sql
    USE e_commerce;
    ```

    **Output:**
    ```
    Database changed
    ```

4. **Create a `countries` table:**
    ```sql
    CREATE TABLE countries (
        country_id BIGINT NOT NULL PRIMARY KEY,
        country_name VARCHAR(100)
    ) ENGINE = InnoDB;
    ```

    **Output:**
    ```
    Query OK, 0 rows affected (0.01 sec)
    ```

5. **Insert sample data into the `countries` table:**
    ```sql
    INSERT INTO countries (country_id, country_name) VALUES ('1', "USA");
    INSERT INTO countries (country_id, country_name) VALUES ('39', "ITALY");
    INSERT INTO countries (country_id, country_name) VALUES ('86', "CHINA");
    INSERT INTO countries (country_id, country_name) VALUES ('81', "JAPAN");
    INSERT INTO countries (country_id, country_name) VALUES ('27', "SOUTH AFRICA");
    ```

    **Output:**
    ```
    Query OK, 1 row affected (0.01 sec)
    ```

6. **Query the `countries` table to ensure the data is in place:**
    ```sql
    SELECT country_id, country_name FROM countries;
    ```

    **Output:**
    ```
    +------------+--------------+
    | country_id | country_name |
    +------------+--------------+
    |          1 | USA          |
    |         27 | SOUTH AFRICA |
    |         39 | ITALY        |
    |         81 | JAPAN        |
    |         86 | CHINA        |
    +------------+--------------+
    5 rows in set (0.01 sec)
    ```

7. **Log out from the MySQL server:**
    ```sql
    QUIT;
    ```

    **Output:**
    ```
    Bye
    ```

## Usage

1. **Start the application:**
    ```sh
    npm start
    ```

2. **The server will run at:**
    ```
    http://localhost:8080
    ```

## Project Structure

```
redis_api/
│
├── config/
│   └── config.js
│
├── controllers/
│   └── dataController.js
│
├── models/
│   ├── mysql_database.js
│   └── redis_server.js
│
├── routes/
│   └── dataRoutes.js
│
├── node_modules/
├── .env
├── package-lock.json
├── package.json
└── app.js
```

### File Explanations

#### config/config.js

**Purpose:** Loads and manages environment variables for configuration.

#### controllers/dataController.js

**Purpose:** Handles application logic related to data operations (fetch, add, update).

#### models/mysql_database.js

**Purpose:** Manages the connection and interactions with the MySQL database.

#### models/redis_server.js

**Purpose:** Manages the connection and interactions with the Redis server.

#### routes/dataRoutes.js

**Purpose:** Defines HTTP routes for data operations.

#### app.js

**Purpose:** Sets up the Express application, configures middleware, and uses routes defined in `dataRoutes.js`.

## Endpoints

### Get All Countries

- **URL:** `/`
- **Method:** `GET`
- **Description:** Fetches all country data, either from Redis cache or MySQL database.

### Get Country by ID

- **URL:** `/:id`
- **Method:** `GET`
- **Description:** Fetches country data by ID from the MySQL database.

### Add New Country

- **URL:** `/add`
- **Method:** `POST`
- **Description:** Adds new country data to the MySQL database and clears the Redis cache.
- **Body:**
    ```json
    {
        "country_id": 100,
        "country_name": "NEWLAND"
    }
    ```

### Update Country

- **URL:** `/update`
- **Method:** `PUT`
- **Description:** Updates existing country data in the MySQL database and clears the Redis cache.
- **Body:**
    ```json
    {
        "country_id": 100,
        "country_name": "UPDATEDLAND"
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This updated `README.md` now includes the detailed steps for setting up the MySQL database and table, along with the existing information about installation, configuration, usage, project structure, endpoints, and licensing. This should provide comprehensive guidance for anyone looking to understand and work with your project.