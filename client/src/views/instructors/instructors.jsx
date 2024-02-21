import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructors } from "../../redux/action";
import { Card, Row, Col } from "react-bootstrap";

function Instructors() {
  const dispatch = useDispatch();
  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {allInstructors.map((instructor) => (
        <Col key={instructor.id}>
          <Card className="custom-card" border="primary">
            <Card.Img
              variant="top"
              src={instructor.photo}
              className="rounded custom-card-img"
              style={{ height: "200px", width: "100%", objectFit: "contain" }}
            />
            <Card.Body>
              <Card.Title className="text-primary">
                {instructor.fullname}
              </Card.Title>
              <Card.Text className="text-muted">
                {instructor.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Last updated {instructor.lastUpdated}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Instructors;