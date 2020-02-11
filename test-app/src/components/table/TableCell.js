import React, {Component} from 'react';

class TableCell extends Component {
    increaseValue = () => {

        this.props.onIncreaseValue(this.props.m,this.props.n)
    };
    render() {
        return (
            <td
                onClick={this.increaseValue}
            >
                {this.props.value}
            </td>
        );
    }
}

export default TableCell;
