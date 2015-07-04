import React from 'react'
import {ReactBase} from './base.jsx'
import {StoreItem} from 'sails-store'

export class ReactItem extends ReactBase {

  componentDidMount() {
    var item = this.props.item;
    this.store = new StoreItem({
      identity: this.identity,
      value: item,
      store: this.props.store
    });
    this.store.on('update', this.update.bind(this));
  }
  update(data){
    this.props.item = data;
    this.forceUpdate()
  }
  render() {
    return (
      <li className="{identity}-item">
        <p>{this.props.item.message}</p>
        <small>{this.props.item.name}</small>
        {this.props.buttons.map((function(icon,i) {
          return <ReactItemButton key={i} icon={icon} id={this.props.item.id} />;
        }).bind(this))}
      </li>
    )
  }
}

ReactItem.propTypes = { item: React.PropTypes.object };
ReactItem.defaultProps = { buttons: [] };