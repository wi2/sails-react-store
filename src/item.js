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

  shouldComponentUpdate(newProps, newState) {
    if (newProps.params) {
      this.deleteStore();
      this.createStore(newProps.identity, newProps.params)
      this.store.get();
      delete this.props.params;
      return false;
    }
    return true;
  }
  componentDidMount() {
    if (this.props.params && this.props.item && !this.props.item.id)
      this.setState(this.props.params);
    else
      this.storage()
  }
  componentWillUpdate() {
    this.storage();
  }
  componentWillUnmount() {
    this.deleteStore();
  }

  update(data){
    if (data !== this.state.item) this.setState({item: data})
  }
  storage() {
    let item = this.state.item;
    this.createStore(this.props.identity, item)
    if (!item.createdAt) this.store.get();
  }
  createStore(identity, value) {
    if (!this.store) {
      this.store = new StoreItem({identity, value});
      this.store.startListening();
      this.store.on('update', this.update.bind(this));
    }
  }
  deleteStore() {
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
