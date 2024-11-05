# README File

**Name**: BRIGHT MONEY APP by Tammy

### This application runs on the following versions:

- **node**: 20.8.0
- **npm**: 10.1.0
- **yarn**: 1.22.22
- **NextJS**: 15.0.2

## Table of Contents

- [Introductory Notes](#introductory-notes)
- [Prerequisites](#prerequisites)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Install Dependencies](#step-2-install-dependencies)
- [Step 3: Set up Configurations](#step-3-set-up-configurations)
- [Step 4: Run the Application](#step-4-run-the-application)
- [Step 5: Deployment Instructions](#step-5-deployment-instructions)
- [Step 6: Additional Notes](#step-6-additional-notes)

## Introductory Notes

This README provides a comprehensive guide to setting up and running the BRIGHT MONEY APP frontend application, including installation instructions and configurations.

## Prerequisites

Ensure you have the following tools installed:

1. **Node.js**: Requires Node.js v16.8 or newer. Download from [nodejs.org](https://nodejs.org/).
2. **Package Manager**: Either NPM (comes with Node.js) or Yarn. Check steps if not yet completed.
3. **Visual Studio Code (VSCode)**: Download from [code.visualstudio.com](https://code.visualstudio.com/) if you haven’t already.

## Step 1: Clone the Repository

Open VS Code, then open the Terminal (View > Terminal) and clone the repository to your local machine:

```bash
git clone https://github.com/tammytamayao/expense-app-frontend.git
cd expense-app-frontend
```

## Step 2: Install Dependencies

NPM (Node Package Manager) is automatically installed when you install Node.js. So, to install NPM locally, all you need to do is install Node.js on your computer.

1. Download and Install Node.js
   Go to the [Node.js website](https://nodejs.org/en). Run the installer, follow the installation steps and check if properly installed

```bash
npm --version
node --version
```

2. Alternatively, install Yarn globally if you prefer it.

```bash
npm install -g yarn
yarn --version # check if properly installed
```

## Step 3: Set-up Configurations

Navigate to project directory and run:

```bash
npm install
yarn install
```

Verify NextJS version

```bash
npm list next #if using npm
yarn list next #if using yarn
```

## Step 4: Run the Application

Run the application in port 3001 since the backend already used port 3000.

```bash
PORT=3001 npm run dev
```

Open your browser and go to http://127.0.0.1:3001 or http://localhost:3001 to access the app.

## Step 5: Deployment Instructions

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the website for [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Step 6: Additional Notes

- Confirm that the application is running on http://127.0.0.1:3001 or http://localhost:3001
- If you encounter issues, refer to the logs or check for any missing dependencies.
- Feel free to reach out for support at **tammytamayao@gmail.com**

You can also check the package.json file for any other available scripts that may be useful (like build scripts, test scripts, etc.). Here are some useful scripts you may also need:

- **npm run build** or **yarn build**: Builds the application for production in the .next folder.
- **npm run start** or **yarn start**: Starts the application in production mode. Ensure to build first.
- **npm run lint** or **yarn lint**: Lints the code with ESLint (if configured).

Thank you.
