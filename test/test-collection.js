const jsdom = require('./helper.js');
const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const ReactStore = require('../index.js')
  , Item = ReactStore.ReactItem
  , Collection = ReactStore.ReactCollection;

describe('collection testing', function() {

  var items, collectionComponent, swcollectionComponent;

  before(function(done) {
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
    swcollectionComponent = React.createElement(
      Collection,
      {identity: "post", items: items}
    );
    done()
  });

  after(function(done) {
    React.unmountComponentAtNode(document.body);
    setTimeout(done);
  });

  describe('post', function() {
    it('should have a textContent of "JohnPaulMikeLeeMary"', function() {
      var name = React.findDOMNode(collectionComponent).textContent;
      assert.equal(name, 'JohnPaulMikeLeeMary');
    });

    it('should have 5 li', function() {
      var len = TestUtils.scryRenderedDOMComponentsWithTag(collectionComponent, 'li').length;
      assert.equal(len, 5);
    });

    it('should have 5 instances of item', function() {
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 5);
    });

    it('should have 4 instances of item', function() {
      items.pop();
      collectionComponent.update(items, function(){
        var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
        assert.equal(len, 4);
      });
    });

    it('should have 3 instances of item', function() {
      items.pop();
      collectionComponent.update(items, function(){
        var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
        assert.equal(len, 3);
      });
    });

    it('should have 4 instances of item', function() {
      items.push({name:"James", id:6});
      collectionComponent.update(items, function(){
        var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
        assert.equal(len, 4);
      });
    });

    it('should have 6 instances of item', function() {
      items.push({name:"Jo", id:7});
      items.push({name:"Matt", id:8});
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 6);
    });

    it('should have 6 instances of item', function() {
      items[0] = {name: 'Bryan'};
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 6);
    });

    it('should have 5 instances of item', function() {
      items.pop();
      collectionComponent.store.remove(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 5);
    });

  });
  describe('comment', function() {
    it('should change first item to Bobby', function() {
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[0];
      item1.update({name:"Bobby"}, function(){
        var name = React.findDOMNode(item1).textContent;
        assert.equal(name, 'Bobby');
      });
    });

    it('should change first item to Mike', function() {
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[0];
      item1.store.onChange({verb: 'updated', id: item1.store.value.id, data: {name:"Mike"}});
      var name = React.findDOMNode(item1).textContent;
      assert.equal(name, 'Mike');
    });

    it('classname should equal to post-list', function() {
      shallowRenderer.render(swcollectionComponent);
      const comp = shallowRenderer.getRenderOutput();
      assert.equal(comp.props.className, 'post-list');
    });

  });

});
