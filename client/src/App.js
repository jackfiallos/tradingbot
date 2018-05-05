import React, { Component } from "react";
import { subscribeToTimer } from './socket';
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    /**
     * Creates an instance of App.
     * @param {any} props 
     * @memberof App
     */
    constructor(props) {
        super();

        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp
        }));

        this.state = {
            timestamp: 'no timestamp yet'
        };
    }

    /**
     * @returns 
     * @memberof App
     */
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                This is the timer value: {this.state.timestamp}
            </div>
        );
    }
}

export default App;
