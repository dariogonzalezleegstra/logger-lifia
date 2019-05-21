import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Replayer} from 'rrweb';



class Replay extends Component {

    constructor(props) {
        super(props);
    }

    replay() {
        const events = this.props.location.state.events;
        console.log('ev:', events);
        const replayer = new Replayer(events);
        replayer.play();
    }

    render() {
        return (<div>
            Replay

            <Button variant="primary" onClick={() => this.replay()}>Replay</Button>
        </div>);
    }

}

export default Replay;
