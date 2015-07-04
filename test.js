
if (typeof document === 'undefined') {
  var jsdom = require("node-jsdom").jsdom;
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.parentWindow;
  global.navigator = {userAgent: ''};
}


var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ItemButton = require('./index.js').ReactItemButton;
var Item = require('./index.js').ReactItem;
var Collection = require('./index.js').ReactCollection;

describe('The reactItemButton component', function() {

  describe('when no props are given', function() {
    var hello, post, comment, collectionComponent;

    before(function(done) {
      hello = TestUtils.renderIntoDocument(
        <ItemButton icon={{name:'Hello'}} />
      );
      post = TestUtils.renderIntoDocument(
        <Item item={{id:1, name: 'Bonjour'}} identity="post" />
      );
      comment = TestUtils.renderIntoDocument(
        <Item item={{message:'a comment',name:'Mike'}} buttons  ={[]} />
      );
      collectionComponent = TestUtils.renderIntoDocument(
        <Collection identity="post" />
      );
      done()
    });

    afterEach(function(done) {
      React.unmountComponentAtNode(document.body);
      setTimeout(done);
    });

    it('should have a textContent of "Hello"', function() {
      var name = React.findDOMNode(hello).textContent;
      assert.equal(name, 'Hello');
    });

    it('should have a textContent of "Bonjour"', function() {
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Bonjour');
    });

    it('should have a textContent of "a commentMike"', function() {
      var name = React.findDOMNode(comment).textContent;
      assert.equal(name, 'a commentMike');
    });

  });


});
