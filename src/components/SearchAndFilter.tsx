import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

interface FilterOptions {
  sortBy: string;
  filterByOrigin: string;
}

interface SearchAndFilterProps {
  onSearchChange: (searchTerm: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

function SearchAndFilter({
  onSearchChange,
  onFilterChange,
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterByOrigin, setFilterByOrigin] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({ sortBy: value, filterByOrigin });
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterByOrigin(value);
    onFilterChange({ sortBy, filterByOrigin: value });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setFilterByOrigin("");
    onSearchChange("");
    onFilterChange({ sortBy: "name", filterByOrigin: "" });
  };

  return (
    <Container className="mb-4">
      <Row className="g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search bikes..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortBy}
            onChange={handleSortChange}
            aria-label="Sort bikes"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="range">Sort by Range</option>
            <option value="maxSpeed">Sort by Speed</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={filterByOrigin}
            onChange={handleOriginChange}
            aria-label="Filter bikes by origin"
          >
            <option value="">All Origins</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Germany">Germany</option>
            <option value="USA">USA</option>
            <option value="Italy">Italy</option>
            <option value="France">France</option>
            <option value="Austria">Austria</option>
            <option value="Spain">Spain</option>
          </Form.Select>
        </Col>
        <Col md={1}>
          <Button
            variant="outline-secondary"
            onClick={clearFilters}
            className="w-100"
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchAndFilter;
