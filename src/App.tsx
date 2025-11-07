import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MyNav from "./components/MyNav";
import Header from "./components/Header";
import BikeGrid from "./components/BikeGrid";
import BikeDetailModal from "./components/BikeDetailModal";
import { ThemeProvider } from "./contexts/ThemeContext";
import axios from "axios";
import type { Bike } from "./types";
import { Outlet } from "react-router-dom";

export function HomePage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = import.meta.env.VITE_MOCKAPI;

  useEffect(() => {
    axios
      .get<Bike[]>(`${apiUrl}`)
      .then((response) => {
        const bikes = Array.isArray(response.data) ? response.data : [];
        setBikes(bikes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  const handleImageClick = (bike: Bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBike(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Container className="mb-5">
          <BikeGrid bikes={bikes} onImageClick={handleImageClick} />
        </Container>
      </main>

      <BikeDetailModal
        show={showModal}
        onHide={handleCloseModal}
        bike={selectedBike}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="d-flex flex-column min-vh-100">
        <MyNav />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
