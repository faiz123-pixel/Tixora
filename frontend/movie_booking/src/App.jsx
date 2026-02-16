import {RouterProvider} from "react-router-dom";
import './App.css'
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <div className="app-background cinematic-bg">
    <RouterProvider router={AppRoutes}/>
      
    </div>
  )
}

export default App
