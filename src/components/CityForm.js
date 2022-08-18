import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class CityForm extends Component {

    constructor() {
        super();
        this.state = {
            query: '',
            data: {
               display_name: '' ,
               latitude: '',
               longitude: '',
            },
        }
    }

    getCity = (e) => {
        e.preventDefault();
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.query.toLowerCase()}&format=json`;
        axios.get(url).then(response => {
            this.setState({
                display_name: response[0].display_name,
                latitude: response[0].lat,
                longitude: response[0].lon,
            })
        });
    }

    handleChange = (e) => {
        let { value } = e.target;
        this.setState({ query: value});
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.getCity}>
                    <Form.Label>Enter City</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} />
                    <Button variant="primary" type="submit">
                        Explore!
                    </Button>
                </Form>
                <Card>
                    <Card.Title>{this.state.display_name}</Card.Title>
                    <Card.Text>Latitude: {this.state.latitude}</Card.Text>
                    <Card.Text>Longitude: {this.state.longitude}</Card.Text>
                </Card>
            </Container>

        )
    }
}

export default CityForm;