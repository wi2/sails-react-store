const jsdom = require('./helper.js');
const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
// const shallowRenderer = TestUtils.createRenderer();

const ReactStore = require('../index.js')
  , Item = ReactStore.ReactItem;

describe('item testing', function() {

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
      post.update({name: 'hi', id: 1}, function(){
        var name = React.findDOMNode(post).textContent;
        assert.equal(name, 'hi');
      });
    });

    it('should equal Matt', function() {
      post.store.onChange({verb:'updated', id: 1, data: {name:'Matt'} });
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Matt');
    });
    it('should equal Bob', function() {
      post.store.onChange({verb:'updated', id: post.store.value.id, data: {name:'Bob'} });
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Bob');
    });
    it('should equal Tom', function() {
      post.store.onChange({verb:'updated', id: post.store.value.id, data: {name:'Tom'} });
      var name = React.findDOMNode(post).textContent;
      assert.equal(name, 'Tom');
    });


    it('should equal tommy then Tom then Bob', function() {
      var pp = React.findDOMNode(post);
      assert.equal(pp.textContent, 'Tom');
      post.store.onChange({verb:'updated', id: post.store.value.id, data: {name:'Tommy'} });
      assert.equal(pp.textContent, 'Tommy');
      post.store.onChange({verb:'updated', id: post.store.value.id, data: {name:'Tom'} });
      assert.equal(pp.textContent, 'Tom');
      post.store.onChange({verb:'updated', id: post.store.value.id, data: {name:'Bob'} });
      assert.equal(pp.textContent, 'Bob');
    });


    it('classname should equal to post-item', function() {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(swpost);
      const comp = shallowRenderer.getRenderOutput();
      assert.equal(comp.props.className, 'post-item');
    });

  });
  // describe('comment', function() {
  //   it('should have a textContent of "a commentMike"', function() {
  //     var name = React.findDOMNode(comment).textContent;
  //     assert.equal(name, 'a commentMike');
  //   });
  //   it('classname should equal to comment-item and name equal to Mike', function() {
  //     const shallowRenderer = TestUtils.createRenderer();
  //     shallowRenderer.render(swcomment);
  //     const comp = shallowRenderer.getRenderOutput();
  //     assert.equal(comp.props.className, 'comment-item');
  //     assert.equal(comp.props.children[1].props.children, 'Mike');
  //   });
  // });

});
