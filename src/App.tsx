import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details",
    element: <Details/>,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
