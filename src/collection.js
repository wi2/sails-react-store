import React from 'react'
import {ReactBase} from './base.js'
import {ReactItem} from './collection-item.js'
import {StoreCollection} from 'sails-store'

export class ReactCollection extends ReactBase {
  constructor(props) {
    super(props);
    this.store = new StoreCollection({
      identity: this.identity
    });
    //
    this.state = {items: []}
    this.buttons = [];
  }
  componentDidMount() {
    if (!this.props.items) {
      this.store.get();
    } else {
      this.store.init(this.props.items)
      this.setState({items: this.props.items});
    }
    this.store.on('add', this.update.bind(this));
    this.store.on('remove', this.update.bind(this));
    this.store.on('update', this.update.bind(this));
  }
  update(data){
    this.setState({items: data});
  }
  render() {
    var Item = this.reactItem||ReactItem;
    return (
      <ul className="{identity}-list">
        {this.state.items.map(( (item,i) => {
          return <Item identity={this.props.identity} key={i} item={item} buttons={this.buttons} store={this.store} />;
        }).bind(this))}
      </ul>
    )
  }
}

