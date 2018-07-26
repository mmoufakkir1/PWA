import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalReducers from '../../reducers/global';
import * as globalActions from '../../actions/global';
import * as keys from '../../constants/storageKeys';
import App from '../../App';
import { store } from '../../global';



class GeoLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {

            latitude: 0,
            longitude: 0

        }

        this.getLocation = this.getLocation.bind(this);
    }

    getLocation() {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }
    }
    componentWillMount() {
        setInterval(() => {
            this.getLocation();
        }, 1000);
    }

    render() {

        return (
            <div>
                <div>Latitude: <span>{this.state.latitude}</span></div>
                <div>Longitude: <span>{this.state.longitude}</span></div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        geoLocation: state.global.geoLocation,
    }),
    (dispatch) => ({
        actions: bindActionCreators(globalActions, dispatch),
    })
)(GeoLocation)