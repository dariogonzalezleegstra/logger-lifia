import React, {Component} from 'react';
import rrwebPlayer from 'rrweb-player';
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
        const events = await axios.get('/logger/rrweb');
        console.log(events);

        let eventsToGoThrough = [];

        events.data.forEach((event, index) => {
            eventsToGoThrough.push(JSON.parse(event.events.data));
        });

        console.log(eventsToGoThrough);

        this.setState(prevState => ({
            events: eventsToGoThrough
        }));
    }

    replay() {
        const {events} = this.state;

        console.log('events: ', events[0].events);

        const replayer = new rrwebPlayer({
            target: document.body,
            data: {
                events: events[0].events,
                autoPlay: true
            }
        });
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
