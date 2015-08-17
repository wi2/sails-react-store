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

var _collectionItemJs = require('./collection-item.js');

var _collectionItemJs2 = _interopRequireDefault(_collectionItemJs);

var _sailsStore = require('sails-store');

var ReactCollection = (function (_ReactBase) {
  function ReactCollection() {
    _classCallCheck(this, ReactCollection);

    _get(Object.getPrototypeOf(ReactCollection.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      items: this.props.items
    };
  }

  _inherits(ReactCollection, _ReactBase);

  _createClass(ReactCollection, [{
    key: 'update',
    value: function update(data) {
      this.store.maj(data);
      this.setState({ items: data });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.store = new _sailsStore.StoreCollection({
        identity: this.props.identity
      });

      this.store.get();
      //
      this.store.on('add', this.update.bind(this));
      this.store.on('remove', this.update.bind(this));
      this.store.on('update', this.update.bind(this));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return props !== state;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var Item = this.reactItem || _collectionItemJs2['default'];
      var items = this.store ? this.store.value : this.props.items;
      return _react2['default'].createElement(
        'ul',
        { className: this.props.identity + '-list' },
        items.map(function (item, i) {
          return _react2['default'].createElement(Item, { identity: _this.props.identity, key: i, item: item, buttons: _this.props.buttons, belongs: _this.belongs });
        })
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      items: [],
      buttons: [],
      max: 10
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      items: _react2['default'].PropTypes.array.isRequired,
      max: _react2['default'].PropTypes.number.isRequired,
      buttons: _react2['default'].PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return ReactCollection;
})(_baseJs2['default']);

exports['default'] = ReactCollection;
module.exports = exports['default'];