# Acton & Chiswick Markets Calendar

A simple static web application that displays the **Acton & Chiswick Markets calendar**, showing market dates and linking to event pages. The project is written in **vanilla JavaScript** and uses **Jest** for testing.

---

# 🌐 Live Application

The application is deployed and publicly accessible at:

**https://sachinkainth.github.io/acton-chiswick-calendar/**

---

# 📦 Project Overview

The application:

* Generates a yearly calendar
* Displays market dates
* Links each market day to its event page
* Highlights the current day
* Uses modular JavaScript for DOM manipulation and calendar logic

---

# 🧪 Running Tests

Tests are written using **Jest**.

To run all tests:

```bash
npm test
```

---

# 📊 Running Tests with Coverage

To generate a coverage report:

```bash
npm run test:coverage
```

or

```bash
npm test -- --coverage
```

After running, Jest will output:

* Coverage summary in the terminal
* Detailed report in:

```
/coverage/lcov-report/index.html
```

Open this file in a browser to explore detailed line-by-line coverage.

---

# 💻 Running the Application Locally

Because this is a **static site**, the easiest way is to run a small local web server.

### Option 1 — Using Node http-server

Install globally (once):

```bash
npm install -g http-server
```

Then run:

```bash
http-server
```

Open your browser at:

```
http://localhost:8080
```

---

### Option 2 — Using Python

If Python is installed:

```bash
python3 -m http.server
```

Then visit:

```
http://localhost:8000
```

---

### Option 3 — VS Code Live Server

If using VS Code:

1. Install **Live Server**
2. Right click `index.html`
3. Click **Open with Live Server**

---

# ⚙️ Continuous Integration Pipeline

The repository includes a CI pipeline that automatically runs whenever code is pushed.

The pipeline performs the following steps:

### 1️⃣ Install dependencies

```bash
npm install
```

Ensures all required packages (including Jest) are installed.

---

### 2️⃣ Run tests

```bash
npm test
```

Runs the complete Jest test suite.

The pipeline will **fail if any test fails**.

---

### 3️⃣ Generate coverage report

```bash
npm test -- --coverage
```

Ensures coverage remains high and highlights untested code.

---

### 4️⃣ Build / Validate site

Since the application is static, there is no build step. The pipeline simply verifies:

* JavaScript imports resolve correctly
* No test failures exist
* The calendar generation code executes successfully

---

# 📂 Project Structure

```
.
├── js/
│   ├── calendar.js
│   ├── dom.js
│   ├── constants.js
│
├── tests/
│   ├── calendar.test.js
│   ├── dom.test.js
│   ├── calendar.integration.test.js
│
├── index.html
├── package.json
└── README.md
```

---

# 🧩 Test Types

### Unit Tests

Test individual modules:

* `calendar.js`
* `dom.js`

Focus on logic and DOM behaviour.

---

### Integration Tests

`calendar.integration.test.js`

These tests:

* Build the full calendar
* Extract generated links
* Verify event URLs respond successfully

This ensures the **generated calendar links are valid**.

---

# 🚀 Development Workflow

Typical development flow:

1️⃣ Make code changes
2️⃣ Run tests

```bash
npm test
```

3️⃣ Check coverage

```bash
npm test -- --coverage
```

4️⃣ Commit and push changes

The CI pipeline will automatically validate everything.

---

# 📜 License

This project is provided as-is for the Acton & Chiswick markets calendar.
