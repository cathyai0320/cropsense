import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import { useAuth } from "../Auth/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/about" activestyle={{ color: 'green' }}>
                        About
                    </NavLink>
                    {isAuthenticated() ? (
                        <>
                            <NavLink to="/profile" activestyle={{ color: 'green' }}> Profile </NavLink>
                            <NavLink to="/croprecommender" activestyle={{ color: 'green' }}> Crop Recommender </NavLink>
                            <NavLink to="/chatbot" activestyle={{ color: 'green' }}> Chatbot </NavLink>
                        </>
                    ) : null}

                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                {isAuthenticated() ? (
                    <NavBtn>
                        <NavBtnLink to="/sign-out" onClick={logout}> Sign Out </NavBtnLink>
                    </NavBtn>
                ) : (
                    <NavBtn>
                        <>
                            <NavBtnLink to="/sign-up"> Sign Up </NavBtnLink>
                            <NavBtnLink to="/sign-in"> Sign In </NavBtnLink>
                        </>
                    </NavBtn>
                )}

            </Nav>
        </>
    );
};

export default Navbar;