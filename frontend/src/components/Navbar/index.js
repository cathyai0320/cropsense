import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from "../Auth/AuthContext";

const NavigationBar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">CropSense</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" activestyle={{ color: 'green' }}>Home</Nav.Link>
                        {isAuthenticated() && (
                            <>
                                <Nav.Link as={NavLink} to="/croprecommender" activestyle={{ color: 'green' }}>Predict</Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" activestyle={{ color: 'green' }}>Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/chatbot" activestyle={{ color: 'green' }}>Chatbot</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {isAuthenticated() ? (
                        <Nav>
                            <Nav.Link as={NavLink} to="/sign-out" onClick={logout}>Sign Out</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link as={NavLink} to="/sign-up">Sign Up</Nav.Link>
                            <Nav.Link as={NavLink} to="/sign-in">Sign In</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
