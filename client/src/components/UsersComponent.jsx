import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registerUser, loginUser } from "../api/users";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function UsersComponent() {
  const { method } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          } else {
            result = await loginUser(username, password);
          }
          if (result.success) {
            setPassword("");
            setUsername("");
            navigate("/routines");
          } else {
            setError(result.error);
          }
        }}
      >
        {error && <h5>{error}</h5>}
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button variant="primary" type="submit">
          {method === "register" ? "Register" : "Login"}
        </Button>
      </Form>
    </div>
  );
}
