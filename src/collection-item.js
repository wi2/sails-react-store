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
    this.forceUpdate()
  }

  constructor(props) {
    super(props)
    let item = this.props.params ? this.props.params : this.props.item;

    this.store = new StoreItem({
      identity: this.props.identity,
      value: item,
      belongs: this.props.belongs
    });
    this.store.startListening();
    this.store.on('update', this.update.bind(this));
    if (!item.createdAt)
      this.store.get();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.params){
      this.store.update(this.props.params);
      delete this.props.params;
      this.store.get();
      return false;
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
