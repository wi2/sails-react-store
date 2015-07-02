
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
    var component, itemComponent, collectionComponent;

    beforeEach(function(done) {
      component = TestUtils.renderIntoDocument(
        <ItemButton icon={{name:'test'}} />
      );
      itemComponent = TestUtils.renderIntoDocument(
        <Item item={{message:'yep',name:'test'}} buttons  ={[]} />
      );
      collectionComponent = TestUtils.renderIntoDocument(
        <Collection />
      );
      done()
    });

    afterEach(function(done) {
      React.unmountComponentAtNode(document.body);
      setTimeout(done);
    });

    it('should have a textContent of "test"', function() {
      // console.log(component);
      var name = React.findDOMNode(component).textContent;
      assert.equal(name, 'test');
    });
    it('should have a textContent of "yeptest"', function() {
      // console.log(component);
      var name = React.findDOMNode(itemComponent).textContent;
      assert.equal(name, 'yeptest');
    });

  });


});
