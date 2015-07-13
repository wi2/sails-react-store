import React from 'react'

export class ReactBase extends React.Component {
  constructor(props) {
    super(props);
    this.identity = props.identity;
  }
  componentDidUnmount() {
    this.store.stopListening();
  }
  bindmap(items, fn) {
    return items.map(fn.bind(this));
  }
}
