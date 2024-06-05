import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { Image } from "expo-image";
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import {Projects} from "@/constants/PlaceholderValues"

const ViewOrg = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, paddingBottom: 100 },
        ]}
      >
        <Text style={{marginBottom:5, fontSize: 24, fontWeight: "600" }}>
          Projects in [Organisation name]
        </Text>
        {Projects.map((project, i) => (
          <Link asChild href="/(authenticated)/profile/projects/1" key={i}>
            <TouchableOpacity
              style={{
                paddingTop: i == 0 ? 16 : 12,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: Colors.lightGray,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={project.image}
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {project.title}
                </Text>
                <Text
                  style={{ fontSize: 14, color: Colors.gray, marginTop: 4 }}
                >
                  {project.teamMembersGot}/{project.teamMembersNeeded} team
                  members
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={Colors.dark}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  )
}

export default ViewOrg;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 48,
  },
});