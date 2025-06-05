import { IoPerson } from "react-icons/io5";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import { Link, Navigate, useNavigate }   from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/auth-context";
import { IoLogOutSharp } from "react-icons/io5";
import "./header.css"


const Header = ()  => {
  const navigate = useNavigate();
  const bag = useSelector((store) => store.bag);
   const handleLogOut =  () => {
    navigate('/logout');
  };
  const {user} = useAuth()
  // useEffect(()=>{
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/get_user",
  //         {
  //           withCredentials:true,
  //         }
  //       );
  //       if (response.data.username){
  //         setUser({
  //           username : response.data.username
  //         });
  //       }
  //     } catch (error) {
  //       console.log("header get user error"+error)
  //     }
  //     finally{
  //       setLoading(false);
  //     }
      
  //   }
  //   fetchUser();
  // },[])
  // console.log(user)
  const actionBarStyles = {
  actionContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "inherit",
    outline: "none", // Removes the blue outline
  },
  actionContainerFocus: {
    outline: "none", // Ensures no blue border on focus
  },
};

  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="myntra_home"
              src="../images/nepalswear.jpg"
              alt="Myntra Home"
            />
          </Link>
        </div>
        <nav className="nav_bar">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">
            Studio <sup>New</sup>
          </a>
        </nav>
        <div className="search_bar">
          {/* <span className="material-symbols-outlined search_icon">search</span> */}
          <input
            className="search_input"
            placeholder="Search products, brands and more"
          />
        </div>
        <div className="action_bar">
          {user? <Link className="action_container" to="/profile" style={{
            ...actionBarStyles.actionContainer,
            outline: "none",
          }} >
            <IoPerson />
            <span className="action_name">{user? user.username : "Profile"}</span>
          </Link>: <Link className="action_container" to="/login" style={{
            ...actionBarStyles.actionContainer,
            outline: "none",
          }} >
            <RiLoginBoxFill /><span className="action_name">Login</span>
          </Link>}
          

          <div className="action_container">
            <FaFaceGrinHearts />
            <span className="action_name">Wishlist</span>
          </div>
          <div className="action_container" onClick={handleLogOut}>
            <IoLogOutSharp />
            <span className="action_name">Logout</span>
          </div>

          <Link
            className="action_container"
            to="/bag"
            style={{ textDecoration: "none", color: "inherit" }}>
            <BsBagCheckFill />
            <span className="action_name">Bag</span>
            <span className="bag-item-count">{bag.length}</span>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
