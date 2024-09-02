## **Chat Application - Quick Start Guide##**

**Prerequisites:**

Before starting, please ensure you have **Docker** installed on your system.

**Setup Instructions:**

App requires: 
**localhost:8080**
**localhost:3000**
**localhost:5432**
**localhost:6379** 

1. Ensure Docker is running on your system.
2. Open a terminal and navigate to the ``root/app-deploy`` directory.
3. Run the following command to build the Docker images:

```bash
./up.sh
```

This script uses the `docker-compose.yaml` configuration file to build and run all necessary containers.

### Accessing the Application

After successful setup, open a web browser and navigate to:

---

[http://localhost:8080](http://localhost:8080/)

The application will redirect you to the login page at:

---

http://localhost:8080/signin

### **Using the Chat Application**


1. Sign In or Create Account:
    - If you have an existing account, sign in using your credentials.
    - If you're new, click the "Sign Up" button to create an account.
2. Access Chat Page:
After successful login, you'll be redirected to the chat page.

1. Adding Friends:
    - Click the "Add Friend" button.
    - Enter your friend's email address.
    - Click to initiate a chat with your friend.


1. Chat Interface:
    - You can see the online status of friends next to their names.
    - Green circle indicates online status, red indicates offline.


1. Start Chatting:
    - Click on a friend's profile to begin chatting.
    - Engage in real-time conversations with your contacts.