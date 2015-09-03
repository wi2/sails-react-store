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

var _baseJs2 = _interopRequireDefault(_baseJs);

var _itemButtonJs = require('./item-button.js');

var _sailsStore = require('sails-store');

var ReactItem = (function (_ReactBase) {
  function ReactItem() {
    _classCallCheck(this, ReactItem);

    _get(Object.getPrototypeOf(ReactItem.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      item: this.props.item || {}
    };
  }

  _inherits(ReactItem, _ReactBase);

  _createClass(ReactItem, [{
    key: 'update',
    value: function update(data) {
      if (data !== this.state.item) {
        this.setState({ item: data });
      }
    }
  }, {
    key: 'storage',
    value: function storage() {
      var item = this.props.params ? this.props.params : this.props.item;
      delete this.props.params;
      if (!this.store) {
        this.store = new _sailsStore.StoreItem({
          identity: this.props.identity,
          value: item,
          belongs: this.props.belongs
        });
        this.store.startListening();
        this.store.on('update', this.update.bind(this));
      }
      if (!item.createdAt) this.store.get();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.storage();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.storage();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.store) {
        this.store.stopListening();
        delete this.store;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.state.item;
      return _react2['default'].createElement(
        'li',
        { className: this.props.identity + '-item' },
        _react2['default'].createElement(
          'p',
          null,
          item.message
        ),
        _react2['default'].createElement(
          'small',
          null,
          item.name
        ),
        _react2['default'].createElement(_itemButtonJs.ReactItemButtons, { items: this.props.buttons, id: item.id })
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      item: {},
      buttons: []
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      item: _react2['default'].PropTypes.object.isRequired,
      buttons: _react2['default'].PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return ReactItem;
})(_baseJs2['default']);

exports['default'] = ReactItem;
module.exports = exports['default'];