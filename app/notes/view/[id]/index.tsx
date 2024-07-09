import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import NoteScreen from "@/screens/NoteScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "@/app-types";

const Index = () => {
  const { id } = useLocalSearchParams();
  const [note, setNote] = React.useState<Note | null>(null);

  const GetStorageNote = async () => {
    return await AsyncStorage.getItem("notes").then((res) => {
      if (!res) {
        return null;
      }
      return JSON.parse(res).find((note: Note) => note.id === id);
    });
  };

  useEffect(() => {
    GetStorageNote().then((res) => {
      setNote(res);
    });
  }, []);

  if (!note) {
    return <Text>Not found</Text>;
  }

  return <NoteScreen note={note} />;
};

export default Index;
