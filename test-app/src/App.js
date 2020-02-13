import React, {Component} from 'react';
import TableCell from "./components/table/TableCell";
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            m: 3,
            n: 4,
            sum: null,
            hoverRow: null,
            closestLeft: null,
            closestRight: null
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

    removeRow = (i) => {
        const matrix = this.state.matrix;
        matrix.splice(i,1);
        this.setState({matrix})

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

    findClosest = (m,n) => {
        const matrix = this.state.matrix;
        const number = matrix[m][n].amount;
        let closestRight =  matrix[0][0];
        let closestLeft  =  matrix[0][0];
        let current;
        matrix.forEach((data) => {
            data.forEach(item => {
                console.log(item.amount, 'i');
                current = item.amount;
                if (current < number && (typeof closestLeft === 'undefined' ||  closestLeft.amount < current)) {
                    closestLeft = item.amount
                }
                if (current > number && (typeof closestLeft === 'undefined' || closestRight.amount > current)) {
                    closestRight = item.amount
                }
            })
        });
        console.log('closestRight',closestRight); // TODO console.log
        console.log('closestLeft',closestLeft); // TODO console.log

        this.setState({
            closestRight,
            closestLeft
        })

    };

    clearClosest = () => {
        console.log('test'); // TODO console.log
        this.setState({
            closestLeft: null,
            closestRight: null
        })
    }

    togglePercent = (i, sum = null) => {
        this.setState({
            hoverRow: i,
            sum
        })
    };

    render() {
        const { n, m, matrix, hoverRow, sum, closestRight, closestLeft } = this.state;
        const table = matrix.map((tr, i) => {
            return <tr key={i}>{tr.map((td, j) =>
                <TableCell
                    key={td.id}
                    value={td.amount}
                    m={i}
                    n={j}
                    hoverRow={hoverRow}
                    sum={sum}
                    closestRight={closestRight}
                    closestLeft={closestLeft}
                    onIncreaseValue={this.increaseValue}
                    onMouseEnter={this.findClosest}
                    onMouseLeave={this.clearClosest}
                />
                )}</tr>
        });

        const tableSum = matrix.map((tr,i) => {
            const sum = this.getSum(tr);
            return <tr key={i}>
                <td
                    onMouseOver={() => this.togglePercent(i, sum)}
                    onMouseLeave={() => this.togglePercent(null)}
                >
                    {sum}
                </td>
                <td className="td-btn">
                    <button className="btn btn-remove" onClick={(e) => this.removeRow(i, e)}>remove row</button>
                </td>
            </tr>
        });

        const tableAvg = this.getAvg(matrix).map((td, i) => {
            return <td key={i}>{td}</td>
        });

        return (
            <div>
                <div className="form-wrap">
                    <form onSubmit={this.handleSubmit} className="form">
                        <h2 className="title">Matrix generator</h2>
                        <div>
                            <label htmlFor="m">X: </label>
                            <input
                                className="form_input"
                                type="text"
                                value={m}
                                onChange={this.handleChange}
                                name="m"
                                required
                                id="m"
                            />
                        </div>
                        <div>
                            <label htmlFor="n">Y: </label>
                            <input
                                className="form_input"
                                type="text"
                                value={n}
                                onChange={this.handleChange}
                                name="n"
                                required
                                id="m"
                            />
                        </div>
                            <button className="btn btn-create" type="submit">Create matrix</button>
                        </form>
                    </div>
                <div>
                    <div className="d-flex">
                        <table className="table table-w100">
                            <tbody>
                            {table}
                            </tbody>
                            <tfoot>
                                <tr>
                                    {tableAvg}
                                </tr>
                            </tfoot>
                        </table>
                        <table className="table">
                            <tbody>
                            {tableSum}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button className="btn btn-add" onClick={this.addRow}>Add row</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
