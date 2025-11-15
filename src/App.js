import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoutes from "./Functions/ProdectedRoutes";
import Login from "./Pages/Login";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import Products from "./Pages/Products";
import FavouriteproductsPage from "./Pages/FavouritrproductPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    path: "/login", element: <Login />,
  },
  {
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ), // Requires login and applies layout
    children: [
      { path: "/products", element: <Products /> },
      { path: "/:type/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/favourites", element: <FavouriteproductsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
