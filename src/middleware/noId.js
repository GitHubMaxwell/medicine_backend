export default res => {
  res.statusCode = 404;
  res.statusMessage = 'No ID';
  // res.setHeader('Content-Type', 'application/json');
  res.end();
};
