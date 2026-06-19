import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import BrowsePage from "@/pages/BrowsePage";
import OutfitDetailPage from "@/pages/OutfitDetailPage";
import ReturnsPage from "@/pages/ReturnsPage";
import OutfitBuilderPage from "@/pages/OutfitBuilderPage";
import ItemDetailPage from "@/pages/ItemDetailPage";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/outfit/:id" element={<OutfitDetailPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/builder" element={<OutfitBuilderPage />} />
      </Routes>
    </Router>
  );
}
