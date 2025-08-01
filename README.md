# Messaging App 2025

A simple real-time messaging app built with React, Vite, and Socket.IO.

## Features

-   **Real-time chat:** Send and receive messages instantly with Socket.IO.
-   **Conversations:** Create group or one-on-one conversations with selected contacts.
-   **Contacts:** Add and manage your contacts by ID and name.
-   **Persistent storage:** Conversations and contacts are saved in your browser's local storage.
-   **Responsive UI:** Built with React Bootstrap for a clean, responsive interface.

## How It Works

1. **Login:**  
   Enter your unique user ID or generate a new one to start using the app.

2. **Contacts:**  
   Add new contacts by entering their ID and name. Contacts are used to label users in conversations.

3. **Conversations:**  
   Start a new conversation by selecting one or more contacts. Each conversation is private to the selected group.

4. **Messaging:**  
   Send messages in real time. Messages display the sender's name (if in your contacts) or their ID.

5. **Persistence:**  
   All your contacts and conversations are stored locally in your browser, so you won't lose them on refresh.

## Project Structure

-   `src/components/` — UI components (Dashboard, Sidebar, Conversations, Contacts, etc.)
-   `src/contexts/` — React context providers and hooks for contacts, conversations, and sockets.
-   `src/hooks/` — Custom React hooks (e.g., `useLocalStorage`).
-   `src/main.jsx` — App entry point.

## Running the App

### 1. Install dependencies for both client and server

# In the client directory

npm install
npm run dev

# In the server directory

npm install
npm devStart

## Usage

-   Add contacts using their unique ID and a display name.
-   Create conversations with one or more contacts.
-   Send and receive messages in real time.
-   All data is stored locally for your session.

---

**Note:**  
This app is for demonstration and learning purposes. For production use, add authentication, secure your server, and use a database for persistent storage.
