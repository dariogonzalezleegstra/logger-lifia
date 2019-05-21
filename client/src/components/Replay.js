import React, {Component} from 'react';
import {Replayer} from 'rrweb';
import axios from 'axios';


class Replay extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchEvents();
    }

    async fetchEvents() {
        const events = await axios.get('/logger/rrweb/fetchAll');
        console.log(events);
    }

    replay() {
        const events = this.props.location.state.events;
        console.log('ev:', events);
        const replayer = new Replayer(events);
        replayer.play();
    }

    render() {
        return <div>
            Replay
        </div>;
    }

}

export default Replay;
