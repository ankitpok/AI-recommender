import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import FetchItems from "../components/FetchItems";
import FetchUserInfo from "../components/FetchUserInfo";
import { AuthProvider } from "../context/auth-context";
import LogOut from "../components/LogoutPage";
import FetchFlipkartProducts from "../components/FetchFlipkartProducts";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <>
    <AuthProvider>
      <Header />
      <FetchItems />
      <FetchFlipkartProducts/>
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </AuthProvider>
    </>
  );
}

export default App;
