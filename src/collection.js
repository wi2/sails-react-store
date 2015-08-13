import React from 'react'
import {ReactBase} from './base.js'
import {ReactItem} from './collection-item.js'
import {StoreCollection} from 'sails-store'

export class ReactCollection extends ReactBase {
  componentDidMount() {
    this.store = new StoreCollection({
      identity: this.identity
    });
    this.store.get();
    //
    this.store.on('add', this.update.bind(this));
    this.store.on('remove', this.update.bind(this));
    this.store.on('update', this.update.bind(this));
  }
  update(data){
    this.setState({items: data});
    this.store.setItems(data);
  }
  shouldComponentUpdate(props, state) {
    return props !== state
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

ReactItem.propTypes = { items: React.PropTypes.array };

