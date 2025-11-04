import { book } from "../models/book.js";

// create book
export const createBook = async (req, res) => {
  try {
    console.log(req.body);
    const { title, author, genre, price, instock } = req.body;

    const newBook = await new book({
      title,
      author,
      genre,
      price,
      instock,
    }).save();
    res.status(201).json({ message: "Book Created Successfully", newBook });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// get all books
export const getAllBooks = async(req,res)=>{
    try {
        const users = await book.find();
        res.status(200).json({users})
    } catch (error) {
        res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
    }
}

// get book by id
export const getBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const exists = await book.findById({_id : id});
    if(!exists){
        return res.status(404).json({message : "Book Not Found"})
    }
    res.status(200).json({exists})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error",error:error.message})
  }
};

// update book
export const updateBook = async(req,res)=>{
    try {
        const id  = req.params.id;

        const update = await book.findByIdAndUpdate({_id: id},req.body,{new : true});
        res.status(200).json({message : "Book Updated Successfully",update})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error",error : "error.message"})
    }
}

//delete book
export const deleteBook = async(req,res)=>{
    try {
        const id  = req.params.id;
        const deleted = await book.findByIdAndDelete({_id: id},req.body,{new : true});
        res.status(200).json({message : "Book Deleted Successfully",deleted})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error",error : "error.message"})
    }
}
