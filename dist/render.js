'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPath = _path2.default.resolve(process.cwd(), 'template');

/**
 * Create env of Nunjuck for template render
 * @param {Object} options options for Nunjuck env
 */
function createEnv(options) {
  var _options$autoescape = options.autoescape,
      autoescape = _options$autoescape === undefined ? true : _options$autoescape,
      _options$noCache = options.noCache,
      noCache = _options$noCache === undefined ? false : _options$noCache,
      _options$watch = options.watch,
      watch = _options$watch === undefined ? false : _options$watch,
      _options$throwOnUndef = options.throwOnUndefined,
      throwOnUndefined = _options$throwOnUndef === undefined ? false : _options$throwOnUndef,
      _options$filters = options.filters,
      filters = _options$filters === undefined ? {} : _options$filters;


  var env = new _nunjucks2.default.Environment(new _nunjucks2.default.FileSystemLoader(viewPath, { noCache: noCache, watch: watch }), { autoescape: autoescape, throwOnUndefined: throwOnUndefined });

  // Add template filter to env.
  (0, _keys2.default)(filters).forEach(function (name) {
    env.addFilter(name, filters[name]);
  });
  return env;
}

var ViewRender = function () {
  function ViewRender() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ViewRender);
    var _options$global = options.global,
        global = _options$global === undefined ? {} : _options$global;

    this.options = options;
    this.env = createEnv(options);
    (0, _keys2.default)(global).forEach(function (name) {
      _this.env.addGlobal(name, global[name]);
    });
  }

  (0, _createClass3.default)(ViewRender, [{
    key: 'render',
    value: function render(view, data, callback) {
      var _options$ext = this.options.ext,
          ext = _options$ext === undefined ? '.njk' : _options$ext;

      return this.env.render('' + view + ext, (0, _extends3.default)({}, data), callback);
    }
  }]);
  return ViewRender;
}();

exports.default = ViewRender;