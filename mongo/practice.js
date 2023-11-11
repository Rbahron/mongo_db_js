const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/practice',{ useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('mongoga ulanish hosil qilindi...'))
  .catch((err) => console.error('Mongoga ulanish vaqtida xatolik roy berdi'));


const Author = mongoose.model('Author', new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String

}));

const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));
     
async function createAuthor(firstName,lastName,email) {
    const author = new Author({
        firstName,
        lastName,
        email
    });

    const result = await author.save();
    console.log(result);
}

async function creatBook (title, authorid) {
    const book = new Book({
        title: title,
        author: authorid
    })
const result = await book.save();
console.log(result);
} 

async function listBooks() {
     const book = await  Book
       .find()
       .populate('author', 'firstName -_id')
       .select('title author');
    console.log(book);
}

// createAuthor('bahron', 'ramazonov', 'mongodbpractise' );

// creatBook('nodejs darslari', '63cd4bb562945616bc92c65a');

listBooks();