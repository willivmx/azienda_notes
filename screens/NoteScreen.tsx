import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { randomUUID } from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { Note } from "@/app-types";

const NoteScreen = ({ note }: { note?: Note }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [priority, setPriority] = useState(note?.priority || 1);

  const Note = {
    id: note?.id || randomUUID(),
    title: title,
    content: content,
    createdAt: new Date().toISOString(),
    priority: priority,
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 50,
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
          <TouchableOpacity
            style={{
              backgroundColor: "#3b3b3b",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={30} color={Colors.text} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {note && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#3b3b3b",
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  height: "100%",
                }}
                onPress={() => {
                  Alert.alert(
                    "Delete note",
                    "Are you sure you want to delete this note?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                          try {
                            const PreviousNotes = JSON.parse(
                              (await AsyncStorage.getItem("notes")) || "[]",
                            );
                            await AsyncStorage.setItem(
                              "notes",
                              JSON.stringify([
                                ...PreviousNotes.filter(
                                  (note: Note) => note.id !== Note.id,
                                ),
                              ]),
                            ).then(() =>
                              Toast.show("Note deleted", {
                                duration: Toast.durations.LONG,
                              }),
                            );
                            router.push("/");
                          } catch (e) {
                            Toast.show("Error deleting note", {
                              duration: Toast.durations.LONG,
                            });
                          }
                        },
                      },
                    ],
                  );
                }}
              >
                <Ionicons name="trash-outline" size={30} color={Colors.text} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#3b3b3b",
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "auto",
                height: "100%",
                opacity: !title ? 0.5 : 1,
              }}
              disabled={!title}
              onPress={() => {
                Alert.alert(
                  `${note ? "Update note" : "Create note"}`,
                  `Are you sure you want to ${note ? "update note" : "create note"} this note?`,
                  [
                    {
                      text: "Cancel",
                      style: "destructive",
                    },
                    {
                      text: `${note ? "Update" : "Create"}`,
                      style: "default",
                      onPress: async () => {
                        try {
                          const PreviousNotes = JSON.parse(
                            (await AsyncStorage.getItem("notes")) || "[]",
                          );

                          const note_exists =
                            !!note &&
                            PreviousNotes.length > 0 &&
                            PreviousNotes.find(
                              (note: Note) => note.id === Note.id,
                            );

                          await AsyncStorage.setItem(
                            "notes",
                            JSON.stringify([
                              Note,
                              ...(note_exists
                                ? PreviousNotes.filter(
                                    (note: Note) => note.id !== Note.id,
                                  )
                                : PreviousNotes),
                            ]),
                          ).then(() =>
                            Toast.show(
                              note_exists ? "Note updated" : "Note saved",
                              {
                                duration: Toast.durations.LONG,
                              },
                            ),
                          );

                          router.push("/");
                        } catch (e) {
                          Toast.show("Error saving note", {
                            duration: Toast.durations.LONG,
                          });
                        }
                      },
                    },
                  ],
                );
              }}
            >
              <FontAwesome5 name="save" size={30} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <TextInput
            placeholder={"Title"}
            multiline={true}
            onChangeText={setTitle}
            value={title}
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: Colors.text,
              lineHeight: 60,
            }}
          />
          <TextInput
            placeholder={"Type something..."}
            multiline={true}
            onChangeText={setContent}
            value={content}
            style={{
              fontSize: 20,
              color: Colors.text,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NoteScreen;
