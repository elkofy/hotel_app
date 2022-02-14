import React from "react";
import { Card, Button } from "react-bootstrap";

class Client_card extends React.Component {

  removeCard = () => {
    fetch('https://6200fa65fdf509001724974a.mockapi.io/Hotel/Client/' + this.props.id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
    this.props.removeClient(this.props.id);
  }

  editCard = () => {
    this.props.editClient(this.props.id, {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      adress: this.props.adress,
      city: this.props.city,
      zipcode: this.props.zipcode,
      country: this.props.country,
      phone: this.props.phone,
      email: this.props.email
    });
  }
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>👨Client👨</Card.Header>
          <Card.Body>
            <Card.Title>{this.props.firstname} {this.props.lastname}</Card.Title>
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

export default Client_card;
