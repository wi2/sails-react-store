
if (typeof document === 'undefined') {
  var jsdom = require("node-jsdom").jsdom;
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.parentWindow;
  global.navigator = {userAgent: ''};
}


var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;


var ReactBase = require('./index.js').ReactBase;
var ItemButton = require('./index.js').ReactItemButton;
var Item = require('./index.js').ReactItem;
var Collection = require('./index.js').ReactCollection;

describe('The reactItemButton component', function() {

  describe('when no props are given', function() {
    var base, hello, post, comment, collectionComponent, items;

    before(function(done) {
      base = TestUtils.renderIntoDocument(
        <ReactBase identity="post" />
      );
      hello = TestUtils.renderIntoDocument(
        <ItemButton id={1} icon={{name:'Hello', fn: console.log}} />
      );
      post = TestUtils.renderIntoDocument(
        <Item item={{id:1, name: 'Bonjour'}} identity="post" />
      );
      comment = TestUtils.renderIntoDocument(
        <Item item={{message:'a comment',name:'Mike'}} buttons  ={[]} />
      );

      items = [
        {id: 1, name:"John"},
        {id: 2, name:"Paul"},
        {id: 3, name:"Mike"},
        {id: 4, name:"Lee"},
        {id: 5, name:"Mary"}
      ];
      collectionComponent = TestUtils.renderIntoDocument(
        <Collection identity="post" items={items} />
      );
      done()
    });

    afterEach(function(done) {
      React.unmountComponentAtNode(document.body);
      setTimeout(done);
    });

    it('should have identity equal post', function() {
      assert.equal(base.props.identity, 'post');
    });

    it('should have a textContent of "Hello"', function() {
      assert.equal(hello.props.icon.name, "Hello");
      assert.equal(hello.props.icon.fn, console.log);
      var name = React.findDOMNode(hello).textContent;
      assert.equal(name, 'Hello');
    });

    it('should have a textContent of "Bonjour"', function() {
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Bonjour');
    });

    it('should have a textContent of "hi"', function() {
      post.update({name: 'hi'});
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'hi');
    });

    it('should have a textContent of "hi"', function() {
      post.store.emit('update', {name:'Matt'});
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Matt');
    });

    it('should have a textContent of "a commentMike"', function() {
      var name = React.findDOMNode(comment).textContent;
      assert.equal(name, 'a commentMike');
    });

    it('should have a textContent of "JohnPaulMikeLeeMary"', function() {
      var name = React.findDOMNode(collectionComponent).textContent;
      assert.equal(name, 'JohnPaulMikeLeeMary');
    });

    it('should have 5 li', function() {
      var len = TestUtils.scryRenderedDOMComponentsWithTag(collectionComponent, 'li').length
      assert.equal(len, 5);
    });

    it('should have 5 instances of item', function() {
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 5);
    });

    it('should have 4 instances of item', function() {
      items.pop();
      collectionComponent.props.items = items;
      collectionComponent.forceUpdate();
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 4);
    });

    it('should have 3 instances of item', function() {
      items.pop();
      collectionComponent.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 3);
    });

    it('should have 4 instances of item', function() {
      items.push({name:"James"});
      collectionComponent.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 4);
    });

    it('should have 6 instances of item', function() {
      items.push({name:"Jo"});
      items.push({name:"Matt"});
      collectionComponent.store.emit('add', items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 6);
    });

    it('should have 6 instances of item', function() {
      items[0] = {name: 'Bryan'};
      collectionComponent.store.emit('update', items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 6);
    });

    it('should have 5 instances of item', function() {
      items.pop();
      collectionComponent.store.emit('remove', items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length
      assert.equal(len, 5);
    });


  });


});
