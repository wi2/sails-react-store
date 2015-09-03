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
  state = {
    item: this.props.item||{}
  }

  update(data){
    if (data !== this.state.item) {
      this.setState({item: data})
    }
  }

  storage() {
    let item = this.props.params ? this.props.params : this.props.item;
    delete this.props.params;
    if (!this.store) {
      this.store = new StoreItem({
        identity: this.props.identity,
        value: item,
        belongs: this.props.belongs
      });
      this.store.startListening();
      this.store.on('update', this.update.bind(this));
    }
    if (!item.createdAt)
      this.store.get();
  }

  componentDidMount() {
    this.storage();
  }
  componentWillUpdate() {
    this.storage();
  }
  componentWillUnmount() {
    if (this.store) {
      this.store.stopListening();
      delete this.store;
    }
  }

  render() {
    let item = this.state.item;
    return (
      <li className={this.props.identity+'-item'}>
        <p>{item.message}</p>
        <small>{item.name}</small>
        <ReactItemButtons items={this.props.buttons} id={item.id} />
      </li>
    )
  }
}
