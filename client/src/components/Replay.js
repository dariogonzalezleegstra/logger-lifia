import React, {Component} from 'react';
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
        </div>);
    }

}

export default Replay;
