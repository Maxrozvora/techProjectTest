import React, {Component} from 'react';
import {logicalExpression} from "@babel/types";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            m: '',
            n: ''
        };
    }


    handleMChange = ({target: { value }}) => {
        this.setState({
            m: value
        });
    };

    handleNChange = ({target: { value }}) => {
        this.setState({
            n: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.generateMatrix();
        this.setState({
            m: '',
            n: ''
        })
    };

    generateMatrix = () => {
        const {m,n} = this.state;
        const matrix = [];
        for (let i = 0; i < m; i++) {
            const row = [];
            for (let j = 0; j < n; j++) {
                const random = this.getRandom();
                row.push(random)
            }
            matrix.push(row)
        }
        this.setState({
            matrix
        })

    };

    getRandom = () => {
        const min = 100;
        const max = 999;
        return Math.floor(Math.random()*(max-min))+min;
    };

    render() {
        const { n, m } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={m}
                        onChange={this.handleMChange}
                        name="M"
                    />
                    <input
                        type="text"
                        value={n}
                        onChange={this.handleNChange}
                        name="N"
                    />
                    <button type="submit">Create matrix</button>
                </form>
            </div>
        );
    }
}

export default App;
