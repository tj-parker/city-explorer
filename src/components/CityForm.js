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
                display_name: '',
                latitude: '',
                longitude: '',
                map: '',
                error: { status: null, message: null },
            },
        }
    }

    getCity = (e) => {
        e.preventDefault();
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.query.toLowerCase()}&format=json`;
        axios.get(url)
            .then(response => {
                console.log(response.data[0]);
                this.setState({
                    display_name: response.data[0].display_name,
                    latitude: 'Latitude: ' + response.data[0].lat,
                    longitude: 'Longitude: ' + response.data[0].lon,
                    map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`
                })
            }).catch(error => {
                this.setState({
                    error: {
                        status: error.response.status,
                        message: error.response.data.message
                    }
                })
                console.log(error);
            });
    }

    handleChange = (e) => {
        let { value } = e.target;
        this.setState({ query: value });
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
                    <Card.Img src={this.state.map} />
                    <Card.Title>{this.state.display_name}</Card.Title>
                    <Card.Text>{this.state.latitude}</Card.Text>
                    <Card.Text>{this.state.longitude}</Card.Text>
                </Card>
            </Container>

        )
    }
}

export default CityForm;