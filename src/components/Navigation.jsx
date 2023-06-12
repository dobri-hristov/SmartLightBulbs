import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { logoutUser } from "../firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";
import { getUsername } from "../utils/user";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isAuth, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { loading } = useLoading();

  const handleLogout = () => {
    navigate("/");
    logoutUser();
  };

  return (
    <Navbar
      collapseOnSelect
      className={`p-1 ${isHomePage && "position-absolute w-100 m-0"}`}
      expand="lg"
      bg={isHomePage ? "transpaernt" : "dark"}
      variant="dark"
    >
      <Container className="align-items-baseline">
        <Navbar.Brand as={Link} to="/">
          Smart Light Bulbs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/devices">
              Devices
            </Nav.Link>
          </Nav>
          {!loading && (
            <Nav className="align-items-baseline">
              {!isAuth ? (
                <Nav.Link as={Link} to="/login" className="text-primary">
                  Login <HiOutlineLogin />
                </Nav.Link>
              ) : (
                <>
                  <span className="text-light mr-2">
                    @{user.username || getUsername()}
                  </span>
                  <Nav.Link
                    className="text-danger"
                    onClick={() => handleLogout()}
                  >
                    Logout <HiOutlineLogout />
                  </Nav.Link>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
