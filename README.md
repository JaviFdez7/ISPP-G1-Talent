# ISPP-G1-Talent
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ddabd7eea7814741858d005f2ffe988a)](https://app.codacy.com/gh/JaviFdez7/ISPP-G1-Talent/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) [![Bluejay Dashboard](https://img.shields.io/badge/Bluejay-Dashboard_01-blue.svg)](http://dashboard.bluejay.governify.io/dashboard/script/dashboardLoader.js?dashboardURL=https://reporter.bluejay.governify.io/api/v4/dashboards/tpa-ISPP-2024-GH-JaviFdez7_ISPP-G1-Talent/main)
## Index
1. [Quick start](https://github.com/JaviFdez7/ISPP-G1-Talent?tab=readme-ov-file#quick-start)
2. [MongoDB installation](https://github.com/JaviFdez7/ISPP-G1-Talent?tab=readme-ov-file#mongodb-installation)
## Quick start
Before you can start, make sure you have **MongoDB installed** and have started the port as specified in the [MongoDB installation section](https://github.com/JaviFdez7/ISPP-G1-Talent?tab=readme-ov-file#mongodb-installation).

1. Start the database port

- Open a terminal in the directory: C:\Program Files\MongoDB\Server\4.4\bin
  - You can do this by navigating to the directory and typing "cmd" in the address bar, then pressing enter   
- To execute the command to expose the MongoDB port, you can use the following command in the terminal:
  ```bash
  mongod
  ```
  Make sure to keep the terminal open at all times while using the system, as it needs to be running to keep the MongoDB port exposed.
- To view the database, follow these steps:
  - Open MongoDB Compass.
  - Enter the URI `mongodb://localhost:27017`.
  - Click on the "Connect" button.

2. Download and install Node.js: visit the official Node.js website at https://nodejs.org (**NODE VERSION MUST BE** `20.11.1`)
3. Clone this repository
```bash
git clone https://github.com/JaviFdez7/ISPP-G1-Talent.git
```

4. Install the dependencies (from the root directory)
```bash
npm install
```

5. Create .env file from .env.example file
```
GH_TOKEN=<YOUR-GH-TOKEN>
```

6. Run the server
Terminal 1 (frontend)
```bash
npm run install-frontend
npm run start-frontend
```
Terminal 2 (backend)
```bash
npm run install-backend
npm run start-backend
```
## Creating backend modules
To create a module open a terminal it the root of the repoitory.
Then use `create-backend-module MODULE_NAME VERSION`
|||
|-|-|
|**warning**|MODULE_NAME must be written in snake-case|
|**info**|VERSION is an optional argument (default is v1)|

For example:
```bash
create-backend-module team-creator
```
```bash
create-backend-module team-creator v2
```
## MongoDB installation
1. Navigate to the C drive directory on your computer and create a folder named 'data'.

![image](https://github.com/JaviFdez7/ISPP-G1-Talent/assets/100673872/54f42cc2-74db-47d5-8355-0af5b00a4c5f)

2. Access the 'data' folder and create a subfolder named 'db'.

![image](https://github.com/JaviFdez7/ISPP-G1-Talent/assets/100673872/693b9f92-1f86-46d3-99ae-c8bdf13556cc)

3. Download MongoDB Compass on your computer from the following link: [download link](https://www.mongodb.com/try/download/community)
   
4. During the MongoDB installation, uncheck the option to install MongoDB as a service.

![image](https://github.com/JaviFdez7/ISPP-G1-Talent/assets/100673872/9f505d81-48c9-4b3a-b9db-bb9a8022338e)









