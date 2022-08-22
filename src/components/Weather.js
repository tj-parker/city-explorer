import { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lon: 0,
            searchQuery: '',
            weather: [{}],
            error: {}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getLocation();
    }

    getLocation = async () => {
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`

        try {
            let response = await axios.get(url);
            this.setState({
                lat: response.data[0].lat,
                lon: response.data[0].lon,
            }, this.getWeather);
        } catch (e) {
            this.setState({ error: e });
        }

    }

    getWeather = async () => {
        let url = `http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.searchQuery}`;

        try {
            let response = await axios.get(url);
            this.setState({
                weather: response.data,
            });
        } catch (e) {
            this.setState({ error: e });
        }
        
    }

    render() {
        console.log(this.state);        
      
        return (
            <Container>
                <h1>Weather Data</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Control type="text" onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                    <Button variant="primary" type="submit">Explore!</Button>
                </Form>
                <Card>
                    <Card.Title>{this.state.searchQuery}</Card.Title>
                    <Card.Text>{this.state.lat}</Card.Text>
                    <Card.Text>{this.state.lon}</Card.Text>
                    <Card.Text>{this.state.weather[0].date}</Card.Text>
                    <Card.Text>{this.state.weather[0].description}</Card.Text>
                </Card>
            </Container>

        )
    }
}

export default Weather;