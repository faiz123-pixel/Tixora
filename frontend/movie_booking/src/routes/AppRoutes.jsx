import {BrowserRouter,createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "../components/common/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetails from "../pages/MovieDetails";
import TheatreSelection from "../pages/TheatreSelection";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import BookingSuccess from "../pages/BookingSuccess";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Theatres from "../pages/Theatres";
/* Admin Layout & Pages */

import Dashboard from "../admin/pages/Dashboard";
import Movies from "../admin/pages/Movies";
// import EditMovie from "../admin/pages/EditMovie";
// import AddTheatre from "../admin/pages/AddTheatre";
import Bookings from "../admin/pages/Bookings";
import AdminTheatres from "../admin/pages/AdminTheatres";
import AdminLayout from "../admin/layout/AdminLayout";
// import EditTheatre from "../admin/pages/EditTheatre";
// import AddMovie from "../admin/pages/AddMovie";
import AdminShows from "../admin/pages/AdminShows";
import AdminUsers from "../admin/pages/AdminUsers";


const AppRoutes=createBrowserRouter(
    [
      {path:"/",element:<Layout/>, children:[
        {index:true, element:<Home/>},
        {path:"/about", element:<About/>},
        {path:"/contact", element:<Contact/>},
        {path:"/login", element:<Login/>},
        {path:"/register", element:<Register/>},
        {path:"/theatres", element:<Theatres/>},
        {path:"/movie/:id", element:<MovieDetails/>},
        {path:"/theatres/:movieId", element:<TheatreSelection/>},
        {path:"/seatSelection/:movieId", element:<SeatSelection/>},
        {path:"/checkout", element:<Checkout/>},
        {path:"/bookingSuccess", element:<BookingSuccess/>},
      ]},
      /* ================= ADMIN ROUTES ================= */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },

      /* Movies */
      { path: "movies", element: <Movies /> },
      // { path: "movies/edit/:id", element: <EditMovie /> },
      // { path: "movies/add", element: <AddMovie /> },

      /* Theatres */
      { path: "theatres", element: <AdminTheatres /> },
      // { path: "theatres/add", element: <AddTheatre /> },
      // { path: "theatres/edit/:id", element: <EditTheatre /> },

      // Shows
      { path: "shows", element:<AdminShows/>},

      // Admin Users
      { path: "users", element:<AdminUsers/>},

      /* Bookings */
      { path: "bookings", element: <Bookings /> },

    ],
  },
    ]
  );

export default AppRoutes