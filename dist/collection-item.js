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

var _sailsStore = require('sails-store');

var ReactItem = (function (_ReactBase) {
  function ReactItem() {
    _classCallCheck(this, ReactItem);

    _get(Object.getPrototypeOf(ReactItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ReactItem, _ReactBase);

  _createClass(ReactItem, [{
    key: 'update',
    value: function update(data) {
      this.store.setItems(data);
      this.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var item = this.props.item || this.props.params;
      if (!this.store) this.store = new _sailsStore.StoreItem({
        identity: this.identity,
        value: item,
        belongs: this.props.belongs
      });else this.store.startListening();
      this.store.on('update', this.update.bind(this));
      if (!item.createdAt) this.store.get();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.params) {
        this.store.setItems(this.props.params);
        delete this.props.params;
        this.store.get();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.store ? this.store.value : this.props.item;
      return _react2['default'].createElement(
        'li',
        { className: '{this.identity}-item' },
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
        this.props.buttons.map(function (icon, i) {
          return _react2['default'].createElement(ReactItemButton, { key: i, icon: icon, id: item.id });
        })
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
})(_baseJs.ReactBase);

exports.ReactItem = ReactItem;

ReactItem.propTypes = { item: _react2['default'].PropTypes.object };
ReactItem.defaultProps = { buttons: [] };