const cutString = text => {
  return text.replace(/^(.{11}[^\s]*).*/, '$1');
};

export default cutString;
