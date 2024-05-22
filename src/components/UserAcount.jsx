import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUserData } from "../slice/userSlice";

function UserAcount({user}) {
  const theme = useSelector(state => state.themeReducer.theme)
  const dispatch = useDispatch();

  const handleSignOut = async() => {
     try {
       await signOut(auth);
       dispatch(removeUserData());
       console.log('user signout');
     } catch (error) {
       console.log(error);
     }
  }

  return (
    <div>
      <Dropdown data-bs-theme={theme}>
      <Dropdown.Toggle variant={`${theme}`} className={`py-1 border border-${theme === 'light'&& "dark"}`} data-bs-theme='dark'  id="dropdown-basic">
          <img src={user?.photoURL || ""} className="border rounded-circle me-1" width={"30px"} height={"30px"} />
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
