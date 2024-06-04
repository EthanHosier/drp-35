import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface ExternalLinkProps {
  display_name: string;
  url: string;
  icon: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  display_name,
  url,
  icon,
}) => (
  <TouchableOpacity
    style={styles.attributeContainer}
    onPress={() => openBrowserAsync(url)}
  >
    <View style={styles.attributeIconContainer}>{icon}</View>
    <Text style={styles.attributeText}>{display_name}</Text>
    <FontAwesome
      style={{ marginLeft: "auto", marginRight: 16 }}
      name="chevron-right"
      size={16}
      color={Colors.dark}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  img: {
    marginTop: 20,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    alignSelf: "center",
  },
  attributeContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    gap: 16,
  },
  attributeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    height: 44,
    width: 44,
    borderRadius: 8,
  },
  attributeText: { fontSize: 16, fontWeight: "500" },
});

export default ExternalLink;
