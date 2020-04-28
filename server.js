const mongoose = require ('mongoose');
const express = require ('express');
const testapi = require ('./routes/routes');
const app = express();

//store MongoDB cluster connection string, also set which database to use
const dbConnectionUrl = "mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/databaseName?retryWrites=true&w=majority";

mongoose.connect(dbConnectionUrl,  { useNewUrlParser: true })
    .then(() => {
        console.log('youre in')
    })
    .catch( err => console.error('failed to enter', err))

//define new Schema Class

app.use(express.json());
app.use('/api/testapi', testapi);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));