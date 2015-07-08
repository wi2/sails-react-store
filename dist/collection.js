'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _baseJs = require('./base.js');

var _collectionItemJs = require('./collection-item.js');

var _sailsStore = require('sails-store');

var ReactCollection = (function (_ReactBase) {
  function ReactCollection(props) {
    _classCallCheck(this, ReactCollection);

    _get(Object.getPrototypeOf(ReactCollection.prototype), 'constructor', this).call(this, props);
    this.store = new _sailsStore.StoreCollection({
      identity: this.identity
    });
    //
    this.state = { items: [] };
    this.buttons = [];
  }

  _inherits(ReactCollection, _ReactBase);

  _createClass(ReactCollection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.items) {
        this.store.get();
      } else {
        this.store.init(this.props.items);
        this.setState({ items: this.props.items });
      }
      this.store.on('add', this.update.bind(this));
      this.store.on('remove', this.update.bind(this));
      this.store.on('update', this.update.bind(this));
    }
  }, {
    key: 'update',
    value: function update(data) {
      this.setState({ items: data });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var Item = this.reactItem || _collectionItemJs.ReactItem;
      return _react2['default'].createElement(
        'ul',
        { className: '{identity}-list' },
        this.state.items.map((function (item, i) {
          return _react2['default'].createElement(Item, { identity: _this.props.identity, key: i, item: item, buttons: _this.buttons, store: _this.store });
        }).bind(this))
      );
    }
  }]);

  return ReactCollection;
})(_baseJs.ReactBase);

exports.ReactCollection = ReactCollection;