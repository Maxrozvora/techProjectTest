import React, {Component} from 'react';
import TableCell from "./components/table/TableCell";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            m: 3,
            n: 3,
            sum: []
        };
    }

    componentDidMount() {
        this.generateMatrix()
    }

    handleChange = (e) => {
        console.log('teste', e); // TODO console.log
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log('test'); // TODO console.log
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

    }

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
                </div>
            </div>
        );
    }
}

const displayFlex = {
    display: 'flex'
}

export default App;
