import React from 'react'
import ReactBase from './base.js'
import ReactItem from './collection-item.js'
import {StoreCollection} from 'sails-store'

export default class ReactCollection extends ReactBase {
  static defaultProps = {
    items: [],
    buttons: [],
    max: 10
  }
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    max: React.PropTypes.number.isRequired,
    buttons: React.PropTypes.array.isRequired
  }
  state = {
    items: this.props.items
  }

  update(data){
    this.store.maj(data);
    this.setState({items: data});
  }

  componentDidMount() {
    this.store = new StoreCollection({
      identity: this.props.identity
    });

    this.store.get();
    //
    this.store.on('add', this.update.bind(this));
    this.store.on('remove', this.update.bind(this));
    this.store.on('update', this.update.bind(this));
  }
  shouldComponentUpdate(props, state) {
    return props !== state
  }
  render() {
    var Item = this.reactItem||ReactItem;
    let items = this.store ? this.store.value : this.props.items;
    return (
      <ul className={this.props.identity+'-list'}>
        {items.map( (item,i) => {
          return <Item identity={this.props.identity} key={i} item={item} buttons={this.props.buttons} belongs={this.belongs} />;
        })}
      </ul>
    )
  }
}
