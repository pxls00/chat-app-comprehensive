## **Chat Application - Quick Start Guide##**

**Prerequisites:**

Before starting, please ensure you have **Docker** installed on your system.

**Setup Instructions:**

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

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6399759d-7c58-4872-8d09-a81dff32eb3b/3e068e0c-d095-4a42-9b6f-ae65ba007ba0/image.png)

1. Sign In or Create Account:
    - If you have an existing account, sign in using your credentials.
    - If you're new, click the "Sign Up" button to create an account.
2. Access Chat Page:
After successful login, you'll be redirected to the chat page.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6399759d-7c58-4872-8d09-a81dff32eb3b/da9c445d-35e9-4334-92e5-328341c577ca/image.png)

1. Adding Friends:
    - Click the "Add Friend" button.
    - Enter your friend's email address.
    - Click to initiate a chat with your friend.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6399759d-7c58-4872-8d09-a81dff32eb3b/9cd4097c-457e-42d1-85df-e8b333086d30/image.png)

1. Chat Interface:
    - You can see the online status of friends next to their names.
    - Green circle indicates online status, red indicates offline.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6399759d-7c58-4872-8d09-a81dff32eb3b/46d0b165-0c1f-4ef9-a22e-ce98fd36527d/image.png)

1. Start Chatting:
    - Click on a friend's profile to begin chatting.
    - Engage in real-time conversations with your contacts.