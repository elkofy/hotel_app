import React from "react";
import { Card } from "react-bootstrap";

class Client_card extends React.Component {
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>👨Client👨</Card.Header>
          <Card.Body>
            <Card.Title>Client titre</Card.Title>
            <Card.Text>
              <span>🚀Nom :</span>
              <span>{this.props.firstname}</span>
              <br />
              <span>💊Prénom :</span>
              <span>{this.props.lastname}</span>
              <br />
              <span>🏚Adresse :</span>
              <span>{this.props.adress}</span>
              <br />
              <span>🏙Ville :</span>
              <span>{this.props.city}</span>
              <br />
              <span>📮Code postal :</span>
              <span>{this.props.zipcode}</span>
              <br />
              <span>🗺Pays :</span>
              <span>{this.props.country}</span>
              <br />
              <span>📞Téléphone :</span>
              <span>{this.props.phone}</span>
              <br />
              <span>💌Email :</span>
              <span>{this.props.email}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Client_card;
