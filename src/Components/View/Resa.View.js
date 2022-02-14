import React from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Resa_card from "../Resa_card";

class ResaView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resas: JSON.parse(localStorage.getItem("Reservation")),
            clients: JSON.parse(localStorage.getItem("Clients")),
            chambres: JSON.parse(localStorage.getItem("Chambres")),
            isediting: false,
            currentNum: "",
            currentDateresa: "",
            currentDatedeb: "",
            currentDatefin: "",
            currentAmount: "",
            currentId: "",
            alert: false,
        };
    }
    alert = {
        hdr: "yes",
        variant: "success",
        msg: "yes",
    };
    addResa = () => {
        if (
            this.state.currentNum === "" ||
            this.state.currentDateresa === "" ||
            this.state.currentDatedeb === "" ||
            this.state.currentDatefin === "" ||
            this.state.currentAmount === ""
        ) {
            this.alert.hdr = "Erreur";
            this.alert.variant = "danger";
            this.alert.msg = "Veuillez remplir tous les champs";
            this.setState({ alert: true });
            return;
        }
        let obj = {
            num: this.state.currentNum,
            dateresa: this.state.currentDateresa,
            datedeb: this.state.currentDatedeb,
            datefin: this.state.currentDatefin,
            amount: this.state.currentAmount,



        };

        let resastate = this.state.resas;

        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Reservation", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then((response) => {
                return response.json();
            })
            .then((value) => {
                resastate.push(value);
                localStorage.setItem("Clients", JSON.stringify(resastate));
                this.setState({
                    resas: resastate,
                    currentNum: "",
                    currentDateresa: "",
                    currentDatedeb: "",
                    currentDatefin: "",
                    currentAmount: "",


                });
            });
    };

    removeResa = (id) => {
        let resastate = this.state.resas;
        resastate = resastate.filter((resa) => resa.id !== id);
        localStorage.setItem("Hotels", JSON.stringify(resastate));
        this.setState({ resas: resastate });
    };

    editResa = (id, obj) => {
        console.log(obj)
        obj.dateresa = obj.dateresa.toString().slice(0, 10);
        this.setState({
            isediting: true,
            currentNum: obj.num,
            currentDateresa: obj.dateresa,
            currentDatedeb: obj.datedeb,
            currentDatefin: obj.datefin,
            currentAmount: obj.amount,
            currentId: id,
        });
    };



    saveResa = () => {
        let resastate = this.state.resas;
        let resa = resastate.find((resa) => resa.id === this.state.currentId);
        resa.num = this.state.currentNum;
        resa.dateresa = this.state.currentDateresa;
        resa.datedeb = this.state.currentDatedeb;
        resa.datefin = this.state.currentDatefin;
        resa.amount = this.state.currentAmount;
        localStorage.setItem("Reservations", JSON.stringify(resastate));
        let obj = {
            num: this.state.currentNum,
            dateresa: this.state.currentDateresa,
            datedeb: this.state.currentDatedeb,
            datefin: this.state.currentDatefin,
            amount: this.state.currentAmount,

        };
        fetch(
            "https://6200fa65fdf509001724974a.mockapi.io/Hotel/Reservation/" +
            this.state.currentId,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }
        ).then((res) => res.text());
        this.setState({
            resas: resastate,
            isediting: false,
            currentNum: "",
            currentDateresa: "",
            currentDatedeb: "",
            currentDatefin: "",
            currentAmount: "",
            currentId: "",
        });
    };

    render() {
        const resas = this.state.resas;
        return (
            <div>
                <div className="row m-1">
                    <h1>Réservation</h1>
                    <div className="col-4">
                        <h4>Ajouter une Réservation</h4>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Numéro</Form.Label>
                                <Form.Control type="text" placeholder="Nom" onChange={(event) =>
                                    this.setState({ currentNum: event.target.value })}
                                    value={this.state.currentNum}
                                />

                                <Form.Label>Date de réservation</Form.Label>
                                <Form.Control type="date" placeholder="Date de réservation" onChange={(event) =>
                                    this.setState({ currentDateresa: event.target.value })}
                                    value={this.state.currentDateresa}
                                />

                                <Form.Label>Date de début</Form.Label>
                                <Form.Control type="date" placeholder="Date de début" onChange={(event) =>
                                    this.setState({ currentDatedeb: event.target.value })}
                                    value={this.state.currentDatedeb}
                                />

                                <Form.Label>Date de fin</Form.Label>
                                <Form.Control type="date" placeholder="Date de fin" onChange={(event) =>
                                    this.setState({ currentDatefin: event.target.value })}
                                    value={this.state.currentDatefin}
                                />

                                <Form.Label>Montant</Form.Label>
                                <Form.Control type="text" placeholder="Montant" onChange={(event) =>
                                    this.setState({ currentAmount: event.target.value })}
                                    value={this.state.currentAmount}
                                />
                                <br></br>
                                {this.state.isediting ? (
                                    <Button onClick={this.saveResa}>Modifiez</Button>
                                ) : (
                                    <Button onClick={this.addResa}>Ajouter</Button>
                                )}
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-2">
                        <Alert show={this.state.alert} variant={this.alert.variant}>
                            <Alert.Heading>{this.alert.hdr}</Alert.Heading>
                            <p>{this.alert.msg}</p>
                        </Alert>
                    </div>

                </div>
                <div className="row m-1">
                    <div className="grille">
                        {resas.map((resa) => (
                            <ol key={resa.id}>
                                <Resa_card
                                    id={resa.id}
                                    num={resa.num}
                                    dateresa={resa.dateresa.toString().slice(0, 10)}
                                    datedeb={resa.datedeb.toString().slice(0, 10)}
                                    datefin={resa.datefin.toString().slice(0, 10)}
                                    amount={resa.amount}
                                    edit={true}
                                    removeResa={this.removeResa}
                                    editResa={this.editResa}
                                />
                            </ol>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResaView;
