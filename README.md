## **1. Overview**

Automated testing for a Todo application with:

- **React Frontend** (UI)
- **Node.js Backend** (API)

## **2. Test Coverage**

### **UI Tests (Playwright)**

**Scenario**

**Coverage**

User Login (Valid/invalid credentials)

Todo CRUD Operations (Create, Read, Update, Delete)

Data Persistence (After page refresh)

UI Validation (Form inputs, error messages)

### **API Tests (Postman/Newman)**

**Endpoint**

**Tests**

`POST /login` Authentication success/failure

`GET /todos` Data retrieval verification

`POST /todos` Todo creation validation

`PUT /todos/:id` Update functionality

`DELETE /todos/:id` Deletion verification

---

## **3. Tools**

**Why Chosen**

**Playwright**

- UI Automation
- Fast, reliable, cross-browser

**Postman/Newman**

- API Testing
- Easy collaboration, CI/CD ready

**GitHub Actions**

- CI/CD Pipeline
- Native GitHub integration

---

## **4. How to Run Tests**

### Install Node.js

    node --version
    npm --version

### Cloning Repo

    git clone https://github.com/remwaste/qa-automation-suite.git
    cd qa-automation-suite

### Running Frontend

    cd frontend
    npm install
    npm run start

### Running Backend

    cd backend
    npm install
    npm start

### **UI Tests**

    cd frontend
    npx playwright test  # Run all tests

### **API Tests**

    cd backend
    npm install -g newman
    newman run postman_api_testing/collection/Todo_APIs.json -e postman_api_testing/Environment/Todo_Env.json

---

## **5. Assumptions & Limitations**

### **Assumptions**

- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:3000`
- Test users exist (username: `admin`, password: `password`)
