import Travelex_logo from "./Travelex_logo.png"
import back from "./back.PNG"
import { Link } from 'react-router-dom';
import "./Header.css"

 function Header() {
    return (
      <div className="logo">
        <nav class="navbar navbar-inverse">
          <Link className="navbar-brand nav-link" to="/">
          <img src={Travelex_logo} width="200" height="50" className="d-inline-block logo-pad align-top" alt="Welcome TO Travelex !" />
          </Link>
          <Link className="navbar-brand nav-link" to="/">
            <div class = "Name">
          <a href=" www.google.com"  className=" d-inline-block  align-right" >Neeta.Mukane</a>
          <img src={back} class="b" width="25" height="15" className="d-inline logo-pad align-top" alt="Back" />
          </div>
          </Link>
        </nav>
           
            
      </div>
    );
  }

  export default Header;