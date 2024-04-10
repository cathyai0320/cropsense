import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
                                <Nav.Link as={NavLink} to="/predict" activestyle={{ color: 'green' }}>Predict</Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" activestyle={{ color: 'green' }}>Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/chatbot" activestyle={{ color: 'green' }}>Chatbot</Nav.Link>
                                
                                {/* Dropdown for Researchers */}
                                <NavDropdown title="For Researchers" id="researchers-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/advanced-analytics">
                                        Advanced Analytics
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/data-export">
                                        Data Export
                                    </NavDropdown.Item>
                                </NavDropdown>
                                
                                {/* Dropdown for Stakeholders */}
                                <NavDropdown title="For Stakeholders" id="stakeholders-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/market-trends">
                                        Market Trends
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/crop-viability">
                                        Crop Viability
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/regional-opportunities">
                                        Regional Opportunities
                                    </NavDropdown.Item>
                                </NavDropdown>
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
