var jsdom = require('./helper.js');
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ReactStore = require('../index.js');

var Item = ReactStore.ReactItem;

describe('collection-item testing', function() {

  var post, comment;

  before(function(done) {
    post = TestUtils.renderIntoDocument(
      <Item item={{id:1, name: 'Bonjour'}} identity="post" />
    );
    comment = TestUtils.renderIntoDocument(
      <Item item={{message:'a comment',name:'Mike',id: 2}} buttons  ={[]} />
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

  });
  describe('comment', function() {
    it('should have a textContent of "a commentMike"', function() {
      var name = React.findDOMNode(comment).textContent;
      assert.equal(name, 'a commentMike');
    });
  });

});
