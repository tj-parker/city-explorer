import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class CityForm extends Component {

    constructor() {
        super();
        this.state = {
            query: '',
            data: {},
        }
    }

    getCity = (e) => {
        e.preventDefault();
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.query.toLowerCase()}&format=json`;
        axios.get(url).then(response => console.log(response.data));
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
            </Container>

        )
    }
}

export default CityForm;