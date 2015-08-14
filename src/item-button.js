import React from 'react'
import {ReactBase} from './base.js'

export class ReactItemButton extends ReactBase {
  static defaultProps = {
    fn: function(){}
  }
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    fn: React.PropTypes.func.isRequired
  }

  handleEvent (e){
    e.preventDefault();
    this.props.fn(this.props.id);
  }

  render() {
    return <button onClick={this.handleEvent.bind(this)}>{this.props.name}</button>
  }
}

export class ReactItemButtons extends ReactBase {
  static defaultProps = {
    btns: [],
    id: 0
  }
  static propTypes = {
    btns: React.PropTypes.array.isRequired,
    id: React.PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
      {this.props.btns.map( (icon,i) => {
        return <ReactItemButton key={i} fn={icon.fn} name={icon.name} id={this.props.id} />;
      })}
      </div>
    )
  }
}
