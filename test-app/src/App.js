import React, {Component} from 'react';
import TableCell from "./components/table/TableCell";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            m: 3,
            n: 4,
            sum: []
        };
    }

    componentDidMount() {
        this.generateMatrix()
    }

    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
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
        });
    };

    getRandom = () => {
        const min = 100;
        const max = 999;
        return Math.floor(Math.random()*(max-min))+min;
    };

    getID = () => {
    return Math.random().toString(36).substr(2, 9);
    };

    generateTable = () => {
        this.state.matrix.map(row => {
            return <tr>{row.map(td => <td>{td.amount}</td>)}</tr>
        })
    };


    getSum = (arr) => {
        let sum = 0;
        arr.forEach(item => {
            sum +=item.amount
        });
        return sum;
    };

    increaseValue = (m,n) => {
        const matrix = this.state.matrix;
        matrix[m][n].amount++;
        this.setState({matrix})
    };

    getAvg = (arr) => {
        return arr.reduce((acc, cur) => {
            cur.forEach((e, i) => acc[i] = acc[i] ? acc[i] + e.amount : e.amount);
            return acc;
        }, []).map(e => (e / arr.length).toFixed(1));
    };

    removeRow = () => {

    };
    addRow = () => {
        const res = [];
        for (let i = 0; i < this.state.n; i++) {
            res[i] = {
                id: this.getID(),
                amount: this.getRandom()
            }
        }
        const matrix = this.state.matrix;
        matrix.push(res);
        this.setState({
            matrix
        })
    };

    render() {
        const { n, m, matrix } = this.state;
        const table = matrix.map((tr, i) => {
            return <tr key={i}>{tr.map((td, j) =>
                <TableCell
                    key={td.id}
                    value={td.amount}
                    m={i}
                    n={j}
                    onIncreaseValue={this.increaseValue}
                />
                )}</tr>
        });

        const tableSum = matrix.map((tr,i) => {
            return <tr key={i}>
                <td>
                    {this.getSum(tr)}
                </td>
            </tr>
        });

        const tableAvg = this.getAvg(matrix).map((td, i) => {
            return <td key={i}>{td}</td>
        })



        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={m}
                            onChange={this.handleChange}
                            name="m"
                        />
                        <input
                            type="text"
                            value={n}
                            onChange={this.handleChange}
                            name="n"
                        />
                        <button type="submit">Create matrix</button>
                    </form>
                </div>
                <hr/>
                <div>
                    <div style={displayFlex}>
                        <table>
                            <tbody>
                            {table}
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            {tableSum}
                            </tbody>
                        </table>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            {tableAvg}
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={this.removeRow}>Remove row</button>
                        <button onClick={this.addRow}>Add row</button>
                    </div>
                </div>
            </div>
        );
    }
}

const displayFlex = {
    display: 'flex'
}

export default App;
