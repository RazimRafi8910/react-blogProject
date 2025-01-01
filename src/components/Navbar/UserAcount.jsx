import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import { removeUserData } from "../../slice/userSlice";
import { Link } from "react-router-dom";

function UserAcount({ user }) {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();
  const [onlineStatus, setOnlineStatus] = React.useState(null);
  useEffect(() => {
    setOnlineStatus(navigator.onLine === true);
  }, [navigator.onLine]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUserData());
      console.log("user signout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dropdown data-bs-theme={theme}>
        <span
          className={`position-absolute ms-2 top-50 start-25 translate-middle p-1 ${onlineStatus
              ? "bg-success border-success"
              : "bg-danger border-danger"
            } border rounded-circle`}
        >
          <span className="visually-hidden">New alerts</span>
        </span>
        <Dropdown.Toggle
          variant={`${theme}`}
          className={`py-1 border border-${theme === "light" && "dark"}`}
          data-bs-theme="dark"
          id="dropdown-basic"
        >
          {user && 
            <img
            src={
              user?.photoURL ||
              "https://media.istockphoto.com/id/1316947194/vector/messenger-profile-icon-on-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1iQ926GXQTJkopoZAdYXgU17NCDJIRUzx6bhzgLm9ps="
            }
            className="border rounded-circle ms-1 me-1"
            width={"30px"}
            height={"30px"}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-title="Tooltip on left"
          />
           }
          {user.displayName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.ItemText className="fw-bold">
            <Link
              to={`/post/user/${user.uid}`}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {" "}
              My Posts
            </Link>
          </Dropdown.ItemText>
          <Dropdown.Item
            className="text-danger fw-bold"
            onClick={handleSignOut}
          >
            LogOut{" "}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserAcount;
