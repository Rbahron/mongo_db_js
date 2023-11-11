const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/practice2',{ useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('mongoga ulanish hosil qilindi...'))
  .catch((err) => console.error('Mongoga ulanish vaqtida xatolik roy berdi'));


const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
 
 });

  const bookSchema =  new mongoose.Schema({
    title: String,
    authors: {
        type: [authorSchema],
        required: true
    }
});


const Author = mongoose.model('Author', authorSchema );
const Book = mongoose.model('Book', bookSchema);
     


async function creatBook (title, authors) {
    const book = new Book({
        title,
        authors: authors
    })
const result = await book.save();
console.log(result);
} 

creatBook('mongodb practise',[
 new Author({
    firstName: 'bahron',
    lastName: 'korvonogli',
    email: 'ramazonovbahron1997@gmil.com'

 }),
 new Author({
    firstName: 'bahron',
    lastName: 'korvonogli',
    email: 'ramazonovbahron1997@gmil.com'

 })
]
)

// async function updateAuthor(bookId) {
//     await Book.updateOne({_id: bookId},{
//         $set: {
//             'author.firstName': 'bahronjon'
//         }
//     });
// }


// updateAuthor('63cd5a21c9ef230238842948')