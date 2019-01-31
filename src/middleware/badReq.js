export default res => {
  res.statusCode = 400;
  res.statusMessage = 'bad request';
  res.end();
};
