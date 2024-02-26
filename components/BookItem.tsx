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
          style={[
            styles.button,
            saved || currentSaved || readSaved
              ? { backgroundColor: "lightgray" }
              : {},
          ]}
          onPress={() => {
            showMyModal();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              saved || currentSaved || readSaved ? { color: "#FF0000" } : {},
            ]}
          >
            {saved || currentSaved || readSaved ? "Remove" : "Add Books"}
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
          <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.addBooksText}>Add Books</Text>
              <Pressable onPress={hideMyModal}>
                <Image
                  source={require("../../../BookApp/assets/cross.png")}
                  style={styles.crossIcon}
                />
              </Pressable>
            </View>
            <Text
              style={[
                styles.SaveText,
                saved
                  ? { color: "red",borderColor:"red",}
                  : { color: "#1fd655"},
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
                currentSaved
                  ? { color: "red",borderColor:"red",}
                  : { color: "#1fd655"},
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
                readSaved
                  ? { color: "red",borderColor:"red",}
                  : { color: "#1fd655" },
              ]}
              onPress={() => {
                onToggleReadSaved(book);
                hideMyModal();
              }}
            >
              {readSaved ? "Remove" : "Already read"}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
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
    flex: 1,
    height: "140%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  addBooksText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  crossIcon: {
    width: 24,
    height: 24,
  },

  SaveText: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-start",
    color:"black",
    margin: 5,
    fontWeight: "bold",
    borderColor:"#1fd655",
  },
});

export default BookItem;
