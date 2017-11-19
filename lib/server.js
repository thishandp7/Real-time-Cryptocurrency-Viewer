import express from 'express';
import config from './config';
import serverRender from './serverRender';

const app = express();


app.use(express.static('public'));

app.listen(config.port, function listenHandler() {
  console.info(`Running on Port ${config.port}`);
});


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  const content = serverRender();
  res.render('index', { initalContent: content });
});
