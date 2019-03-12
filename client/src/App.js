import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

window.onbeforeunload = function () {
    sendEvents();
    return null;
};

window.onload = function () {
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
};

var showResult = false;
var recommendedSerie = "";
var series = ["Stranger Things", "Breaking Bad", "Prison Break", "Game of Thrones", "The walking dead", "The sinner",
"Criminal Minds", "Riverdale", "The rain", "Narcos", "Gossip Girl", "Grey's Anatomy"];

var events = [];


async function sendEvents(e) {
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

    console.log('obj: ', obj);
    await axios.post('/api/logger', obj);
    recommendedSerie = series[Math.floor(Math.random()*series.length)];
    document.getElementById('recommendedSerie').innerHTML = `Serie recomendada: ${recommendedSerie}`;
    document.getElementById('getRecommendation').disabled = true;
    window.scrollTo(0,document.body.scrollHeight);
}


const handleEvent = e => {
    e.date = new Date();
    events.push(e);
};


//Client app

class App extends Component {

    componentDidMount() {
        /*
        let counter = 0;
        document.querySelectorAll('*').forEach((node) => {
            //Optionally, we can create an <EventListener> for each element of the DOM...
            counter++;
        });
        console.log("Cantidad de elementos en el DOM: " + counter);
        */


        //setUpListeners();
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
                            <select>
                                <option>Netflix</option>
                                <option>Amazon</option>
                                <option>Internet (Buscas gratis)</option>
                                <option>HBO</option>
                                <option>TV</option>
                                <option>Otro</option>
                            </select>
                            <p>¿Cuántos capítulos de serie viste esta semana?</p>
                            <select>
                                <option>0 a 5</option>
                                <option>5 a 20</option>
                                <option>Más de 20</option>
                            </select>
                            <p>¿Cuál es tu serie favorita de todos los tiempos?</p>
                            <input/>
                            <p>Cuando veo series suelo estar...</p>
                            <input type="checkbox"/>Solo<br/>
                            <input type="checkbox"/>Con amigos<br/>
                            <input type="checkbox"/>Con mi pareja<br/>
                            <input type="checkbox"/>Otro
                            <br/>
                            <br/>
                            <h3>¡Últimos datos!</h3>
                            <p>¿Cuál es tu edad?</p>
                            <input type="number" name="age"/>
                            <p>¿Cuál es tu género?</p>
                            <input type="radio" name="genderMan"/>Soy Hombre &nbsp;&nbsp;
                            <input type="radio" name="genderWoman"/>Soy Mujer &nbsp;&nbsp;
                            <input type="radio" name="genderOther"/>Otro


                            <br/>
                            <br/>
                            <button type="button" id="getRecommendation" onClick={e => sendEvents(e)}> Ver recomendación</button>
                        </form>
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

export default App;
