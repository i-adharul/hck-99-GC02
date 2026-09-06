import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import BaseLayout from "./layout/BaseLayout";
import Login from "../src/pages/Login";
import LodgingList from "../src/pages/LodgingList";
import TypeList from "../src/pages/TypeList";
import AddUser from "../src/pages/AddUser";
import AddLodging from "../src/pages/AddLodging";
import EditLodging from "./pages/EditLodging";
import UploadLodgingImage from "./pages/UploadLodgingImage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<LodgingList />} />
            <Route path="/lodgings" element={<LodgingList />} />
            <Route path="/types" element={<TypeList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/lodgings/add" element={<AddLodging />} />
            <Route path="/lodgings/edit/:id" element={<EditLodging />} />
            <Route
              path="/lodgings/upload/:id"
              element={<UploadLodgingImage />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
