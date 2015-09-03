import React from 'react'
import ReactBase from './base.js'
import ReactCollectionItem from './collection-item.js'
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
    this.setState({items: data})
  }

  storage() {
    if (!this.store) {
      this.store = new StoreCollection({
        identity: this.props.identity
      });

      this.store.get();
      //
      this.store.on('add', this.update.bind(this));
      this.store.on('remove', this.update.bind(this));
      this.store.on('update', this.update.bind(this));
    }
  }

  componentDidMount(props) {
    this.storage();
  }
  componentWillUpdate(prevProps, prevState) {
    this.storage();
  }
  render() {
    var Item = this.ReactCollectionItem||ReactCollectionItem;
    return (
      <ul className={this.props.identity+'-list'}>
        {this.state.items.map( (item,i) => {
          return <Item identity={this.props.identity} key={i} item={item} buttons={this.props.buttons} belongs={this.belongs} />;
        })}
      </ul>
    )
  }
}
