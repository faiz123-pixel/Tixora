import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <div className="app-background cinematic-bg">
      <LoginProvider>
        <RouterProvider router={AppRoutes} />
      </LoginProvider>
    </div>
  );
}

export default App;
