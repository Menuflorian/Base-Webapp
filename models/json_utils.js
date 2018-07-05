var express = require('express');
var router = express.Router();

function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}
  return null;
}

module.exports.safeJSONParse = tryParseJSON;

encode = module.exports.encodeJSON = function(obj) {
  obj = JSON.stringify(obj);
  return encodeURI(obj);
};

decode = module.exports.decodeJSON = function(obj) {
  obj = decodeURI(obj);
  return tryParseJSON(obj);
};
