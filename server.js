import corsAnywhere from 'cors-anywhere';

const host = '0.0.0.0';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [],
}).listen(port, host, () => {
  console.log(`CORS Anywhere proxy corriendo en http://${host}:${port}`);
});
