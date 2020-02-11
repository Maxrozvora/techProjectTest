import React, {Component} from 'react';

class TableCell extends Component {
    render() {
        return (
            <td>{this.props.value}</td>
        );
    }
}

export default TableCell;
