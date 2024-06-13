import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { getProfilePicUrl } from "@/utils/api/profile-pics";
import { getProfileByUserId } from "@/utils/api/profiles";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import StarRating from "react-native-star-rating-widget";
import { getUserId } from "@/utils/supabase";
import { addReview } from "@/utils/api/reviews";
import { defaultStyles } from "@/constants/DefaultStyles";

const TEXT_FIELDS = [
  "Communication",
  "Participation",
  "Time Management",
  "Contribution",
];

const ReviewMember = () => {
  const [reviewerId, setReviewerId] = useState<string | null>(null);
  const { profileId: revieweeId, projectId } = useLocalSearchParams();
  const { data: image } = getProfilePicUrl(revieweeId as string);
  const [fullName, setFullName] = useState<string | null>(null);

  const weightedAverage = (ratings: number[]) => {
    return (
      ratings[0] * 0.2 + ratings[1] * 0.2 + ratings[2] * 0.2 + ratings[3] * 0.4
    );
  };

  const getReviewerId = async () => {
    await getUserId().then((id) => setReviewerId(id ? (id as string) : null));
  };

  useEffect(() => {
    getReviewerId();
  }, []);

  const [ratings, setRatings] = useState([0, 0, 0, 0]);

  useEffect(() => {
    getProfileByUserId(revieweeId as string).then((response) => {
      if (!response.error) setFullName(response.data.full_name);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri:
              image ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          }}
          style={styles.img}
        />
        <Text style={styles.name}>{fullName}</Text>
        <View style={styles.fieldsContainer}>
          {TEXT_FIELDS.map((field, i) => (
            <View key={i}>
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 16 }}>
                {field}
              </Text>
              <StarRating
                style={{ marginTop: 8 }}
                rating={ratings[i]}
                onChange={(rating) => {
                  const newRatings = [...ratings];
                  newRatings[i] = rating;
                  setRatings(newRatings);
                }}
                starStyle={{ flex: 1 }}
                color={Colors.gold}
                emptyColor={Colors.gray}
                starSize={36}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            backgroundColor: Colors.primary,
            position: "absolute",
            width: "90%",
            bottom: 32,
            alignSelf: "center",
          },
        ]}
        onPress={() => {
          if (!reviewerId) return;
          addReview(
            reviewerId,
            revieweeId as string,
            projectId as string,
            weightedAverage(ratings)
          );
          router.back();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
    fontWeight: "400",
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
  },
});
