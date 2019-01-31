export default (res, data) => {
  res.statusCode = 222;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
  res.end();
};
