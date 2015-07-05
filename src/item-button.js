import React from 'react'
import {ReactBase} from './base.js'

export class ReactItemButton extends ReactBase {
  constructor(props) {
    super(props);
  }
  handleEvent (e){
    e.preventDefault();
    this.props.icon.fn(this.props.id);
  }
  render() {
    return <button onClick={this.handleEvent.bind(this)}>{this.props.icon.name}</button>
  }
}
