import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";

function AdminLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isMobile={isMobile}
          closeSidebar={() => setShowSidebar(false)}
        />
      )}

      {/* Right Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar
          isMobile={isMobile}
          toggleSidebar={() => setShowSidebar((prev) => !prev)}
        />
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          <Outlet />
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default AdminLayout;
