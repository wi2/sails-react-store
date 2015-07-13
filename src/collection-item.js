import React from 'react'
import {ReactBase} from './base.js'
import {StoreItem} from 'sails-store'

export class ReactItem extends ReactBase {

  componentDidMount() {
    let item = this.props.item||this.props.params;
    if (!this.store)
      this.store = new StoreItem({
        identity: this.identity,
        value: item,
        belongs: this.props.belongs
      });
    else
      this.store.startListening();
    this.store.on('update', this.update.bind(this));
    if (!item.createdAt)
      this.store.get();
  }
  componentDidUpdate() {
    if (this.props.params){
      this.store.setItems(this.props.params);
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
        {this.props.buttons.map(( (icon,i) => {
          return <ReactItemButton key={i} icon={icon} id={this.props.item.id} />;
        }).bind(this))}
      </li>
    )
  }
}

ReactItem.propTypes = { item: React.PropTypes.object };
ReactItem.defaultProps = { buttons: [] };
