const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const args = require('minimist')(process.argv.slice(2));

app.use(bodyParser.json());
app.use(cors());

app.disable('etag');

app.get('/ping', (request, response) => {
    response.sendStatus('200');
});

var handler = (request, response) => {
  response.status(args.status ? args.status : 200);
  return response.send(args.body ? JSON.parse(args.body) : request.body);
};

app.get('/*', handler);
app.post('/*', handler);
app.put('/*', handler);
app.patch('/*', handler);
app.delete('/*', handler);

app.listen(args.port ? args.port : 8080, () => console.log('Webserver started successfully'));