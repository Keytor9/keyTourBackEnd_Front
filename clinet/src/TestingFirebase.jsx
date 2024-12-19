// src/App.js
import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function TestingFirebase() {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
    
        result.user.getIdToken().then((idToken) => {
          console.log("Firebase ID Token:", idToken);
     
          fetch("http://185.170.198.81/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "device":'web'
            },
            body: JSON.stringify({ idToken }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Token verified successfully!");
              } else {
                alert("Token verification failed.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  return (
    <div className="App">
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default TestingFirebase;
