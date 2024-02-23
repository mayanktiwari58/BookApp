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
import { gql, useQuery,useLazyQuery } from "@apollo/client";
import BookItem from "../components/BookItem";

const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;

const TabOneScreen = () => {
  const [search, setSearch] = useState("");
  const [runQuery, { data, loading, error }] = useLazyQuery(query);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="search..."
          style={styles.input}
        />
        <Button title="search" onPress={()=>runQuery({variables:{q:search}})} />
      </View>
      {loading && <ActivityIndicator />}
      {error && (
        <View style={styles.container}>
          <Text style={styles.title}>Error fetching books</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={data?.googleBooksSearch?.items || []}
        renderItem={({ item }) => (
          <BookItem
            book={{
              title: item.volumeInfo.title,
              image: item.volumeInfo.imageLinks?.thumbnail,
              authors: item.volumeInfo.authors,
              isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
            }}
          />
        )}
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
    padding: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    marginVertical: 5,
    borderColor: "#808080",
  },
});

export default TabOneScreen;
