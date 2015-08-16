import React from 'react'
import ReactBase from './base.js'
import {ReactItemButtons} from './item-button.js'
import {StoreItem} from 'sails-store'

export default class ReactItem extends ReactBase {
  static defaultProps = {
    item: {},
    buttons: []
  }
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    buttons: React.PropTypes.array.isRequired
  }

  update(data){
    this.store.setItems(data);
    this.forceUpdate()
  }

  componentDidMount() {
    let item = this.props.item||this.props.params;
    if (!this.store)
      this.store = new StoreItem({
        identity: this.props.identity,
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
  render() {
    let item = this.store ? this.store.value : this.props.item;
    return (
      <li className={this.props.identity+'-item'}>
        <p>{item.message}</p>
        <small>{item.name}</small>
        <ReactItemButtons items={this.props.buttons} id={item.id} />
      </li>
    )
  }
}
