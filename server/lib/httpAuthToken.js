function httpAuthToken(value) {
  if (!value) {
    return;
  }

  var tokenMatcher = /Token token="(.+)"/;
  var matched = value.match(tokenMatcher);
  if (matched) {
    return matched[1];
  }
}

module.exports = httpAuthToken;
