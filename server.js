const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  const now = new Date().toString();
  const messageLog = `${ now }: ${ request.method } ${ request.url }`;

  console.log(messageLog);
  fs.appendFile('server.log', messageLog + '\n', (err) => {
    if (err) {
      console.error('Unable to append to server log.');
    }
  })

  next();
})
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'This is the welcome home message'
  })
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'There was an error'
  })
})

app.listen(3001, () => {
  console.log('Server is up on port 3001');
});