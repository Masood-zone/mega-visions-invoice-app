import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./pages";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
