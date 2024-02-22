import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client';


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
      <Text>Hello World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    title:{
        fontSize:25,
    }
})

export default TabOneScreen;

