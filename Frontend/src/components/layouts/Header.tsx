import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

const Header = () => {
  const { userData, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {userData ? (
          <>
            {userData.role === "admin" && (
              <li>
                <Link to={"/admin"}>Admin</Link>
              </li>
            )}
            <li>Welcome, {userData?.email?.split("@")[0]}</li>
            <li>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
