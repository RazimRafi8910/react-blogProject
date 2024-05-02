import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useTheme from "../../context/themeContext";
import UserAcount from "../UserAcount";
import NavbarBoot from "react-bootstrap/Navbar";
import "./navbar.css";

function Navbar() {
    const { theme, changeTheme } = useTheme();
    const [isUser, setIsUser] = useState(null);

    useEffect(() => {
        let listent = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(user);
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
        <NavbarBoot collapseOnSelect expand="lg" className=" p-0" data-bs-theme={theme}>
            <Container>
                <NavbarBoot.Brand href="#home" className="navTittle">
                    <h1>BlogProject</h1>
                </NavbarBoot.Brand>
                <NavbarBoot.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBoot.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={"/"} className="mb-0 mx-2 linkText">Blog</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={"/post"} className="mb-0 mx-2 linkText">Post</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav >
                        {theme == "light" && (
                            <button
                                className="btn border border-dark mb-1 w-50 ms-3"
                                type="button"
                                onClick={() => {
                                    changeTheme();
                                }}
                            >
                                <i class="toggle fa-solid fa-moon"></i>
                            </button>
                        )}
                        {theme == "dark" && (
                            <button
                                className="btn btn-outline-dark ms-3 mb-1 w-50"
                                type="button"
                                onClick={() => {
                                    changeTheme();
                                }}
                            >
                                <i class="fa-regular fa-sun"></i>
                            </button>
                        )}
                        {isUser ? (<UserAcount user={isUser} />) : (<Link to={"/login"} data-bs-theme={theme} className="btn btn-dark mb-1 ms-3 w-50">Login</Link>)}
                    </Nav>
                </NavbarBoot.Collapse>
            </Container>
            </NavbarBoot>
            <hr className="mt-0"/>
        </>
        // <Container>
        //     <nav className="p-0 navbar pt-2">
        //         <div className="d-flex align-items-center navTittle">
        //             <h1>BlogProject</h1>
        //         <div className="d-flex align-items-center ms-5">
        //             <Link to={'/'} className="mb-0 mx-2 linkText">Blog</Link>
        //                 <Link to={'/post'} className="mb-0 mx-2 linkText">Post</Link>
        //         </div>
        //         </div>
        //         <div className="d-flex align-items-center">
        //             { theme=="light" && <button className="btn border border-dark mx-3" type="button" onClick={()=>{changeTheme()}}><i class="toggle fa-solid fa-moon"></i></button> }
        //             {theme == "dark" && <button className="btn btn-outline-dark mx-3" type="button" onClick={() => { changeTheme() }}><i class="fa-regular fa-sun"></i></button>}
        //             {isUser ? <UserAcount user={isUser} /> : <Link to={'/login'} data-bs-theme={theme} className="btn btn-primary">Login</Link>}
        //         </div>
        //     </nav>
        // </Container>
    );
}

export default Navbar;
