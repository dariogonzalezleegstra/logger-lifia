import axios from 'axios';

var events = [];

const handleEvent = e => {
    e.date = new Date();
    events.push(e);
};


const setUpLogger = () => {

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

};


const sendEvents = () => {
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
    axios.post('/api/logger', obj);
};




module.exports = {
    setUpLogger: setUpLogger(),
    sendEvents: sendEvents(),
    handleEvent: handleEvent()
};

