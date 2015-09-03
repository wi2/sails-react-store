const jsdom = require('./helper.js');
const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const shallowRenderer = TestUtils.createRenderer();

const ReactStore = require('../index.js')
  , Item = ReactStore.ReactCollectionItem
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
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 4);
    });

    it('should have 3 instances of item', function() {
      items.pop();
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 3);
    });

    it('should have 4 instances of item', function() {
      items.push({name:"James", id:6});
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 4);
    });

    it('should have 6 instances of item', function() {
      items.push({name:"Jo", id:7});
      items.push({name:"Matt", id:8});
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 6);
    });

    it('should have 6 instances of item', function() {
      items[0] = {name: 'Bryan', id:1};
      collectionComponent.store.update(items);
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 6);
    });

    it('should have 5 instances of item', function() {
      collectionComponent.store.remove(items.pop());
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 5);
    });
    it('should have 6 instances of item', function() {
      collectionComponent.store.onChange({verb: 'created', data: {name:"Victor", id:10}});
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 6);
    });
    it('should have 5 instances of item', function() {
      collectionComponent.store.onChange({verb: 'destroyed', id:10});
      var len = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item).length;
      assert.equal(len, 5);
    });

  });
  describe('comment', function() {
    it('should change first item to Bobby', function() {
      collectionComponent.store.onChange({verb: 'updated', id: 1, data: {name:"Bobby"}});
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[0];
      var name = React.findDOMNode(item1).textContent;
      assert.equal(name, 'Bobby');
    });

    it('should change first item to Bob', function() {
      collectionComponent.store.onChange({verb: 'updated', id: 1, data: {name:"Bob"}});
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[0];
      var name = React.findDOMNode(item1).textContent;
      assert.equal(name, 'Bob');
    });

    it('should change first item to Mike', function() {
      collectionComponent.store.onChange({verb: 'updated', id: 2, data: {name:"Mike"}});
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[1];
      var name = React.findDOMNode(item1).textContent;
      assert.equal(name, 'Mike');
    });

    it('should change first item to Vicky', function() {
      collectionComponent.store.onChange({verb: 'updated', id: 3, data: {name:"Vicky"}});
      var item1 = TestUtils.scryRenderedComponentsWithType(collectionComponent, Item)[2];
      var name = React.findDOMNode(item1).textContent;
      assert.equal(name, 'Vicky');
    });


    it('classname should equal to post-list', function() {
      shallowRenderer.render(swcollectionComponent);
      const comp = shallowRenderer.getRenderOutput();
      assert.equal(comp.props.className, 'post-list');
    });

  });

});
