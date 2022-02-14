import React from "react";
import { Card, Button } from "react-bootstrap";

class Hotel_card extends React.Component {

  state = {
    id: this.props.id,
  };

  removeCard = () => {
    fetch('https://6200fa65fdf509001724974a.mockapi.io/Hotel/Hotel/' + this.props.id, {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
    this.props.removeHotel(this.props.id);
  }

  editCard = () => {
    this.props.editHotel(this.props.id,{ name: this.props.name, adress: this.props.adress, phone: this.props.phone });
  }

  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🏢 Hôtel 🏢</Card.Header>
          <Card.Body>
            <Card.Title>✨{this.props.name}✨</Card.Title>
            <Card.Text>
              <span>🆔Code unique : </span>
              <span>{this.props.id} </span>
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
            {this.props.edit ? (
              <div>
                <Button variant="warning" onClick={this.editCard}> Modifier</Button>
                <Button variant="danger" onClick={this.removeCard}>Supprimer</Button>
              </div>
            ) : (
              <div></div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Hotel_card;
