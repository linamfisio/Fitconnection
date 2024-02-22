import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Feedback = ({ fetchComments }) => {
  const params = useParams();
  const instructor_id = Number(params.id);

  const currentUser = useSelector((state) => state.userShopping);

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  const rating = 0;
  const [feedback, setFeedback] = useState({
    raiting: 0,
    comment: "",
    user_id: 0,
  });

  const handleRaitingChange = (raiting) => {
    setFeedback({ ...feedback, raiting });
  };

  useEffect(() => {
    if (currentUser && currentUser.id) {
      setFeedback({ ...feedback, user_id: currentUser.id });
    }
  }, [currentUser]);

  const handleComment = (event) => {
    const comment = event.target.value.trimStart();
    setFeedback({ ...feedback, comment });
  };

  const submitComment = async (event) => {
    const post_at = new Date();
    if (currentUser.id) {
      setFeedback({ ...feedback, user_id: currentUser.id });
    } else {
      Swal.fire("Error", "Inicia sesión para poder comentar", "error");
    }
    const feedbackInfo = {
      comment: feedback.comment.trim(),
      raiting: feedback.raiting,
      post_at,
      user_id: feedback.user_id,
      instructor_id,
    };
    //     instructor_id,
    try {
      await axios.post("/api/feedbacks", feedbackInfo);
      setFeedback({ user_id: currentUser.id, raiting: 0, comment: "" });
      fetchComments();
    } catch (error) {
      const message = error.response.data.error;
      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div>
      <Row>
        <span className="fw-bold">Comparte tu experiencia</span>
      </Row>
      <Row>
        <Form.Control
          value={feedback.comment}
          onChange={handleComment}
          style={{ maxHeight: "200px" }}
          as="textarea"
          rows={3}
        />
        <span
          style={{
            color: feedback.comment.length > 200 ? "red" : "gray",
          }}
        >{`${feedback.comment.length}/200`}</span>
      </Row>
      <Row>
        <Col>
          {stars.map((star) => (
            <span
              key={star}
              onClick={() => handleRaitingChange(star)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: star <= feedback.raiting ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </Col>
      </Row>
      <Row>
        <Button
          disabled={
            Boolean(feedback.raiting < 1) ||
            Boolean(feedback.raiting > 5) ||
            Boolean(feedback.comment.length < 1) ||
            Boolean(feedback.comment.length > 200)
          }
          variant="primary"
          onClick={submitComment}
        >
          Enviar Calificación
        </Button>
      </Row>
    </div>
  );
};

export default Feedback;