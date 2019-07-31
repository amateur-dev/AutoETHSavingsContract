import React, { Component } from "react";
import autoBind from 'react-autobind';

class WorkingWithTheBlockchain extends Component {
    constructor(props) {
        super(props);
        this.state = { depositTxHash: null };
        autoBind(this);
    }

    render() {
        return (
            < div >
                <div className="loader"></div>
            </div >
        )

    }
}

export default WorkingWithTheBlockchain;