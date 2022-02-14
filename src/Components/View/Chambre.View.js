import React from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Chambre_card from "../Chambre_card";


class ChambreView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chambres: JSON.parse(localStorage.getItem("Chambres")),
            isediting: false,
            currentNum: "",
            currentPhone: "",
            currentId: "",
            alert: false,
        };
    }
    alert = {
        hdr: "yes",
        variant: "success",
        msg: "yes",
    };
    clickme = (id) => {
        console.log("clicked", id);
    };
    addChambre = () => {
        if (
            this.state.currentNum === "" ||
            this.state.currentPhone === "" ||
            this.state.currentAdress === ""
        ) {
            this.alert.hdr = "Erreur";
            this.alert.variant = "danger";
            this.alert.msg = "Veuillez remplir tous les champs";
            this.setState({ alert: true });
            return;
        }
        let obj = {
            phone: this.state.currentPhone,
            num: this.state.currentNum,
        };

        let chambrestate = this.state.chambres;

        fetch("https://6200fa65fdf509001724974a.mockapi.io/Hotel/Chambre", {
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
                chambrestate.push(value);
                localStorage.setItem("Chambres", JSON.stringify(chambrestate));
                this.setState({
                    chambres: chambrestate,
                    currentNum: "",
                    currentPhone: "",
                });
            });
    };

    removeChambre = (id) => {
        let chambrestate = this.state.chambres;
        chambrestate = chambrestate.filter((chambre) => chambre.id !== id);
        localStorage.setItem("Chambres", JSON.stringify(chambrestate));
        this.setState({ chambres: chambrestate });
    };

    editChambre = (id, obj) => {
        this.setState({
            isediting: true,
            currentNum: obj.num,
            currentPhone: obj.phone,
            currentId: id,
        });
    };



    saveChambre = () => {
        console.log("save", this.state.currentId);
        let chambrestate = this.state.chambres;

        let chambre = chambrestate.find((chambre) => chambre.id === this.state.currentId);
        chambre.num = this.state.currentNum;
        chambre.phone = this.state.currentPhone;
        localStorage.setItem("Hotels", JSON.stringify(chambrestate));
        let obj = {
            num: this.state.currentNum,
            phone: this.state.currentPhone,
        };
        fetch(
            "https://6200fa65fdf509001724974a.mockapi.io/Hotel/Chambre/" +
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
            chambre: chambrestate,
            isediting: false,
            currentNum: "",
            currentPhone: "",
        });
    };

    render() {
        const chambres = this.state.chambres;
        return (
            <div>
                <div className="row m-1">
                    <h1>Chambre</h1>
                    <div className="col-4">
                        <h4>Ajouter une chambre</h4>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Numéro</Form.Label>
                                <Form.Control type="text" placeholder="Num" onChange={(event) =>
                                    this.setState({ currentNum: event.target.value })}
                                    value={this.state.currentNum}
                                />
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="319-9132"
                                    onChange={(event) =>
                                        this.setState({ currentPhone: event.target.value })
                                    }
                                    value={this.state.currentPhone}
                                />
                                <br></br>
                                {this.state.isediting ? (
                                    <Button onClick={this.saveChambre}>Modifiez</Button>
                                ) : (
                                    <Button onClick={this.addChambre}>Ajouter</Button>
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
                        {chambres.map((chambre) => (
                            <ol key={chambre.id}>
                                <Chambre_card
                                    id={chambre.id}
                                    num={chambre.num}
                                    phone={chambre.phone}
                                    edit={true}
                                    removeChambre={this.removeChambre}
                                    editChambre={this.editChambre}
                                />
                            </ol>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChambreView;
