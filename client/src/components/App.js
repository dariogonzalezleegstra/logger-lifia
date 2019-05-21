import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import * as actions from '../actions';

import './Form.css';
import Form from './Form';
import Replay from './Replay';


class App extends Component {
    render() {
        return (
            <Fragment className="App">
                <BrowserRouter>
                    <div>
                        {/*<Header/>*/}
                        <Route exact path="/" component={Form}/>
                        <Route exact path="/replay" component={Replay}/>
                        {/*<Route path="/" component={ErrorNotFound}/> */}
                    </div>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
