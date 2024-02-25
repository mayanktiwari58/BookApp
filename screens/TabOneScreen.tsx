import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import {useLazyQuery } from "@apollo/client";
import BookItem from "../components/BookItem";
import { SearchQuery } from "./queries";
import { parseBook } from "../services/bookService";

const TabOneScreen = () => {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(SearchQuery);
 
  //  console.log(data?.googleBooksSearch?.items[0]?.volumeInfo?.title);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="search..."
          style={styles.input}
        />
        <Button
          title="search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>

      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBooksSearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("googleBooksSearch")}
        >
          Google Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && (
        <View style={styles.container}>
          <Text style={styles.title}>Error fetching books</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={
          provider === "googleBooksSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch?.docs || []
        }
        renderItem={({ item }) => <BookItem book={parseBook(item, provider)}  />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 5,
    marginVertical: 5,
    borderColor: "#808080",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  },
});

export default TabOneScreen;
