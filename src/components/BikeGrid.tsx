import { Row, Col, Spinner, Alert } from "react-bootstrap";
import BikeCard from "./BikeCard";
import type { Bike } from "../types";

interface BikeGridProps {
  bikes: Bike[];
  isLoading?: boolean;
  error?: Error | null;
  onImageClick?: (bike: Bike) => void;
}

function BikeGrid({
  bikes,
  isLoading = false,
  error = null,
  onImageClick,
}: BikeGridProps) {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading bikes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oops! Something went wrong</Alert.Heading>
        <p>
          {error.message || "Failed to load bikes. Please try again later."}
        </p>
      </Alert>
    );
  }

  if (!bikes || bikes.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No bikes found</Alert.Heading>
        <p>We couldn't find any bikes to display.</p>
      </Alert>
    );
  }

  return (
    <Row className="g-4">
      {bikes.map((bike) => (
        <Col key={bike.id} xs={12} sm={6} lg={4} xl={3}>
          <BikeCard
            bike={bike}
            onImageClick={onImageClick ? () => onImageClick(bike) : undefined}
          />
        </Col>
      ))}
    </Row>
  );
}

export default BikeGrid;
