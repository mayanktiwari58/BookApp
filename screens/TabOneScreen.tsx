import { ActivityIndicator, StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import BookItem from '../components/BookItem';


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
    const { data, loading, error } = useQuery(query, {
        variables: { q: 'React Native'},
      });

      console.log(data);
      console.log(loading);
      console.log(error);
  return (
    <View style={styles.container}>
        {loading && <ActivityIndicator/>}
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
        image: item.volumeInfo.imageLinks.thumbnail,
        authors: item.volumeInfo.authors,
        isbn: "",
      }}
    />
  )}
  showsVerticalScrollIndicator={false}
/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
       
    },
    title:{
        fontSize:25,
    }
})

export default TabOneScreen;

