# 💬 Chat app with Firebase Backend

An aesthetic and modern **chat interface** built using **HTML, CSS, and Firebase Firestore**.
This project demonstrates how to create a real-time chat application with a beautiful UI and a simple Firebase backend.

---

## 🚀 Features

* 📱 Responsive chat interface
* 🎨 Gradient themes (Pastel or Dark mode)
* 🔥 Real-time messaging powered by Firebase Firestore
* 📝 Message input with send button
* ⚡ Auto-updating messages with `onSnapshot`
* 🖥️ chat edit and delete option

---

## 📂 Project Structure

```
chat-app-firebase/
│── index.html     
│── config.js      
│── functions.js
|── delete.js      
│── README.md      
```

---

## 🛠️ Setup & Usage

### 1. Clone Repository

```bash
git clone https://github.com/riddhi-z1465/chat-app-firebase.git
cd chat-app-firebase
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Cloud Firestore**
4. Copy your Firebase config and paste it into `script.js`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run Project

Open `index.html` in your browser.

---

## 🌐 Live Demo

Enable **GitHub Pages** in repo settings to deploy your chat app online:
👉 [https://your-username.github.io/chat-ui-firebase](https://your-username.github.io/chat-ui-firebase)

---

## 📸 Preview

*(Add screenshots or GIFs of your chat UI here)*

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is open source under the **MIT License**.
