import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { createContext, useContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MyBooksContextType = {
  onToggleSaved: (book: Book) => void;
  onToggleCurrentSaved: (book: Book) => void;
  onToggleReadSaved: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  isCurrentBookSaved: (book: Book) => boolean;
  isReadBookSaved: (book: Book) => boolean;
  savedBooks: Book[];
  currentBooks: Book[];
  readBooks: Book[];
};

type Props = {
  children: ReactNode;
};

const MyBooksContext = createContext<MyBooksContextType>({
  onToggleSaved: () => {},
  onToggleCurrentSaved: () => {},
  onToggleReadSaved: () => {},
  isBookSaved: () => false,
  isCurrentBookSaved: () => false,
  isReadBookSaved: () => false,
  savedBooks: [],
  currentBooks: [],
  readBooks: [],
});

const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []); // load data when component mount

  useEffect(() => {
    if (loaded) {
      persistData('booksData', savedBooks);
      persistData('currentBooksData', currentBooks);
      persistData('readBooksData', readBooks);
    }
  },  [savedBooks, currentBooks, readBooks]); // persist data every time it changes

  const areBooksTheSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isBookSaved = (book: Book) => {
    
    return Array.isArray(savedBooks) && savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
  };
  
  const isCurrentBookSaved = (book: Book) => {
   
    return Array.isArray(currentBooks) && currentBooks.some((currentBook) => areBooksTheSame(currentBook, book));
  };
  
  const isReadBookSaved = (book: Book) => {
    return Array.isArray(readBooks) && readBooks.some((readBook) => areBooksTheSame(readBook, book));
  };

  const onToggleSaved = (book: Book) => {
    if (isBookSaved(book)) {
      // remove from saved
      setSavedBooks((books) =>
        books.filter((savedBook) => !areBooksTheSame(savedBook, book))
      );
    } else {
      // add to saved
      setSavedBooks((books) => [book, ...books]);
    }
  };
  const onToggleCurrentSaved = (book: Book) => {
    if (isCurrentBookSaved(book)) {
      // remove from saved
      setCurrentBooks((books) =>
        books.filter((savedBook) => !areBooksTheSame(savedBook, book))
      );
    } else {
      // add to saved
      setCurrentBooks((books) => [book, ...books]);
    }
  };
  const onToggleReadSaved = (book: Book) => {
    if (isReadBookSaved(book)) {
      // remove from saved
      setReadBooks((books) =>
        books.filter((savedBook) => !areBooksTheSame(savedBook, book))
      );
    } else {
      // add to saved
      setReadBooks((books) => [book, ...books]);
    }
  };

  const persistData = async (key: string, data: Book[]) => {
    try {
      // write data to local storage
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error persisting data:', error);
    }
  };

  const loadData = async () => {
    try {
      // read data from local storage
      const keys = await AsyncStorage.getAllKeys();
      const savedData = await AsyncStorage.multiGet(keys);
      
      savedData.forEach((key:any, value:any) => {
        if (key === 'booksData') {
          setSavedBooks(JSON.parse(value));
        } else if (key === 'currentBooksData') {
          setCurrentBooks(JSON.parse(value));
        } else if (key === 'readBooksData') {
          setReadBooks(JSON.parse(value));
        }
      });
  
      setLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <MyBooksContext.Provider value={{ onToggleSaved,onToggleCurrentSaved,onToggleReadSaved,
     isBookSaved,isCurrentBookSaved,isReadBookSaved, savedBooks,currentBooks,readBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;

const styles = StyleSheet.create({});
