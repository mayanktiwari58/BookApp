import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Button,
} from "react-native";
import { useMyBooks } from "../context/MyBooksProvider";


type BookItemProps = {
  book: Book;
};

const BookItem = ({ book }: BookItemProps) => {
  const {
    onToggleSaved,
    onToggleCurrentSaved,
    onToggleReadSaved,
    isBookSaved,
    isCurrentBookSaved,
    isReadBookSaved,
  } = useMyBooks();
  const saved = isBookSaved(book);
  const currentSaved = isCurrentBookSaved(book);
  const readSaved = isReadBookSaved(book);
  const [isModalVisible, setModalVisible] = useState(false);
 

  const showMyModal = () => {
    setModalVisible(true);
  };
  const hideMyModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>{book.authors}</Text>
        <Pressable
          style={[styles.button, saved ? { backgroundColor: "lightgray" } : {}]}
          onPress={() => {
            
            showMyModal();
          }}
        >
          <Text style={[styles.buttonText, saved ? { color: "#FF0000" } : {}]}>
            {saved ? "Remove" : "Want to Read"}
          </Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideMyModal}
      >
        <View style={styles.modalContainer}>
          <Text
            style={[
              styles.SaveText,
              saved ? { color: "red" } : { color: "black" },
            ]}
            onPress={() => {
              onToggleSaved(book);
              
              
              hideMyModal();
            }}
          >
            {saved ? "Remove" : "Want to Read"}
          </Text>
          <Text
            style={[
              styles.SaveText,
              currentSaved ? { color: "red" } : { color: "black" },
            ]}
            onPress={() => {
              onToggleCurrentSaved(book);
             
              hideMyModal();
            }}
          >
            {currentSaved ? "Remove" : " Currently Reading"}
          </Text>
          <Text
            style={[
              styles.SaveText,
              readSaved ? { color: "red" } : { color: "black" },
            ]}
            onPress={() => {
              onToggleReadSaved(book);
             
              hideMyModal();
            }}
          >
            {readSaved ? "Remove" : "Already read"}
          </Text>
          <Button title="Close" onPress={hideMyModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    shadowColor: 'black',
   
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#1fd655",
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    flex:1,
    padding:10,
    justifyContent:"space-between",
    alignItems:"flex-start",
    backgroundColor: "#fff",
    marginTop: "140%",
   
   
  },
  SaveText: {
    
    backgroundColor: "#1fd655",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf:"flex-start",
   
  },
});

export default BookItem;
