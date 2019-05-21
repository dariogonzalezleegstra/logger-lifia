import React, {Component} from 'react';
import {Replayer} from 'rrweb';
import axios from 'axios';


class Replay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }

    }

    componentDidMount() {
        this.fetchEvents();
    }

    async fetchEvents() {
        const events = await axios.get('/logger/rrweb/fetchAll');
        console.log(events);
        this.setState(prevState => ({
            events: [...prevState.events, events.data]
        }));
    }

    replay() {
        const {events} = this.state;

        const replayer = new Replayer(events);
        replayer.play();
    }

    render() {
        return <div>
            <button onClick={() => this.replay()}>
                Replay
            </button>
            {console.log(this.state)}
        </div>;
    }

}

export default Replay;
