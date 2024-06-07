import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardProvider } from "./BoardContext";
import Play from "./pages/Play";
import Admin from "./pages/Admin";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Play />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  return (
    <BoardProvider>
      <RouterProvider router={router} />
    </BoardProvider>
  );
}

export default App;
