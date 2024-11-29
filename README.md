Cardio Blog

Cardio Blog is a web application designed for cardiologists to share articles and insights about heart health. It features user authentication for personalized article submissions, a bright red theme for visual appeal, and an interactive frontend for browsing and submitting articles.

Features
• User Authentication: Users can sign up, log in, and securely submit articles.
• Article Management: Fetch and display cardiology-related articles with details like title, author, content, and reference links.
• Interactive UI: Intuitive forms and layouts make it easy to browse and contribute.
• Bright Red Theme: Aesthetic design to ensure high readability and appeal.

Project Structure

cardio-blog/
├── backend/
│   ├── app.js           # Node.js backend with Express API
│   ├── users.json       # JSON file to store user data
│   ├── articles.json    # JSON file to store articles
│   ├── package.json     # Backend dependencies
│   └── package-lock.json
├── frontend/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # CSS for styling the app
│   ├── app.js           # Frontend JavaScript for interactivity
└── README.md            # Documentation and instructions

Setup Instructions

1. Prerequisites
• Node.js (version 14 or higher)
• A code editor like VS Code
• A browser (e.g., Chrome, Firefox)

2. Clone the Repository
B
git clone <repository-url>
cd cardio-blog
3. Install Dependencies
Navigate to the backend directory and install dependencies:
cd backend
npm install

4. Start the Application
Run the backend server:
node app.js
• Open your browser and visit: http://localhost:3000

5. File Configuration
B
Frontend (HTML, CSS, JS)
• frontend/index.html: The main page contains login, signup, article display, and submission forms.
• frontend/styles.css: Styling for the entire application, with a bright red theme.
• frontend/app.js: Handles API interactions for login, signup, article fetching, and submissions.

Backend (Node.js API)
• backend/app.js: Implements API endpoints for:
• Signup: POST /api/auth/signup
• Login: POST /api/auth/login
• Get Articles: GET /api/articles
• Submit Article: POST /api/articles (requires authentication)
• Data Files:
• users.json: Stores user credentials (hashed passwords).
• articles.json: Stores article data.

API Documentation
1. Authentication
• Signup: POST /api/auth/signup
• Body: { "username": "string", "password": "string" }
• Login: POST /api/auth/login
• Body: { "username": "string", "password": "string" }
• Response: { "token": "JWT" }

2. Articles
• Get All Articles: GET /api/articles
• Response: [{ "id": 1, "title": "string", "author": "string", "content": "string", "reference": "URL" }]
• Submit Article: POST /api/articles (requires authentication)
• Headers: { "Authorization": "Bearer <JWT>" }
• Body: { "title": "string", "content": "string", "reference": "URL" }

Usage
Signup
1. Fill out the signup form with a username and password.

2. Submit to create a new account.

Login
1. Use the login form to authenticate.

2. Upon success, your session will be stored, and you can submit articles.

View Articles
• Articles are displayed on the homepage under the “Articles” section.

Submit Articles
1. Log in to your account.

2. Use the “Submit a New Article” form to add a title, content, and reference URL.

3. The article will appear in the articles list.

Next Steps
• Add a database to replace JSON files.
• Implement containerization with Docker for easier deployment.
• Deploy the app using platforms like Heroku or Render.
