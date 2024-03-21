import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header_mainContainer">
      <div>
        <h3>the Online Store</h3>
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/product"}>Product</Link>
          </li>

          <li>
            <Link to={"/category"}>Category</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
