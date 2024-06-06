import React, {useEffect} from "react";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Organisations } from "@/constants/PlaceholderValues";
import { defaultStyles } from "@/constants/DefaultStyles";
import {useLocalSearchParams} from "expo-router";
import {useUserIdStore} from "@/utils/store/user-id-store";
import {
  getAllJoinedOrganisations,
  joinOrganisation,
  leaveOrganisation
} from "@/utils/api/organisations";

const InfoTab = () => {

  const orgId = useLocalSearchParams().orgId as string;
  const userId = useUserIdStore(user => user.userId);

  const [loading, setLoading] = React.useState(true);
  const [inOrg, setInOrg] = React.useState(false);


  useEffect(() => {
    getAllJoinedOrganisations(userId).then((res) =>
        setInOrg(
            !res.error && res.data?.some((org) => org.org_id === orgId)
        )
    );
    setLoading(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        position: "relative",
      }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, paddingBottom: 100 },
        ]}
      >
        <View style={{ position: "relative" }}>
          <Image source={Organisations[0].image} style={styles.img} />
          <View
            style={[
              styles.img,
              {
                position: "absolute",
                backgroundColor: Colors.gray,
                opacity: 0.15,
              },
            ]}
          />
        </View>

        <Text style={{ marginTop: 16, fontSize: 24, fontWeight: "600" }}>
          {Organisations[0].name}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.gray }}>
          {Organisations[0].subtitle}
        </Text>
        <Text style={{ marginTop: 24 }}>{Organisations[0].description}</Text>
      </ScrollView>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            backgroundColor: Colors.primary,
            marginTop: "auto",
            position: "absolute",
            width: "90%",
            alignSelf: "center",
            bottom: 32,
          },
        ]}
        onPress={() => {
          if (loading || !orgId) return;
          if (inOrg) {
            leaveOrganisation(orgId, userId).then((res) => {
              if (!res.error) setInOrg(false);
            });
          } else {
            joinOrganisation(orgId, userId).then((res) => {
              if (!res.error) setInOrg(true);
            });
          }
        }}
      >
        <View>
          <Text style={{ color: Colors.lightGray, fontSize: 16 }}>
            {loading ? "Loading..." : inOrg ? "Leave Organisation" : "Join Organisation"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InfoTab;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: 12,
    alignSelf: "center",
    resizeMode: "contain",
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    width: "100%",
    height: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  img2: {
    height: 80,
    width: 80,
    borderRadius: 48,
  },
});
