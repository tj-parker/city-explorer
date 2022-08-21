import { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lon: 0,
            searchQuery: '',
            weather: [],
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
            })
        } catch (e) {
            this.setState({ error: e });
        }

    }

    getWeather = () => {
        let url = `http://localhost:3001?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.searchQuery}`;
        axios.get(url);
    }

    render() {
        return (
            <>
                <h1>Weather Data</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={(e) => this.setState({ searchQuery: e.target.value })} />
                    <button>Explore!</button>
                </form>
            </>

        )
    }
}

export default Weather;