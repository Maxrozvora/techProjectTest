import React, {Component} from 'react';

class TableCell extends Component {
    increaseValue = () => {
        this.props.onIncreaseValue(this.props.m,this.props.n);
    };
    lightOn = () => {
        this.props.onMouseEnter(this.props.m,this.props.n)
    };
    render() {
        const {value, m, sum, hoverRow} = this.props;
        const percent = (value/sum * 100).toFixed(1);
        const showPercent = m === hoverRow;
        const width = {
            width: percent + '%'
        };
        return (
            <td
                onClick={this.increaseValue}
                onMouseEnter={this.lightOn}
            >
                <div className="td-value" style={width}>
                    {showPercent ?  <div className="td-line"></div> : '' }
                    <div className="td-number">
                        {showPercent ? <span>{percent}%</span> : value}
                    </div>
                </div>

            </td>
        );
    }
}

export default TableCell;
