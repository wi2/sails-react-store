import React from 'react'
import {ReactBase} from './base.js'
import {StoreItem} from 'sails-store'

export class ReactItem extends ReactBase {

  componentDidMount() {
    let item = this.props.item||this.props.params;
    this.store = new StoreItem({
      identity: this.identity,
      value: item,
      store: this.props.store
    });
    this.store.on('update', this.update.bind(this));
    if (!item.createdAt) {
      this.store.get();
    }
  }
  componentDidUpdate() {
    if (this.props.params){
      this.store.init(this.props.params);
      delete this.props.params;
      this.store.get();
    }
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
