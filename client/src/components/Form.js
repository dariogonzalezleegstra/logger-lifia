import React, {Component} from 'react';
import axios from 'axios';
import {record} from 'rrweb';
import Replay from './Replay';
import './Form.css';

/*
window.onbeforeunload = function () {
    sendEvents();
    return null;
};
*/


let events = [];
let stopRecordingEvents = false;

function setUpRRWeb() {

    record({
        emit(event) {
            if (!stopRecordingEvents) {
                events.push(event);
            }
        },
    });
    console.log('events pushed:', events);

// this function will send events to the backend and reset the events array

    function save() {
        //hardcoded
        if (window.location.href === 'http://logger-lifia.herokuapp.com/' || window.location.href === 'http://localhost:3000/') {
            const data = JSON.stringify({events});
            // events = [];
            axios.post('/api/logger/rrweb', {
                method: 'post',
                data,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
    }

// save events every 10 seconds
    setInterval(function() {
        console.log(stopRecordingEvents);
        if (!stopRecordingEvents) {
            save()
        }}, 10 * 1000);
}




function setUpEventListeners() {
    window.addEventListener("abort", handleEvent);
    window.addEventListener("blur", handleEvent);
    window.addEventListener("change", handleEvent);
    window.addEventListener("click", handleEvent);
    window.addEventListener("close", handleEvent);
    window.addEventListener("complete", handleEvent);
    window.addEventListener("contextmenu", handleEvent);
    window.addEventListener("copy", handleEvent);
    window.addEventListener("cut", handleEvent);
    window.addEventListener("dblclick", handleEvent);
    window.addEventListener("DOMContentLoaded", handleEvent);
    window.addEventListener("drag", handleEvent);
    window.addEventListener("dragend", handleEvent);
    window.addEventListener("dragenter", handleEvent);
    window.addEventListener("dragstart", handleEvent);
    window.addEventListener("drop", handleEvent);
    window.addEventListener("durationchange", handleEvent);
    window.addEventListener("error", handleEvent);
    window.addEventListener("focus", handleEvent);
    window.addEventListener("focusout", handleEvent);
    window.addEventListener("input", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("keyup", handleEvent);
    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mouseover", handleEvent);
    window.addEventListener("open", handleEvent);
    window.addEventListener("paste", handleEvent);
    window.addEventListener("scroll", handleEvent);
    window.addEventListener("select", handleEvent);
    window.addEventListener("submit", handleEvent);
    window.addEventListener("success", handleEvent);
    window.addEventListener("touchmove", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("touchend", handleEvent);
    window.addEventListener("wheel", handleEvent);
}

window.onload = function () {
    setUpRRWeb();
    setUpEventListeners();
};

var showResult = false;
var recommendedSerie = "";
var series = ["Stranger Things", "Breaking Bad", "Prison Break", "Game of Thrones", "The walking dead", "The sinner",
    "Criminal Minds", "Riverdale", "The rain", "Narcos", "Gossip Girl", "Grey's Anatomy"];


async function sendEvents(answers) {
    recommendedSerie = series[Math.floor(Math.random() * series.length)];
    document.getElementById('recommendedSerie').innerHTML = `Serie recomendada: ${recommendedSerie}`;
    document.getElementById('getRecommendation').disabled = true;
    window.scrollTo(0, document.body.scrollHeight);

    stopRecordingEvents = true;
    console.log("stop recording events: ", stopRecordingEvents);

    let obj = {};


    var cache = [];
    obj.events = JSON.stringify(events.map(event => {
        return {
            altKey: event.altKey,
            bubbles: event.bubbles,
            button: event.button,
            buttons: event.buttons,
            cancelBubble: event.cancelBubble,
            cancelable: event.cancelable,
            clientX: event.clientX,
            clientY: event.clientY,
            composed: event.composed,
            ctrlKey: event.ctrlKey,
            currentTarget: event.currentTarget,
            date: event.date,
            defaultPrevented: event.defaultPrevented,
            detail: event.detail,
            eventPhase: event.eventPhase,
            fromElement: event.fromElement,
            isTrusted: event.isTrusted,
            layerX: event.layerX,
            layerY: event.layerY,
            metaKey: event.metaKey,
            movementX: event.movementX,
            movementY: event.movementY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pageX: event.pageX,
            pageY: event.pageY,
            path: event.path,
            relatedTarget: event.relatedTarget,
            returnValue: event.returnValue,
            screenX: event.screenX,
            screenY: event.screenY,
            shiftKey: event.shiftKey,
            sourceCapabilities: event.sourceCapabilities,
            srcElement: event.srcElement,
            target: event.target,
            timeStamp: event.timeStamp,
            toElement: event.toElement,
            type: event.type,
            view: event.view,
            which: event.which,
            x: event.x,
            y: event.y
        }
    }), (key, value) => {   //Handle circular json (cycle)
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Duplicate reference found
                try {
                    // If this value does not reference a parent it can make a cycle
                    return JSON.parse(JSON.stringify(value));
                } catch (error) {
                    // discard key if value cannot make a cycle
                    return;
                }
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
    /*
        const answersSaved = await axios.post('/api/answers', answers);
        if (answersSaved) {
            obj.answers = answersSaved.data;
            const response = await axios.post('/api/logger', obj);
        }
    */
}

const handleEvent = e => {
    e.date = new Date();
    events.push(e);
};


//Client app

class Form extends Component {

    constructor(props) {
        super();
        this.state = {
            answers: {
                channel: null,
                numberOfChapters: null,
                favouriteSerie: null,
                accompaniedBy: {
                    alone: false,
                    friends: false,
                    couple: false,
                    other: false
                },
                age: null,
                gender: null,
                dailyHoursOfComputerUse: null,
                levelOfExpertise: null
            }
        }
    }


    changeAnswers(e) {
        const {answers} = this.state;
        answers[e.target.name] = e.target.value;
        this.setState({answers});
    }

    changeGender(e) {
        const {answers} = this.state;
        answers.gender = e.target.name;
        this.setState({answers});
    }

    changeAccompaniedBy(e) {
        const {answers} = this.state;
        answers.accompaniedBy[e.target.name] = e.target.checked;
        this.setState({answers});
    }


    render() {
        return (
            <div className="App">

                <div>
                </div>

                <header className="App-header">
                    {!showResult && <div>
                        <h1>¡Encuentra tu serie perfecta!</h1>
                        <form>
                            <p>¿Dónde ves tus series usualmente?</p>
                            <select name="channel" onChange={e => this.changeAnswers(e)}>
                                <option value="netflix">Netflix</option>
                                <option value="amazon">Amazon</option>
                                <option value="internet">Internet (Buscas gratis)</option>
                                <option value="hbo">HBO</option>
                                <option value="tv">TV por cable / aire</option>
                                <option value="other">Otro</option>
                            </select>
                            <p>¿Cuántos capítulos de serie viste esta semana?</p>
                            <select name="numberOfChapters" onClick={e => this.changeAnswers(e)}>
                                <option value="0-5">0 a 5</option>
                                <option value="5-20">5 a 20</option>
                                <option value="20+">Más de 20</option>
                            </select>
                            <p>¿Cuál es tu serie favorita de todos los tiempos?</p>
                            <input name="favouriteSerie" onChange={e => this.changeAnswers(e)}/>
                            <p>Cuando veo series suelo estar...</p>
                            <input name="alone" type="checkbox" onChange={e => this.changeAccompaniedBy(e)}/>Solo<br/>
                            <input name="friends" type="checkbox" onChange={e => this.changeAccompaniedBy(e)}/>Con
                            amigos<br/>
                            <input name="couple" type="checkbox" onChange={e => this.changeAccompaniedBy(e)}/>Con mi
                            pareja<br/>
                            <input name="other" type="checkbox" onChange={e => this.changeAccompaniedBy(e)}/>Otro
                            <br/>
                            <hr/>
                            <h3>¡Últimos datos!</h3>
                            <p>¿Cuál es tu edad?</p>
                            <input type="number" name="age" onChange={e => this.changeAnswers(e)}/>
                            <p>¿Cuál es tu género?</p>
                            <input onChange={e => this.changeGender(e)} type="radio" name="genderMan"/>Soy
                            Hombre &nbsp;&nbsp;
                            <input onChange={e => this.changeGender(e)} type="radio" name="genderWoman"/>Soy
                            Mujer &nbsp;&nbsp;
                            <input onChange={e => this.changeGender(e)} type="radio" name="genderOther"/>Otro
                            <p>¿Cuantas horas diarias usas computadora/notebook?</p>
                            <input name="dailyHoursOfComputerUse" onChange={e => this.changeAnswers(e)} type="number"/>
                            {/*Preguntar nivel de expertise*/}
                            <br/>
                            <p>¿Cual considerarías que es tu nivel al usar páginas web?</p>
                            <select name="levelOfExpertise" onChange={e => this.changeAnswers(e)}>
                                <option value="beginner">Principiante</option>
                                <option value="expert">Experto</option>
                            </select>
                            <br/>
                            <br/>
                            <br/>
                            <button type="button" id="getRecommendation" onClick={e => sendEvents(this.state.answers)}>
                                Ver recomendación
                            </button>
                        </form>
                        {console.log(this.state)}
                    </div>}
                    <div>
                        <h4>
                            <p id="recommendedSerie"></p>
                        </h4>
                    </div>
                </header>
            </div>
        );
    }
}

export default Form;
