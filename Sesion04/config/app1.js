var express = require('express');
var app = express();
app.use(express.json());

const gods = { 
    Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
    Hades : { live : 'Underworld', symbol: 'Cornucopia' } 
};

app.get('/gods', (req, res, next) => {
    const page = parseInt(req.query.page || '1');
    console.log(page);
    res.json(gods);
});

app.get('/gods/:name', (req, res, next) => {
    const god = gods[req.params.name];
    if (god) {
      res.send(god);
    } else {
      res.status(404).send('God Not Found');
    }
});

app.put('/gods/:name', (req,res) => {
    const god = req.body;
    console.log(req.body);
    gods[req.params.name] = god
    res.send(god);
})

app.post('/gods', (req, res) => {
    const name = req.query.name
    const newGod = req.body;
    gods[name] = newGod;
    res.status(201).send(gods);
})

app.delete('/gods/:name', (req, res) =>{
    const name = req.params.name;
    if (name in gods){
      delete gods[name];
      res.send(gods);
    } else {
        res.status(404).send('God Not Found');
    }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});