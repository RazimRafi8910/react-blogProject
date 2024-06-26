import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import UserAcount from "./UserAcount";
import NavbarBoot from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../slice/userSlice";
import { changeTheme } from "../../slice/themeSlice";
import "./navbar.css";

function Navbar() {
    const theme = useSelector(state => state.themeReducer.theme);
    const [isUser, setIsUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let listent = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(user);
                dispatch(setUserData({ displayName: user.displayName, email: user.email, photoURL: user.photoURL, uid:user.uid }));
            } else {
                setIsUser(null);
            }
        });
        return () => {
            listent();
        };
    }, []);

    return (
        <>
        <NavbarBoot collapseOnSelect fixed="top" expand="lg" className={`p-0 border ${theme=='dark'?'bg-black':'bg-white'}`} data-bs-theme={theme}>
            <Container>
                <NavbarBoot.Brand href="#home" className="navTittle">
                    <h2>BlogProject</h2>
                </NavbarBoot.Brand>
                <NavbarBoot.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBoot.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                        </Nav.Link>
                            <Link to={"/"} className="mb-0 mx-2 linkText">Blog</Link>
                            <Link to={"/post/new"} className="mb-0 mx-2 linkText">New Post</Link>
                    </Nav>
                    <Nav >
                        {theme == "light" && (
                            <button
                                className="btn border border-dark mb-1 w-50 me-3"
                                type="button"
                                onClick={() => {
                                    dispatch(changeTheme());
                                }}
                            >
                                <i className="toggle fa-solid fa-moon"></i>
                            </button>
                        )}
                        {theme == "dark" && (
                            <button
                                className="btn btn-outline-dark me-3 mb-1 w-50"
                                type="button"
                                onClick={() => {
                                    dispatch(changeTheme());
                                }}
                            >
                                <i className="fa-regular fa-sun"></i>
                            </button>
                        )}
                        {isUser ? (<UserAcount user={isUser} />) : (<Link to={"/login"} data-bs-theme={theme} className="btn btn-dark mb-1 px-3 ms-3 w-50">Login</Link>)}
                    </Nav>
                </NavbarBoot.Collapse>
            </Container>
            </NavbarBoot>
            <hr className="mt-0"/>
        </>
    );
}
//
export default Navbar;