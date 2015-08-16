import React from 'react'

export default class ReactBase extends React.Component {
  static propTypes = {
    identity: React.PropTypes.string.isRequired
  }

  componentDidUnmount() {
    this.store.stopListening();
  }
  render(){
    return <div className={this.props.identity+'-section'}></div>
  }
}
