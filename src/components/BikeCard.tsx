import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Battery,
  Ruler,
  Gauge,
  Weight,
  Shield,
  DollarSign,
} from "lucide-react";
import type { Bike } from "../types";

interface BikeCardProps {
  bike: Bike;
  onImageClick?: () => void;
}

export default function BikeCard({ bike, onImageClick }: BikeCardProps) {
  return (
    <Card
      className="h-100 shadow-sm border-1"
      style={{ transition: "transform 0.2s" }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={bike.image}
          alt={bike.name}
          style={{
            height: "200px",
            objectFit: "cover",
            cursor: onImageClick ? "pointer" : "default",
          }}
          onClick={onImageClick}
        />
        <Badge
          bg="success"
          className="position-absolute top-0 end-0 m-2"
          style={{ fontSize: "0.8rem" }}
        >
          {bike.origin}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3 text-primary">{bike.name}</Card.Title>
        <div className="mb-2">
          <Badge className="me-2">{bike.color}</Badge>
          <Badge bg={bike.isStock ? "success" : "danger"}>
            {bike.isStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        <div className="mb-3">
          <div className="h5 text-success mb-2 d-flex align-items-center">
            <DollarSign size={18} className="me-2" />
            {bike.price.toLocaleString()} VND
          </div>
        </div>

        <div className="flex-grow-1">
          <Row className="g-2 small">
            <Col xs={6}>
              <div className="d-flex align-items-center mb-1">
                <Battery size={16} className="me-1" />
                <span>{bike.battery}</span>
              </div>
            </Col>
            <Col xs={6}>
              <div className="d-flex align-items-center mb-1">
                <Ruler size={16} className="me-1" />
                <span>{bike.range} km</span>
              </div>
            </Col>
            <Col xs={6}>
              <div className="d-flex align-items-center mb-1">
                <Gauge size={16} className="me-1" />
                <span>{bike.maxSpeed} km/h</span>
              </div>
            </Col>
            <Col xs={6}>
              <div className="d-flex align-items-center mb-1">
                <Weight size={16} className="me-1" />
                <span>{bike.weight} kg</span>
              </div>
            </Col>
            <Col xs={12}>
              <div className="d-flex align-items-center">
                <Shield size={16} className="me-1" />
                <span>{bike.warranty} months warranty</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          <Link to={`/bikes/${bike.id}`} className="text-decoration-none">
            <Button variant="primary" className="w-100" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
