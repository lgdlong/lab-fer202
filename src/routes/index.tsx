import { createBrowserRouter } from "react-router-dom";
import App, { HomePage } from "../App";
import ContactPage from "../pages/ContactPage";
import BikeDetailPage from "../pages/BikeDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component sẽ chứa <Outlet /> để render các route con
    children: [
      {
        index: true, // index route: render tại path "/"
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "bikes/:id",
        element: <BikeDetailPage />,
      },
      // Thêm các route khác tại đây
    ],
  },
]);

export default router;
