import React, { Component } from 'react';

class DetailPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { context } = this.props;
    if (context === null) return (<div><p>No Content Found</p></div>);

    return (
      <div>
        {context}
      </div>
    )
  }
}

export default DetailPage;