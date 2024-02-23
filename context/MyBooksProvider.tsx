import { StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";
import { createContext, useContext, ReactNode, useState } from "react";

type MyBooksContextType = {
  onToggleSaved: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  savedBooks: Book[];
};

type Props = {
  children: ReactNode;
};

const MyBooksContext = createContext<MyBooksContextType>({
    onToggleSaved: () => {},
    isBookSaved: () => false,
    savedBooks: [],
});

const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const areBooksTheSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isBookSaved = (book: Book) => {
    return savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
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

  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;

const styles = StyleSheet.create({});
