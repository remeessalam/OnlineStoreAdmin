import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/Header";
import "./Layout.css";
const AppLayout = ({ Outlet }) => {
  return (
    <>
      <div className="appLayout-header">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
