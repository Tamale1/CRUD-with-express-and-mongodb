console.error('fuck you');

const express =require('express')
const bodyParser =require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionstring =  "mongodb+srv://ynkoyoyo:tamale123@cluster0.z3ksazs.mongodb.net/?retryWrites=true&w=majority"


MongoClient.connect(connectionstring)
.then(client=>{
    console.log('conneted to the database')
    const db= client.db('You-quotes')
    const quotCollection = db.collection('quotes')
   app.set('view engin', 'ejs')
    app.use(bodyParser.urlencoded({extended:true})) //deperecated
    app.use(express.static('public'))
    app.use(bodyParser.json())
    
    app.get('/', (req, res)=> {
         quotCollection.find().toArray()
         .then(results=>{
            console.log(results)
            res.render('index.ejs',{quotes: results})
            
         })
         .catch(err=>{console.error(err);})
       
        // res.sendFile(__dirname + '/index.html')
        
    })
  
    app.post('/quotes',(req,res)=>{
        quotCollection.insertOne(req.body)
        .then(result =>{
            console.log(result)
            res.redirect('/')
        }).catch(err=>{
            console.error(err);
        })
    })
///update
   app.put('/quotes',(req,res)=>{
    quotCollection
  .findOneAndUpdate(
    { 
        name: "Joe Goldberg"},
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
        upsert: true,
      }
    )
    .then(result => {
        console.log(result)
        res.json('success')
       })
      .catch(error => console.error(error))

   })
///delete

app.delete('/quotes', (req, res) => {
    quotCollection
      .deleteOne({ name: req.body.name })
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Rhys Monteroe quote`)
      })
      .catch(error => console.error(error))
  })
   
 
  
  app.listen(4000,function () {
        console.log('listening at port 4000')
    })
}).catch(err=>console.error(err))


 




