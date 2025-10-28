import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { isDark } = useTheme();

  return (
    <div className={`py-5 mb-4 ${isDark ? "bg-dark text-white" : ""}`}>
      <Container>
        <Row>
          <Col className="text-center">
            <h1 className="display-4 fw-bold mb-3">
              Electric Bikes Collection
            </h1>
            <p className="lead">
              Discover the latest electric bikes with cutting-edge technology
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
