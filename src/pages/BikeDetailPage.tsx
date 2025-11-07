import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Alert } from "react-bootstrap";
import {
  Battery,
  Ruler,
  Gauge,
  Weight,
  Shield,
  DollarSign,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import type { Bike } from "../types";

export default function BikeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bike, setBike] = useState<Bike | null>(null);
  const apiUrl = import.meta.env.VITE_MOCKAPI;

  // Function to get appropriate text color based on background
  const getTextColor = (color: string) => {
    const darkColors = ["Black", "Blue", "Red", "Green"];
    return darkColors.includes(color) ? "white" : "black";
  };

  useEffect(() => {
    axios
      .get<Bike>(`${apiUrl}/${id}`)
      .then((response) => {
        setBike(response.data);
      })
      .catch((err) => {
        console.error("Error fetching bike:", err);
      });
  }, [id, apiUrl]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!bike) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Oops! Something went wrong</Alert.Heading>
          <Button variant="primary" onClick={handleGoBack}>
            <ArrowLeft size={16} className="me-2" />
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Back Button */}
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" onClick={handleGoBack}>
            <ArrowLeft size={16} className="me-2" />
            Back to Bikes
          </Button>
        </Col>
      </Row>

      {/* Bike Details */}
      <Row className="g-5">
        <Col lg={6}>
          <div className="position-relative">
            <img
              src={bike.image}
              alt={bike.name}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <Badge bg="success" className="position-absolute top-0 end-0 m-3">
              <MapPin size={16} className="me-1" />
              {bike.origin}
            </Badge>
          </div>
        </Col>

        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            <div>
              <h1 className="display-5 fw-bold mb-3">{bike.name}</h1>

              <div className="mb-4">
                <Badge
                  className="me-2 mb-2"
                  style={{
                    backgroundColor: bike.color.toLowerCase(),
                    color: getTextColor(bike.color),
                  }}
                >
                  {bike.color}
                </Badge>
                <Badge
                  bg={bike.isStock ? "success" : "danger"}
                  className="mb-2"
                >
                  {bike.isStock ? "In Stock" : "Out of Stock"}
                </Badge>
                <h2 className="h3 text-success d-flex align-items-center">
                  <DollarSign size={24} className="me-2" />
                  {bike.price.toLocaleString()} VND
                </h2>
              </div>

              {bike.description && (
                <div className="mb-4">
                  <h4>Description</h4>
                  <p className="text-muted">{bike.description}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="mb-3">Specifications</h4>
                <Row className="g-3">
                  <Col sm={6}>
                    <div className="d-flex align-items-center p-3 border rounded">
                      <Battery size={24} className="me-3" />
                      <div>
                        <strong>Battery</strong>
                        <br />
                        <span className="text-muted">{bike.battery}</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center p-3 border rounded">
                      <Ruler size={24} className="me-3" />
                      <div>
                        <strong>Range</strong>
                        <br />
                        <span className="text-muted">{bike.range} km</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center p-3 border rounded">
                      <Gauge size={24} className="me-3" />
                      <div>
                        <strong>Max Speed</strong>
                        <br />
                        <span className="text-muted">{bike.maxSpeed} km/h</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center p-3 border rounded">
                      <Weight size={24} className="me-3" />
                      <div>
                        <strong>Weight</strong>
                        <br />
                        <span className="text-muted">{bike.weight} kg</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div className="d-flex align-items-center p-3 border rounded">
                      <Shield size={24} className="me-3" />
                      <div>
                        <strong>Warranty</strong>
                        <br />
                        <span className="text-muted">
                          {bike.warranty} months warranty
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
