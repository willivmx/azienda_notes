import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Feather, Entypo } from "@expo/vector-icons";
import NoteCard from "@/components/NoteCard";
import { Note } from "@/app-types";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const numColumns = 2;
  const gap = 10;

  const [storageNotes, setStorageNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleGetStorageNotes = async () => {
    await AsyncStorage.getItem("notes").then((value) => {
      if (value) {
        setStorageNotes(JSON.parse(value));
        setNotes(JSON.parse(value));
      }
    });
  };

  useEffect(() => {
    if (search.length > 0) {
      setNotes(
        storageNotes.filter(
          (note) =>
            note.title.includes(search) || note.content.includes(search),
        ),
      );
    } else {
      handleGetStorageNotes();
    }
  }, [search]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: 400, fontSize: 40, color: Colors.text }}>
            Azienda Notes
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "#3b3b3b",
          }}
        >
          <View
            style={{
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
              height: "100%",
            }}
          >
            <Feather name="search" size={20} color={Colors.text} />
          </View>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={{
              fontSize: 18,
              color: Colors.text,
              paddingLeft: 10,
              paddingRight: 15,
              flex: 1,
              height: "100%",
            }}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          data={notes}
          renderItem={({ item }) => (
            <NoteCard numColumns={numColumns} gap={gap} note={item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap, paddingTop: 30 }}
          columnWrapperStyle={{ gap }}
          ListEmptyComponent={
            <View
              style={{
                height: "100%",
                width: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: `${search.length > 0 ? 10 : 80}%`,
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontSize: search.length > 0 ? 16 : 24,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {search.length > 0
                  ? `No result for "${search}"`
                  : "No notes found"}
              </Text>
            </View>
          }
        />
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          bottom: 55,
          backgroundColor: "#3b3b3b",
          padding: 15,
          borderRadius: 90,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
        onPress={() => router.push("/notes/new")}
      >
        <Entypo name="plus" size={40} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
