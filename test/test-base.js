var jsdom = require('./helper.js');
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ReactStore = require('../index.js');

var ReactBase = ReactStore.ReactBase;

describe('base testing', function() {

  var base;

  before(function(done) {
    base = TestUtils.renderIntoDocument(
      <ReactBase identity="post" />
    );
    done()
  });

  after(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  describe('base', function() {
    it('should have identity equal post', function() {
      assert.equal(base.props.identity, 'post');
    });
  });

});
