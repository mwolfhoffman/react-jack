import CardsUpComponent from "./cards-up.component";
import { Card } from "react-bootstrap";

export default function CardComponent({ card }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{card.name || card.value}</Card.Title>
          <Card.Text>{card.suit}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
