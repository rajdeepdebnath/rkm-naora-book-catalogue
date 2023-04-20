import { collection, getDocs } from "firebase/firestore";
import { database } from './firebase';
import { Book } from "./src/types/book";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { SignIn } from "./src/types/signIn";

const bookCatalogRef = collection(database, "book-catalog");

export const getAllBooks = async () => {
  let snapshot = await getDocs(bookCatalogRef);
  
  let allBooks:Book[] = [];
  snapshot.forEach(book => {
    let bookData = book.data();
    let b:Book = {
      id: book.id, 
      Name: bookData.Name,
      Author: bookData.Author
    };
    allBooks.push(b);
  });

  return allBooks;
};


export const signIn = async ({email,password}:SignIn) => {
  const auth = getAuth();
  let credential = await signInWithEmailAndPassword(auth, email, password);

  return credential.user;
};

export const logOut = async () => {
  const auth = getAuth();
  await signOut(auth);
  return;
}