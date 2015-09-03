import React from 'react'

export default class ReactBase extends React.Component {
  static propTypes = {
    identity: React.PropTypes.string.isRequired
  }
  componentWillUnmount() {
    if (this.store) {
      this.store.stopListening();
      delete this.store;
    }
  }
  render(){
    return <div className={this.props.identity+'-section'}></div>
  }
}
