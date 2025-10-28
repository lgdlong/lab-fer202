import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import {
  Battery,
  Ruler,
  Gauge,
  Weight,
  Shield,
  DollarSign,
  MapPin,
} from "lucide-react";
import type { Bike } from "../types";

interface BikeDetailModalProps {
  show: boolean;
  onHide: () => void;
  bike: Bike | null;
}

function BikeDetailModal({ show, onHide, bike }: BikeDetailModalProps) {
  if (!bike)
    return (
      <>
        <h1>Hello</h1>
      </>
    );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{bike.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img
              src={bike.image}
              alt={bike.name}
              className="img-fluid rounded"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Badge bg="success" className="mb-2">
                <MapPin size={14} className="me-1" />
                {bike.origin}
              </Badge>
              <h4 className="text-success d-flex align-items-center">
                <DollarSign size={20} className="me-2" />
                {bike.price.toLocaleString()} VND
              </h4>
            </div>

            <Row className="g-3">
              <Col xs={12}>
                <div className="d-flex align-items-center p-2 border rounded">
                  <Battery size={20} className="me-3 text-primary" />
                  <div>
                    <strong>Battery:</strong> {bike.battery}
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center p-2 border rounded">
                  <Ruler size={20} className="me-3 text-info" />
                  <div>
                    <strong>Range:</strong> {bike.range} km
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center p-2 border rounded">
                  <Gauge size={20} className="me-3 text-warning" />
                  <div>
                    <strong>Max Speed:</strong> {bike.maxSpeed} km/h
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center p-2 border rounded">
                  <Weight size={20} className="me-3 text-secondary" />
                  <div>
                    <strong>Weight:</strong> {bike.weight} kg
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center p-2 border rounded">
                  <Shield size={20} className="me-3 text-success" />
                  <div>
                    <strong>Warranty:</strong> {bike.warranty} months
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">Contact Seller</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BikeDetailModal;
