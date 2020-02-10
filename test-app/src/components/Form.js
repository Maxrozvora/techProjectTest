import React, {Component} from 'react';

class Form extends Component {
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
    render() {
        console.log(this.props); // TODO console.log
        const { n, m, handleNChange, handleMChange, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={m}
                    onChange={handleMChange}
                    name="M"
                />
                <input
                    type="text"
                    value={n}
                    onChange={handleNChange}
                    name="N"
                />
                <button type="submit">Create matrix</button>
            </form>
        );
    }
}

export default Form;
