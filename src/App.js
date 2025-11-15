import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
// import ProtectedRoutes from "./Components/ProtectedRoutes";
// import AuthLayout from "./Components/Layouts/AuthLayout";
// import Login from './Components/Pages/Login';
// import SignUp from './Components/Pages/SignUp';
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import Products from "./Pages/Products";
import FavouriteproductsPage from "./Pages/FavouritrproductPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <Products /> },
      { path: "/:type/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/favourites", element:<FavouriteproductsPage />},
    ],
  },
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     { path: "/login", element: <Login /> },
  //     { path: "/signup", element: <SignUp /> },
  //   ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
