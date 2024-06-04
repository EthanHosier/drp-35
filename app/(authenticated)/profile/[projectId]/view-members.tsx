import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/DefaultStyles";

type Members = {
  id: number;
  name: string;
  image: string;
};

const MEMBERS: Members[] = [
  {
    id: 1,
    name: "You",
    image:
      "https://avatars.githubusercontent.com/u/80335311?s=400&u=e3ffb939cb151c470f31de4b85cff93dfaa6f4b0&v=4",
  },
  {
    id: 2,
    name: "John Doe",
    image:
      "https://imagenes.elpais.com/resizer/v2/PYUQSPU2HRDB7PFG7BEEZ232VE.jpg?auth=a6f5e6b73ba56ad5f15cba89e5b76608af4e809eb145a3b7bda42709d820cd58&width=414",
  },
  {
    id: 3,
    name: "Jane Smith",
    image:
      "https://www.usatoday.com/gcdn/-mm-/2dc66323a8a0797d363207d2b3a39f44cf6947ba/c=150-0-1200-1400/local/-/media/2017/01/19/USATODAY/USATODAY/636204062074628434-AFP-552692014.jpg?width=660&height=880&fit=crop&format=pjpg&auto=webp",
  },
];

type InterestedInGroup = {
  image: string;
};
const INTERESTED_IN_GROUP: InterestedInGroup[] = [
  {
    image:
      "https://api.time.com/wp-content/uploads/2017/03/donald-trump-lede.jpg",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNWPhXbh68-pBV7iNSR76TAgOVQRSqkuogA&s",
  },
];

const ViewMembers = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        position: "relative",
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ alignSelf: "center", fontSize: 16 }}>
          You currently have <Text style={{ fontWeight: "700" }}>3/4</Text>{" "}
          members
        </Text>
        <View
          style={{
            marginTop: 32,
            gap: 12,
            borderBottomColor: Colors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 16,
          }}
        >
          {MEMBERS.map((member, i) => (
            <Link href={"#"} asChild key={i}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={member.image}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
                <Text
                  style={{ marginLeft: 24, fontWeight: "600", fontSize: 16 }}
                >
                  {member.name}
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.dark}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
        {INTERESTED_IN_GROUP.length > 0 && (
          <Link href={"#"} asChild style={{ marginTop: 16 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {INTERESTED_IN_GROUP.slice(0, 2).map((e, index) => (
                <Image
                  key={index}
                  source={e.image}
                  style={[
                    { width: 80, height: 80, borderRadius: 40 },
                    index == 0 && {
                      marginRight: -64,
                      zIndex: 100,
                      borderColor: Colors.background,
                      borderWidth: 2,
                    },
                  ]}
                />
              ))}
              <View
                style={{
                  width: 24,
                  height: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: 12,
                  marginTop: -48,
                  marginLeft: -18,
                }}
              >
                <Text style={{ color: Colors.background }}>
                  {INTERESTED_IN_GROUP.length}
                </Text>
              </View>
              <Text style={{ marginLeft: 8, fontWeight: "600", fontSize: 14 }}>
                Interested in your group
              </Text>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={Colors.dark}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </Link>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => console.log("yeahh")}
        style={[
          defaultStyles.pillButton,
          {
            backgroundColor: Colors.primary,
            position: "absolute",
            bottom: 32,
            alignSelf: "center",
            width: "90%",
            zIndex: 100,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            color: Colors.background,
          }}
        >
          Search for Group Members
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewMembers;

const styles = StyleSheet.create({});
