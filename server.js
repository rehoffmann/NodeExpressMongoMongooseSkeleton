const mongoose = require ('mongoose');


const dbConnectionUrl = "mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/databaseTest?retryWrites=true&w=majority";

mongoose.connect(dbConnectionUrl,  { useNewUrlParser: true })
    .then(() => {
        console.log('youre in')
    })
    .catch( err => console.error('failed to enter', err))

//Class
const newSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now}
});

const schemaModel = mongoose.model('collectionnamess', newSchema);

async function createTest(){
const instancename = new schemaModel({
    name: 'myname',
    author: 'myauthor',
    tags: ['tag1', 'tag2']
})

const result = await instancename.save();
console.log(result);
}

createTest();