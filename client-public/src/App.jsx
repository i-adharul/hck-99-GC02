import { BrowserRouter, Routes, Route } from "react-router";
import LodgingList from "./pages/LodgingList";
import DetailLodging from "./pages/DetailLodging";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LodgingList />} />
          <Route path="/lodgings" element={<LodgingList />} />
          <Route path="/lodgings/:id" element={<DetailLodging />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
