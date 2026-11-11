# ExpenseMate

ExpenseMate is a full-stack web application designed to help students
manage their personal finances efficiently.

Users can record expenses, categorize transactions, set monthly budgets,
and monitor their spending through an interactive dashboard.

## Project Objectives

- Track and categorize daily expenses
- Set and monitor monthly budgets
- Visualize spending patterns
- Provide useful financial insights
- Help users develop better budgeting habits

## Technology Stack

### Frontend
- React
- JavaScript
- HTML / JSX
- CSS
- Vite
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)
- bcryptjs

### Version Control
- Git
- GitHub

## Project Structure

```text
expensemate/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md