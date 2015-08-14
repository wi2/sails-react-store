var jsdom = require('./helper.js');
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ReactStore = require('../index.js');

var ItemButton = ReactStore.ReactItemButton;
var FewButtons = ReactStore.ReactItemButtons;

describe('Button testing', function() {

  var one, second, multiple;
  var buttons = [
    {fn: console.log, name:'Send'},
    {fn: function(id){console.log("reset", id)}, name:'Reset'},
    {name:'Cancel'}
  ];

  before(function(done) {
    one = TestUtils.renderIntoDocument(
      <ItemButton id={1} name="Validate" fn={console.log} />
    );
    second = TestUtils.renderIntoDocument(
      <ItemButton id={2} name="factice" />
    );
    multiple = TestUtils.renderIntoDocument(
      <FewButtons items={buttons} id={1} />
    );
    done()
  });

  after(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  describe('one', function() {
    it('should have a textContent of "Validate"', function() {
      assert.equal(one.props.name, "Validate");
      assert.equal(React.findDOMNode(one).textContent, 'Validate');
    });
    it('should have a fn : console.log', function() {
      assert.equal(one.props.fn, console.log);
    });
  });
  describe('second', function() {
    it('should don\'t have a fn : console.log', function() {
      assert.notEqual(second.props.fn, console.log);
    });
    it('should equal empty function', function() {
      assert.notEqual(second.props.fn, function(){});
    });
  });
  describe('multiple', function() {
    it('should have 3 buttons', function() {
      var len = TestUtils.scryRenderedDOMComponentsWithTag(multiple, 'button').length;
      assert.equal(len, 3);
    });
  });

});
