const formidable = jest.fn().mockImplementation(() => {
   this.parse = jest.fn();
   return this;
});

module.exports = formidable;
