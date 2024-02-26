import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooksProvider";
import BookItem from "../components/BookItem";



const TopTab3 = () => {
  const { readBooks } = useMyBooks();
  return (
    <View style={styles.container}>
      <FlatList
        data={readBooks}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TopTab3;
