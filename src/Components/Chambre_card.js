import React from "react";
import { Card, Button } from "react-bootstrap";

class Chambre_card extends React.Component {
  
  removeCard = () => {
    fetch('https://6200fa65fdf509001724974a.mockapi.io/Hotel/Chambre/' + this.props.id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
    this.props.removeChambre(this.props.id);
  }
  editCard = () => {
    this.props.editChambre(this.props.id, {
      num: this.props.num,
      phone: this.props.phone
    
    });
  }
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🛏 Chambre 🛏</Card.Header>
          <Card.Body>
            <Card.Title>✨Chambre n°{this.props.num}✨</Card.Title>
            <Card.Text>
              <span>🆔Numéro :</span>
              <span>{this.props.id}</span>
              <br />
              <span>📞Téléphone :</span>
              <span>{this.props.phone}</span>
            </Card.Text>
            {this.props.edit
              ? (<div>
                  <Button variant="warning" onClick={this.editCard}> Modifier</Button>
                  <Button variant="danger" onClick={this.removeCard}>Supprimer</Button>
                 </div>)
              : (<div></div>)}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Chambre_card;