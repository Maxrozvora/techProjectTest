import React, {Component} from 'react';
import {logicalExpression} from "@babel/types";
import Form from "./components/Form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            m: '',
            n: ''
        };
    }




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
                row.push({
                    id: this.getID(),
                    amount: random
                })
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

    getID = () => {
    return Math.random().toString(36).substr(2, 9);
    }

    generateTable = () => {
        this.state.matrix.map(row => {
            return <tr>{row.map(td => <td>{td.amount}</td>)}</tr>
        })
    }

    render() {

        return (
            <div>
                <div>
                    <Form m={this.state.m} n={this.state.n} onSubmit={this.handleSubmit} />
                </div>
                <hr/>
                <div>
                    <table>
                        <tbody>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default App;
