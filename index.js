const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
.then(()=> {
     console.log('mongo db ga ulandi');

})
.catch((err)=> {
    console.log("mongodbga ulanish vaqtida xatolik roy berdi",err)
});

const bookSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (val, callback) {
                setTimeout(() => {
                  return val && val.length > 0;
                    //  callback(result);

                }, 5000);
            },
            message: 'Kitobning kamida bitta tegi bo`lishi kerak'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 500,

        // get: val => Math.round(val),
        // set: val => Math.raund(val)    
    },
    category: {
        type: String,
        required: true,
        enum:['classic', 'biography', 'science'],
        lowercase: true,
        trim: true
    }

});

const Book = mongoose.model('Book', bookSchema);

async function creatbook() {
const book = new Book({
    name:'nodejs - to\'liq asoslari',
    author: 'farhod dadajonov',
    tags: ['Node js','dasturlash'],
    isPublished: true,
    price: 100,
    category: 'Science  '
});
try {

const savedBook = await book.save();
console.log(savedBook);
}

catch (ex) {
    console.log(ex);
}
}

 creatbook()
async function getBooks() {
    const books = await Book.find({
        author: 'farhod dadajonov',isPublished: true
    })
        .limit(2)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(books);
}

async function updatebook(id){
    const book = await Book.findById(id);
    if(!book)
    return;

    book.isPublished = true;
    book.author = 'farkhod';

    // book.set({
    //     isPublished:true;
    //     auther='Farkhod';
    // })

    const updatebook = await book.save();
    console.log(updatebook);
}

async function updatebook2(id) {
    const result = await Book.updateOne({_id: id},{
        $set: {
            author: 'Farkhod',
            isPublished: false
        }

    });

    console.log(result);

}

async function deletebook(id) {
   const result = await Book.findByIdAndRemove({_id: id});

   console.log(result);
}
// deletebook('638496f4ee54332fd1c1ac54');





