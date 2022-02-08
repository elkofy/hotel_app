import React from "react";
import { Card } from "react-bootstrap";

class Hotel_card extends React.Component {

  render() {
    
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🏢 Hôtel 🏢</Card.Header>
          <Card.Body>
            <Card.Title>✨Titre de l'Hôtel✨</Card.Title>
            <Card.Text>
              <span>🆔Code unique : </span>
              <span>{this.props.id}  </span>
              <br />
              <span>📃Nom : </span>
              <span>{this.props.name}</span>
              <br />
              <span>🏚Adresse : </span>
              <span>{this.props.adress}</span>
              <br />
              <span>📞Téléphone : </span>
              <span>{this.props.phone}</span>
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Hotel_card;
