"use client";

import React, { useState } from "react";
import ApiController from "./api";

const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ApiController.verifyAdminUser(password).then((response) => {
      if (response.admit) {
        window.location.reload();
      } else {
        setPasswordIncorrect(true);
        setLoading(false);
      }
    });
    // Send the password to the API route
    // const request = await fetch(`/api`, {
    //   body: JSON.stringify({ password }),
    //   headers: { "Content-Type": "application/json" },
    //   method: "post",
    // });

    // Redirect to another page after successful submission
    // if (request.status !== 200)
    //   return setPasswordIncorrect(true), setLoading(false);
    // else window.location.reload();
  };

  return (
    <div>
      <h1>1999 style password page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordPage;
