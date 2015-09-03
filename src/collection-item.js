import React from 'react'
import ReactBase from './base.js'
import {ReactItemButtons} from './item-button.js'

export default class ReactCollectionItem extends ReactBase {
  render() {
    let item = this.props.item;
    return (
      <li className={this.props.identity+'-item'}>
        <p>{item.message}</p>
        <small>{item.name}</small>
        <ReactItemButtons items={this.props.buttons} id={item.id} />
      </li>
    )
  }
}
