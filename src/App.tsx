import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUsername(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Hello ${username}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          type="text"
          placeholder="Username"
          onChange={onChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
