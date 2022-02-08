import React from "react";
import { Card } from "react-bootstrap";

class Resa_card extends React.Component {
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🎫 Réservation 🎫</Card.Header>
          <Card.Body>
            <Card.Title>✨Titre de la réservation✨</Card.Title>
            <Card.Text>
              <span>🆔Numéro :</span>
              <span>n°{this.props.num}</span>
              <br />
              <span>📅Date réservation :</span>
              <span>{this.props.dateresa}</span>
              <br />
              <span>📅Date de début :</span>
              <span>{this.props.datedeb}</span>
              <br />
              <span>📅Date de fin :</span>
              <span>{this.props.datefin}</span>
              <br />
              <span>💸Montant :</span>
              <span>{this.props.amount}</span>  
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Resa_card;