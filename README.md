# ISPP-G1-Talent
## Quick start
Before you can start, make sure you have **MongoDB installed** and have started the port as specified in the MongoDB installation section.

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
    
2. Clone this repository
```bash
git clone https://github.com/JaviFdez7/ISPP-G1-Talent.git
```

3. Install the dependencies (from the root directory)
```bash
npm install
```

4. Create .env file from .env.example file
```
GH_TOKEN=<YOUR-GH-TOKEN>
```

5. Run the server
```bash
npm start
```

## MongoDB installation
1. Navigate to the C drive directory on your computer and create a folder named 'data'.

![image](https://github.com/JaviFdez7/ISPP-G1-Talent/assets/100673872/54f42cc2-74db-47d5-8355-0af5b00a4c5f)

2. Access the 'data' folder and create a subfolder named 'db'.

![image](https://github.com/JaviFdez7/ISPP-G1-Talent/assets/100673872/693b9f92-1f86-46d3-99ae-c8bdf13556cc)

3. Download and install MongoDB Compass on your computer from the following link: [download link](https://www.mongodb.com/try/download/community)



