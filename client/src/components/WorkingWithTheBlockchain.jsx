import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';

class WorkingWithTheBlockchain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { depositTxHash: null };
    autoBind(this);
  }

  render() {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }
}

export default WorkingWithTheBlockchain;
