import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import useTheme from "../context/themeContext";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function UserAcount({user}) {
  const { theme } = useTheme();
  console.log(user.displayName)
  
  const handleSignOut = async() => {
     try {
       await signOut(auth);
       console.log('user signout');
     } catch (error) {
       console.log(error);
     }
  }

  return (
    <div>
      <Dropdown data-bs-theme={theme}>
      <Dropdown.Toggle variant={`${theme}`} className={`border border-${theme === 'light'&& "dark"}`} data-bs-theme='dark'  id="dropdown-basic">
        {user.displayName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" className="text-danger fw-bold" onClick={handleSignOut}>LogOut </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}

export default UserAcount;
