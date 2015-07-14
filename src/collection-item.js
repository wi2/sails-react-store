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
    this.setState({item: data});
  }
  render() {
    let item = this.state ? this.state.item : this.props.item;
    return (
      <li className="{identity}-item">
        <p>{item.message}</p>
        <small>{item.name}</small>
        {this.props.buttons.map( (icon,i) => {
          return <ReactItemButton key={i} icon={icon} id={item.id} />;
        })}
      </li>
    )
  }
}

ReactItem.propTypes = { item: React.PropTypes.object };
ReactItem.defaultProps = { buttons: [] };
