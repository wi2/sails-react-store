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

var ReactItemButton = (function (_ReactBase) {
  function ReactItemButton() {
    _classCallCheck(this, ReactItemButton);

    _get(Object.getPrototypeOf(ReactItemButton.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ReactItemButton, _ReactBase);

  _createClass(ReactItemButton, [{
    key: 'handleEvent',
    value: function handleEvent(e) {
      e.preventDefault();
      this.props.fn(this.props.id);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'button',
        { onClick: this.handleEvent.bind(this) },
        this.props.name
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      fn: function fn() {}
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      name: _react2['default'].PropTypes.string.isRequired,
      fn: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return ReactItemButton;
})(_baseJs2['default']);

exports.ReactItemButton = ReactItemButton;

var ReactItemButtons = (function (_ReactBase2) {
  function ReactItemButtons() {
    _classCallCheck(this, ReactItemButtons);

    _get(Object.getPrototypeOf(ReactItemButtons.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ReactItemButtons, _ReactBase2);

  _createClass(ReactItemButtons, [{
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        null,
        this.props.items.map(function (icon, i) {
          return _react2['default'].createElement(ReactItemButton, { key: i, fn: icon.fn, name: icon.name, id: _this.props.id });
        })
      );
    }
  }], [{
    key: 'defaultProps',
    value: {
      items: [],
      max: 10
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      items: _react2['default'].PropTypes.array.isRequired,
      id: _react2['default'].PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  return ReactItemButtons;
})(_baseJs2['default']);

exports.ReactItemButtons = ReactItemButtons;