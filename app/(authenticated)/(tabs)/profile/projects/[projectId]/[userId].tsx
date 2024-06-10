import React, {useEffect, useState} from 'react';
import {getProfileByUserId, Profile} from "@/utils/api/profiles";
import {useUserIdStore} from "@/utils/store/user-id-store";
import {View, Text, StyleSheet} from "react-native";
import {Image} from "expo-image";
import Colors from "@/constants/Colors";
import InfoSheet from "@/components/projects/info-sheet";

const ViewMember = () => {

  const [profile, setProfile] = useState<Profile | null>(null);
  const userId = useUserIdStore((state) => state.userId);

  useEffect(() => {
    getProfileByUserId(userId).then((response) => {
      if (!response.error) {
        setProfile(response.data);
      }
    });
  }, []);

  if (!profile) {
    return <View>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <View style={{height: "100%", backgroundColor: Colors.lightGray}}>
      <View style={styles.container}>
        <Image
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 16,
            }}
            source={profile.imageUrl}
        />
        <View
            style={{
              width: "100%",
              alignSelf: "flex-end",
              padding: 16,
              paddingLeft: 24,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
        >
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            {profile.full_name}
          </Text>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
                style={{
                  backgroundColor: Colors.lightGray,
                  height: 32,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
            >
              <Text style={{ fontWeight: "500" }}>
                {profile.languages.map((l) => l.split(" ")[0]).join("")}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <InfoSheet profile={profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 12,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: Colors.background,
    borderRadius: 20
  }
});

export default ViewMember;
