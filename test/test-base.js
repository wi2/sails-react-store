const jsdom = require('./helper.js');
const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const ReactBase = require('../index.js').ReactBase;

describe('base testing', function() {

  var base, swbase;

  before(function(done) {
    base = TestUtils.renderIntoDocument(
      <ReactBase identity="post" />
    );
    swbase = React.createElement(
      ReactBase,
      {identity: "post"}
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
    it('classname should equal to post-section', function() {
      shallowRenderer.render(swbase)
      const comp = shallowRenderer.getRenderOutput()
      assert.equal(comp.props.className, 'post-section');
    });
  });

});
