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

    // findClosest = (m,n) => {
    //     const matrix = this.state.matrix;
    //     const arr = matrix.flat();
    //     const sort = arr.sort((a,b) => a.amount - b.amount);
    //     const number = matrix[m][n].amount;
    //     const index = sort.findIndex(item => item.amount === number);
    //     let closestRight =  sort[index !== 0 && index !== sort.length -1 ? index - 1 : 1].amount;
    //     let closestLeft  =  sort[index !== 0 && index !== sort.length -1 ? index + 1 : sort.length - 2].amount;
    //
    //     this.setState({
    //         closestRight,
    //         closestLeft
    //     })
    //
    // };

    findClosest = (m,n) => {
        const matrix = this.state.matrix;
        let closestLeft = matrix[m][n].amount;
        let closestRight = matrix[m][n].amount;
        let minDiff = 1000;
        let minDif2 = 1000;
        const number = matrix[m][n].amount;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {

                let result = Math.abs(number - matrix[i][j].amount);
                if (number - matrix[i][j].amount === 0)
                    continue;
                if (result < minDiff && matrix[i][j].amount < number) {
                    minDiff = result;
                    closestLeft = matrix[i][j].amount;
                }
                if (result < minDif2 && matrix[i][j].amount > number) {
                    minDif2 = result;
                    closestRight = matrix[i][j].amount;
                }
            }
        }
        this.setState({
                    closestRight,
                    closestLeft
                })
    }

    clearClosest = () => {
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
                    onMouseOver={this.findClosest}
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

        const valid = !(this.state.m && this.state.n);

        return (
            <div className="container">
                <div className="form-wrap">
                    <form onSubmit={this.handleSubmit} className="form">
                        <h2 className="title">Matrix generator</h2>
                        <div>
                            <label htmlFor="m">X: </label>
                            <input
                                className="form_input"
                                type="number"
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
                                type="number"
                                value={n}
                                onChange={this.handleChange}
                                name="n"
                                required
                                id="n"
                            />
                        </div>
                            <button className="btn btn-create" type="submit" disabled={valid}>Create matrix</button>
                        </form>
                    </div>
                <div>
                    <div className="d-flex">
                        <table className="table table-w100 table-matrix">
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
                        <button className="btn btn-add" onClick={this.addRow} disabled={valid}>Add row</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
