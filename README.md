# Portfolio Maker (MERN)

A simple and minimal web application built using the MERN Stack (MongoDB, Express, React, Node.js) that allows users to create their own portfolio by entering details like Achievements, Projects, Education, Experience and more.  
The application generates a clean personal portfolio that users can preview.

---

## Features

- Add personal details (name, description, social links)
- Add achievements, education, projects, experience
- Live preview of portfolio
- Responsive and minimal UI
- Stores data in MongoDB
- Easy to customize and extend

---

## Tech Stack

|Technology |Description |
|-----------|------------|
| React | Frontend |
| Node.js | Backend |
| Express.js | API framework |
| MongoDB | Database |
| Axios | API calls |
| Tailwind / CSS | Styling  |

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-maker.git
cd portfolio-maker
````

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Start the application

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## Project Structure

```
/frontend      -> React frontend
/backend      -> Express backend
```

---


This project is available under the MIT License.
