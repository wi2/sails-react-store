
Sails React

## Installation
You need sais.io.socket and sails-hook-babel

```sh
$ npm install sails-react-store sails-hook-babel --save
```

## Usage
### for record's collection
```
"use strict";
import React from 'react'
import {ReactItem, ReactCollection} from 'sails-react-store'

export class PostItem extends ReactItem {
  render() {
    return (
      <div className="post">
        <h5 className="post-title">{this.props.item.title}</h5>
        <p className="post-content">{this.props.item.content}</p>
      </div>
    )
  }
}

export class PostCollection extends ReactItem {
  render() {
    return (
      <div className="posts">
        {this.props.items.map((function(item,i) {
          return <PostItem
            identity={this.props.identity}
            key={i}
            item={item}
            belongs={this.store} />;
        }).bind(this))}
      </div>
    )
  }
}


```
and use like that
when no attributes items => get request /post
```
<PostCollection identity="post" />

```
or if you want to add manually items
```
<PostCollection identity="post" items={[]} />
```
### for one record
```
<PostItem identity="post" item={{title:'a title', content: 'a text content'}} />

```




## License

MIT &copy; 2015 contributors

