const jsdom = require('./helper.js');
const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const ReactStore = require('../index.js')
  , Item = ReactStore.ReactItem;

describe('collection-item testing', function() {

  var post, comment, swpost, swcomment;

  before(function(done) {
    post = TestUtils.renderIntoDocument(
      <Item item={{id:1, name: 'Bonjour'}} identity="post" />
    );
    swpost = React.createElement(
      Item,
      {identity: "post", item: {id:1, name: 'Bonjour'}}
    );
    comment = TestUtils.renderIntoDocument(
      <Item item={{message:'a comment',name:'Mike',id: 2}} buttons={[]} />
    );
    swcomment = React.createElement(
      Item,
      {identity: "comment", item: {message:'a comment',name:'Mike',id: 2}, buttons: []}
    );
    done()
  });

  after(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  describe('post', function() {
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
    it('classname should equal to post-item', function() {
      shallowRenderer.render(swpost);
      const comp = shallowRenderer.getRenderOutput();
      assert.equal(comp.props.className, 'post-item');
    });

  });
  describe('comment', function() {
    it('should have a textContent of "a commentMike"', function() {
      var name = React.findDOMNode(comment).textContent;
      assert.equal(name, 'a commentMike');
    });
    it('classname should equal to comment-item', function() {
      shallowRenderer.render(swcomment);
      const comp = shallowRenderer.getRenderOutput();
      assert.equal(comp.props.className, 'comment-item');
    });
  });

});
