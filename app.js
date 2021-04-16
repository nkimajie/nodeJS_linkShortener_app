const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Shorturls = require('./models/shorturls')
const app  = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = require('./util/database');

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shorturls = await Shorturls.findAll();
    res.render('index',  { shorturls: shorturls });
})

app.post('/shorturls', async (req, res) => {
    await Shorturls.create({ full: req.body.fullUrl })
        .then(result => {
            console.log('link added successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/:data', async(req, res) => {
    const shorturl = await Shorturls.findOne({ where: {short: req.params.data} })

    if(shorturl == null) return res.send(404);

    shorturl.clicks++
    shorturl.save()

    res.redirect(shorturl.full);
})

sequelize.sync()
// sequelize.sync({ force: true })
    .then(link => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
// app.listen(process.env.PORT || 3000, () => console.log('Server started on http://localhost:3000'));