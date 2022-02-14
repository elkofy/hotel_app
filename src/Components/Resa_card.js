import React from "react";
import { Card,Button } from "react-bootstrap";



class Resa_card extends React.Component {



  removeCard = () => {
    fetch('https://6200fa65fdf509001724974a.mockapi.io/Hotel/Reservation/' + this.props.id, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
    this.props.removeResa(this.props.id);
  }
  editCard = () => {
    console.log(this.props.dateresa)
    console.log(this.props.datedeb)
    console.log(this.props.datefin)
      this.props.editResa(this.props.id, {
      num: this.props.num,
      dateresa: this.props.dateresa,
      datedeb: this.props.datedeb,
      datefin: this.props.datefin,
      amount: this.props.amount
  
    });
  }
  render() {
    return (
      <div>
        <Card border="dark" style={{ width: "21.5rem" }}>
          <Card.Header>🎫 Réservation 🎫</Card.Header>
          <Card.Body>
            <Card.Title>✨n°{this.props.num}✨</Card.Title>
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

export default Resa_card;