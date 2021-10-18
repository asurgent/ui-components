const prevent = (fn) => (e) => {
  if (e && e.preventDefault && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  if (e && e.stopPropagation && typeof e.preventDefault === 'function') {
    e.stopPropagation();
  }

  fn(e);
};

export default prevent;
