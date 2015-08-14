import React from 'react'

export class ReactBase extends React.Component {
  static propTypes = {
    identity: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.identity = props.identity;
  }
  componentDidUnmount() {
    this.store.stopListening();
  }
  render(){
    return <div></div>
  }
}
