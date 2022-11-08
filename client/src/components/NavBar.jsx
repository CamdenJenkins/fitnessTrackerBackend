import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/users";

import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function NavBar({ username, setToken }) {
  const navigate = useNavigate();
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <h3>Welcome, {username}</h3>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/routines">Routines</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/activities">Activities</Nav.Link>
      </Nav.Item>

      {username === "Guest" ? (
        <>
          {" "}
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login"> Login</Nav.Link>
          </Nav.Item>
        </>
      ) : null}

      {username !== "Guest" ? (
        <>
          {/* <Nav.Item>
            <Nav.Link href="/posts/create_new_post">Create a Post</Nav.Link>
          </Nav.Item> */}
          <Button
            variant="primary"
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            Log Out
          </Button>{" "}
        </>
      ) : null}
    </Nav>
  );
}
