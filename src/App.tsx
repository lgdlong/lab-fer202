import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MyNav from "./components/MyNav";
import Header from "./components/Header";
import BikeGrid from "./components/BikeGrid";
import { ThemeProvider } from "./contexts/ThemeContext";
import axios from "axios";
import BikeDetailModal from "./components/BikeDetailModal";
import type { Bike } from "./types";

function AppContent() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_MOCKAPI;

  useEffect(() => {
    axios
      .get<Bike[]>(apiUrl + "/bikes")
      .then((response) => {
        const bikes = Array.isArray(response.data) ? response.data : [];
        setBikes(bikes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  const handleShowDetail = (bike: Bike): void => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedBike(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNav />
      <Header />

      <main className="flex-grow-1">
        <Container className="mb-5">
          <BikeGrid bikes={bikes} onShowDetail={handleShowDetail} />
        </Container>

        <BikeDetailModal
          show={showModal}
          onHide={handleCloseModal}
          bike={selectedBike}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
