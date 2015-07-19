import React from 'react'
import {ReactBase} from './base.js'
import {ReactItem} from './collection-item.js'
import {StoreCollection} from 'sails-store'

export class ReactCollection extends ReactBase {
  constructor(props) {
    super(props);
    this.state = {items: []}
  }
  componentDidMount() {
    this.store = new StoreCollection({
      identity: this.identity
    });
    //
    if (!this.props.items) {
      this.store.get();
    } else {
      this.update(this.props.items)
    }
    this.store.on('add', this.update.bind(this));
    this.store.on('remove', this.update.bind(this));
    this.store.on('update', this.update.bind(this));
  }
  update(data){
    this.store.setItems(data);
    this.forceUpdate()
  }
  render() {
    var Item = this.reactItem||ReactItem;
    let items = this.store ? this.store.value : this.props.items;
    return (
      <ul className="{identity}-list">
        {items.map( (item,i) => {
          return <Item identity={this.props.identity} key={i} item={item} buttons={this.props.buttons} belongs={this.belongs} />;
        })}
      </ul>
    )
  }
}

