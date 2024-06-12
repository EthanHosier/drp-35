import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import {useLocalSearchParams} from "expo-router";
import {getProfilePicUrl} from "@/utils/api/profile-pics";
import {getProfileByUserId} from "@/utils/api/profiles";
import {ScrollView} from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import StarRating from "react-native-star-rating-widget";

const TEXT_FIELDS = [
  "Communication",
  "Participation",
  "Time Management",
  "Contribution",
];

const ReviewMember = () => {

  const userId = useLocalSearchParams().profileId as string;
  const { data: image } = getProfilePicUrl(userId);
  const [fullName, setFullName] = useState<string | null>(null);

  const [ratings, setRatings] = useState({
    communication: 0,
    participation: 0,
    timeManagement: 0,
    contribution: 0,
  });

  useEffect(() => {
    getProfileByUserId(userId).then((response) => {
      if (!response.error) setFullName(response.data.full_name)
    })}, []);

  return (
      <ScrollView style={styles.container}>
        <Image
            source={{
              uri: image || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }}
            style={styles.img}
        />
        <Text style={styles.name}>
          {fullName}
        </Text>
        <View style={styles.fieldsContainer}>
          {TEXT_FIELDS.map((field, i) => (
              <View key={i}>
                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 16 }}>
                  {field}
                </Text>
                <StarRating
                    rating={ratings[field.toLowerCase() as keyof typeof ratings]}
                    onChange={(rating) => {
                      setRatings({
                        ...ratings,
                        [field.toLowerCase()]: rating,
                      });
                    }}
                    color={Colors.primary}
                    emptyColor={Colors.primaryMuted}
                    starStyle={{flex: 1}}
                    starSize={32}
                />
              </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

export default ReviewMember;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    height: 160,
    width: 160,
    borderRadius: 80,
    alignSelf: "center",
  },
  fieldsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 24,
    fontWeight: "400"
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginBottom: 50,
    height: 50,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "500",
  },
});
