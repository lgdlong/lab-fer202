import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { ArrowLeft, Save } from "lucide-react";
import axios from "axios";
import * as yup from "yup";
import { ValidationError } from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string().url("Invalid URL").required("Image URL is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
  origin: yup.string().required("Origin is required"),
  battery: yup.string().required("Battery is required"),
  range: yup
    .number()
    .positive("Range must be positive")
    .required("Range is required"),
  maxSpeed: yup
    .number()
    .positive("Max speed must be positive")
    .required("Max speed is required"),
  weight: yup
    .number()
    .positive("Weight must be positive")
    .required("Weight is required"),
  warranty: yup
    .number()
    .positive("Warranty must be positive")
    .required("Warranty is required"),
  description: yup.string(),
  color: yup.string().required("Color is required"),
  isStock: yup.boolean(),
});

export default function CreateBikePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    origin: "",
    battery: "",
    range: "",
    maxSpeed: "",
    weight: "",
    warranty: "",
    description: "",
    color: "",
    isStock: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const apiUrl = import.meta.env.VITE_MOCKAPI;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        validationError.inner.forEach((err: ValidationError) => {
          validationErrors[err.path!] = err.message;
        });
        setErrors(validationErrors);
      }
      setLoading(false);
      return;
    }

    try {
      const bikeData = {
        ...formData,
        price: Number(formData.price),
        range: Number(formData.range),
        maxSpeed: Number(formData.maxSpeed),
        weight: Number(formData.weight),
        warranty: Number(formData.warranty),
        isStock: formData.isStock,
        color: formData.color,
      };

      await axios.post(`${apiUrl}/bikes`, bikeData);
      setMessage("Bike created successfully!");

      setTimeout(() => navigate("/"), 2000);
    } catch {
      setMessage("Failed to create bike. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        <ArrowLeft size={16} className="me-2" />
        Back
      </Button>

      <h1 className="mb-4">Create New Bike</h1>

      {message && (
        <Alert
          variant={message.includes("successfully") ? "success" : "danger"}
          className="mb-4"
        >
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Origin *</Form.Label>
              <Form.Select
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                isInvalid={!!errors.origin}
              >
                <option value="">Select origin</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.origin}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Image URL *</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            isInvalid={!!errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {errors.image}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price (VND) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Battery *</Form.Label>
              <Form.Control
                type="text"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                isInvalid={!!errors.battery}
              />
              <Form.Control.Feedback type="invalid">
                {errors.battery}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Range (km) *</Form.Label>
              <Form.Control
                type="number"
                name="range"
                value={formData.range}
                onChange={handleChange}
                isInvalid={!!errors.range}
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.range}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Max Speed (km/h) *</Form.Label>
              <Form.Control
                type="number"
                name="maxSpeed"
                value={formData.maxSpeed}
                onChange={handleChange}
                isInvalid={!!errors.maxSpeed}
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxSpeed}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg) *</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                isInvalid={!!errors.weight}
                min="1"
                step="0.1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Warranty (months) *</Form.Label>
              <Form.Control
                type="number"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                isInvalid={!!errors.warranty}
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.warranty}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Color *</Form.Label>
              <Form.Select
                name="color"
                value={formData.color}
                onChange={handleChange}
                isInvalid={!!errors.color}
              >
                <option value="">Select color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Silver">Silver</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.color}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="isStock"
            label="In Stock"
            checked={formData.isStock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-100"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Creating...
            </>
          ) : (
            <>
              <Save size={20} className="me-2" />
              Create Bike
            </>
          )}
        </Button>
      </Form>
    </Container>
  );
}
