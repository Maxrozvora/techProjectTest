import React, {Component} from 'react';

class TableCell extends Component {
    increaseValue = () => {
        this.props.onIncreaseValue(this.props.m,this.props.n);
    };
    lightOn = () => {
        this.props.onMouseEnter(this.props.m,this.props.n)
    };
    render() {
        const {value, m, sum, hoverRow, closestRight, closestLeft} = this.props;
        const percent = (value/sum * 100).toFixed();
        const showPercent = m === hoverRow;
        const width = {
            width: percent + '%'
        };
        const isClosest = closestRight === value || closestLeft === value
        return (
            <td className={isClosest ? 'closest' : ''}
                onClick={this.increaseValue}
                onMouseOver={this.lightOn}
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
