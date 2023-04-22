import { QueryFieldFilterConstraint, addDoc, collection, deleteDoc, doc, getDocs, limit, or, query, setDoc, where } from "firebase/firestore";
import { database } from './firebase';
import { Book } from "./src/types/book";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { SignIn } from "./src/types/signIn";

const collectionName = import.meta.env.VITE_APP_ENV === "prod" 
? "book-catalog" :  "book-catalog_test";
const bookCatalogRef = collection(database, collectionName);

export const getAllBooks = async () => {
  let snapshot = await getDocs(bookCatalogRef);
  
  let allBooks:Book[] = [];
  snapshot.forEach(book => {
    let bookData = book.data();
    let b:Book = {
      id: book.id, 
      Name: bookData.Name,
      Author: bookData.Author,
      created_date:bookData.created_date
    };
    allBooks.push(b);
  });

  return allBooks;
};

export const searchBooks = async (searchText:string) => {

  const searchConstraints: Array<QueryFieldFilterConstraint> = [];
  
  Object.keys(triGram(searchText)).forEach(key => searchConstraints.push(where(`${key}`, '==', true)));


  let constraints = [
    // where('Name', '==', searchText),
    // where('Author', '==', searchText),
    ...searchConstraints,
    limit(10)
  ];
  
  const q = query(bookCatalogRef, ...constraints);
  
  
  let snapshot = await getDocs(q);
  
  let allBooks:Book[] = [];
  snapshot.forEach(book => {
    let bookData = book.data();
    let b:Book = {
      id: book.id, 
      Name: bookData.Name,
      Author: bookData.Author,
      created_date:bookData.created_date
    };
    allBooks.push(b);
  });

  return allBooks;
};

export const addBook = async (data:Book) => {
  try {
    let docRef = await addDoc(bookCatalogRef, 
      {...data, ...triGram([data.Name || '', data.Author || ''].join(' ').slice(0, 500))});
    return Boolean(docRef);
  }catch (error) {
    console.log(error);
    return null;
  }
}

export const updateBook = async (data:Book) => {
  try {
    const frankDocRef = doc(bookCatalogRef, data.id);
    await setDoc(frankDocRef, data);
    return true;
  }catch (error) {
    console.log(error);
    
    return null;
  }
}

export const deleteBook = async (id:string) => {
  try {
    await deleteDoc(doc(bookCatalogRef, id));
    return true;
  }catch (error) {
    console.log(error);
    return null;
  }
}


export const signIn = async ({email,password}:SignIn) => {
  try {
    const auth = getAuth();
    let credential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isLoggedIn', Boolean(credential.user).toString());
  
    return credential.user;
  } catch (error) {
    return null;
  }
};

export const logOut = async () => {
  const auth = getAuth();
  await signOut(auth);
  localStorage.removeItem('isLoggedIn');
  return;
}


// interface TriGramProps {

// }
const triGram = (txt:string) => {
  const map = {};
  const s1 = (txt || '').toLowerCase();
  const n = 3;
  for (let k = 0; k <= s1.length - n; k++) map[s1.substring(k, k + n)] = true;
  
  return map;
};