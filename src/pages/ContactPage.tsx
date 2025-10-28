import { Container, Row, Col, Card } from "react-bootstrap";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col lg={12} className="text-center">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-muted">
            Have questions about our electric bikes? Get in touch with us!
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {/* Contact Information */}
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Get in Touch</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Mail size={24} className="text-primary me-3" />
                      <strong>Email</strong>
                    </div>
                    <p className="ms-5 mb-0 text-muted">
                      info@electricbikes.com
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <Phone size={24} className="text-primary me-3" />
                      <strong>Phone</strong>
                    </div>
                    <p className="ms-5 mb-0 text-muted">+84 123 456 789</p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <MapPin size={24} className="text-primary me-3" />
                      <strong>Address</strong>
                    </div>
                    <p className="ms-5 mb-0 text-muted">
                      123 Electric Street
                      <br />
                      District 1, Ho Chi Minh City
                      <br />
                      Vietnam
                    </p>
                  </div>

                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <Clock size={24} className="text-primary me-3" />
                      <strong>Business Hours</strong>
                    </div>
                    <div className="ms-5 text-muted">
                      <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="mb-1">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="mb-0">Sunday: Closed</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h4 className="mb-0">Frequently Asked Questions</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <strong className="text-primary">
                      Do you offer test rides?
                    </strong>
                    <p className="text-muted mb-0 mt-1">
                      Yes! Visit our showroom to test ride any of our bikes.
                    </p>
                  </div>

                  <div className="mb-4">
                    <strong className="text-primary">
                      What's the warranty period?
                    </strong>
                    <p className="text-muted mb-0 mt-1">
                      All our bikes come with 12-24 months warranty depending on
                      the model.
                    </p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-4">
                    <strong className="text-primary">
                      Do you provide maintenance?
                    </strong>
                    <p className="text-muted mb-0 mt-1">
                      Yes, we offer full maintenance and repair services.
                    </p>
                  </div>

                  <div className="mb-4">
                    <strong className="text-primary">
                      Do you offer financing?
                    </strong>
                    <p className="text-muted mb-0 mt-1">
                      We have various financing options available. Contact us
                      for details.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
