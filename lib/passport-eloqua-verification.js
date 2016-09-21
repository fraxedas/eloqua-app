/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
var util = require('util');
var eloqua = require('eloqua-oauth').verification;


/**
 * `Strategy` constructor.
 *
 */
function Strategy(options) {
  options = options || {};
  if (!options.client_id) { throw new TypeError('EloquaStrategy requires an options.client_id'); }
  if (!options.client_secret) { throw new TypeError('EloquaStrategy requires an options.client_secret'); }

  passport.Strategy.call(this);

  this.name = 'passport-eloqua-verification';
  this._cliet_id = options.client_id;
  this._client_secret = options.client_secret;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
  options = options || {};

  var url = 'https://' + req.get('host') + req.originalUrl;
  var method = req.method;

  var self = this;
  
  try {
    if (eloqua.verify(url, method, this._cliet_id, this._client_secret)) {
      self.success(this._cliet_id);
    }
    else {
      return self.error({ message : "Oauth verification failed on " + url});
    }
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;