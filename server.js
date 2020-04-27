const mongoose = require ('mongoose');

//store MongoDB cluster connection string, also set which database to use
const dbConnectionUrl = "mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/databaseName?retryWrites=true&w=majority";

mongoose.connect(dbConnectionUrl,  { useNewUrlParser: true })
    .then(() => {
        console.log('youre in')
    })
    .catch( err => console.error('failed to enter', err))

//define new Schema Class
const newSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now}
});

//create model for Schema, determine which collection to store it in
const schemaModel = mongoose.model('collectionName', newSchema);

async function createTest(){
const instancename = new schemaModel({
    name: 'myname2',
    author: 'myauthor2',
    tags: ['tag1', 'tag2']
})

const result = await instancename.save();
console.log(result);
}

async function getData(){
    //find all documents for class, can add query filters/regular expressions
    const data = await schemaModel.find();
    console.log(data);
}

//for updating by id
async function updateData(id){
    const data = await schemaModel.findById(id);
    if (!data) return;

    data.name = 'updatedName';

    const result = await data.save();
    console.log(result);

}

//for updating documents directly in database
//first argument is query/filter object, second argument is update object (needs mongo update operator)
async function updateMany(id){
    const data = await schemaModel.update({_id: id}, {
        $set : {
            name: 'updatedName2'
        }
    });
    console.log(data);
}
//there is also a third update method that combines both, findbyidandupdate

//delete from database
//can also use deleteOne or deleteMany, not sure what the differences are
async function removeData(id){
    const result = await schemaModel.findByIdAndRemove(id);
    console.log(result);
}

//updateMany('5ea63bbfba46fc47142599b0');