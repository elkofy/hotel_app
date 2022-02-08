import React from "react";
import { Card } from "react-bootstrap";

class Chambre_card extends React.Component {
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🛏 Chambre 🛏</Card.Header>
          <Card.Body>
            <Card.Title>✨Titre de la chambre✨</Card.Title>
            <Card.Text>
            <span>🆔Numéro :</span>
              <span>{this.props.id}</span>
              <br />
              <span>📞Téléphone :</span>
              <span>{this.props.phone}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Chambre_card;