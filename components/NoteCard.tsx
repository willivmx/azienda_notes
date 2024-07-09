import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Note } from "@/app-types";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const NoteCard = ({
  note,
  gap,
  numColumns,
}: {
  note: Note;
  gap: number;
  numColumns: number;
}) => {
  const screenWidth = Dimensions.get("window").width;
  const availableSpace = screenWidth - (numColumns - 1) * gap;
  const itemSize = availableSpace / numColumns - 20;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/notes/view/${note.id}`)}
      style={{
        backgroundColor: Colors.card,
        width: itemSize,
        height: itemSize,
        padding: 12,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        <Text numberOfLines={2} style={{ fontSize: 20, fontWeight: 600 }}>
          {note.title}
        </Text>
        <Text numberOfLines={3} style={{ fontSize: 15 }}>
          {note.content}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 14, color: "#3b3b3b" }}>
          {format(new Date(), "MMM dd, yyyy")}
        </Text>
        <Text style={{ color: "#F45B69" }}>
          {Array(note.priority)
            .fill(0)
            .map((_, index) => "+")
            .join("")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteCard;
