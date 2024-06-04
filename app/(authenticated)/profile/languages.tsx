import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Badge from "@/components/profile/badge";
import { defaultStyles } from "@/constants/DefaultStyles";

const SELECTED = ["🇬🇧 English"];
const LANGUAGES = [
  "🇬🇧 English",
  "🇫🇷 French",
  "🇦🇫 Dari",
  "🇦🇱 Albanian",
  "🇩🇿 Algerian Arabic",
  "🇦🇩 Andorran Catalan",
  "🇦🇴 Angolan Portuguese",
  "🇦🇬 Antiguan English",
  "🇦🇷 Argentine Spanish",
  "🇦🇲 Armenian",
  "🇦🇼 Aruban Dutch",
  "🇦🇺 Australian English",
  "🇦🇹 Austrian German",
  "🇦🇿 Azerbaijani",
  "🇧🇸 Bahamian English",
  "🇧🇭 Bahraini Arabic",
  "🇧🇩 Bangladeshi Bengali",
  "🇧🇧 Barbadian English",
  "🇧🇾 Belarusian",
  "🇧🇪 Belgian Dutch",
  "🇧🇪 Belgian French",
  "🇧🇿 Belizean English",
  "🇧🇯 Beninese French",
  "🇧🇹 Bhutanese Dzongkha",
  "🇧🇴 Bolivian Spanish",
  "🇧🇦 Bosnian Bosnian",
  "🇧🇼 Botswanan English",
  "🇧🇷 Brazilian Portuguese",
  "🇻🇬 British Virgin Islands English",
  "🇧🇳 Bruneian Malay",
  "🇧🇬 Bulgarian",
  "🇧🇫 Burkinabe French",
  "🇧🇮 Burundian French",
  "🇰🇭 Cambodian Khmer",
  "🇨🇲 Cameroonian French",
  "🇨🇦 Canadian English",
  "🇨🇦 Canadian French",
  "🇨🇻 Cape Verdean Portuguese",
  "🇨🇫 Central African French",
  "🇹Ꭰ Chadian Arabic",
  "🇨🇱 Chilean Spanish",
  "🇨🇳 Chinese Mandarin",
  "🇨🇴 Colombian Spanish",
  "🇰🇲 Comorian Comorian",
  "🇨🇬 Congolese French",
  "🇨🇩 Congolese Swahili",
  "🇨🇷 Costa Rican Spanish",
  "🇨🇮 Ivorian French",
  "🇭🇷 Croatian Croatian",
  "🇨🇺 Cuban Spanish",
  "🇨🇿 Czech",
  "🇩🇰 Danish",
  "🇩🇯 Djiboutian Arabic",
  "🇩🇲 Dominican English",
  "🇩🇴 Dominican Spanish",
  "🇪🇨 Ecuadorian Spanish",
  "🇪🇬 Egyptian Arabic",
  "🇸🇻 Salvadoran Spanish",
  "🇬🇶 Equatorial Guinean Spanish",
  "🇪🇷 Eritrean Tigrinya",
  "🇪🇪 Estonian Estonian",
  "🇪🇹 Ethiopian Amharic",
  "🇫🇰 Falkland Islands English",
  "🇫🇴 Faroese Faroese",
  "🇫🇯 Fijian English",
  "🇫🇮 Finnish",
  "🇫🇷 French",
  "🇬🇦 Gabonese French",
  "🇬🇲 Gambian English",
  "🇬🇪 Georgian",
  "🇩🇪 German",
  "🇬🇭 Ghanaian English",
  "🇬🇷 Greek",
  "🇬🇱 Greenlandic Greenlandic",
  "🇬🇩 Grenadian English",
  "🇬🇺 Guamanian English",
  "🇬🇹 Guatemalan Spanish",
  "🇬🇳 Guinean French",
  "🇬🇼 Guinea-Bissauan Portuguese",
  "🇬🇾 Guyanese English",
  "🇭🇹 Haitian Haitian Creole",
  "🇭🇳 Honduran Spanish",
  "🇭🇰 Hong Kong Cantonese",
  "🇭🇺 Hungarian",
  "🇮🇸 Icelandic Icelandic",
  "🇮🇳 Indian Hindi",
  "🇮🇩 Indonesian",
  "🇮🇷 Iranian Persian",
  "🇮🇶 Iraqi Arabic",
  "🇮🇪 Irish",
  "🇮🇱 Israeli Hebrew",
  "🇮🇹 Italian",
  "🇯🇲 Jamaican English",
  "🇯🇵 Japanese",
  "🇯Ο Jordanian Arabic",
  "🇰🇿 Kazakh Kazakh",
  "🇰🇪 Kenyan English",
  "🇰🇮 Kiribati English",
  "🇰🇵 North Korean Korean",
  "🇰🇷 South Korean Korean",
  "🇰W Kuwaiti Arabic",
  "🇰🇬 Kyrgyz Kyrgyz",
  "🇱🇦 Lao",
  "🇱🇻 Latvian Latvian",
  "🇱🇧 Lebanese Arabic",
  "🇱🇸 Lesotho Sesotho",
  "🇱🇷 Liberian English",
  "🇱🇾 Libyan Arabic",
  "🇱🇮 Liechtenstein German",
  "🇱🇹 Lithuanian",
  "🇱🇺 Luxembourgish",
  "🇲🇬 Malagasy Malagasy",
  "🇲🇼 Malawian English",
  "🇲🇾 Malaysian Malay",
  "🇲🇻 Maldivian Dhivehi",
  "🇲🇱 Malian French",
  "🇲🇹 Maltese Maltese",
  "🇲🇭 Marshallese Marshall",
  "🇲🇲 Burmese Burmese",
  "🇲🇳 Mongolian Mongolian",
  "🇲🇪 Montenegrin Montenegrin",
  "🇲🇦 Moroccan Arabic",
  "🇲🇿 Mozambican Portuguese",
  "🇲🇲 Burmese Burmese",
  "🇳🇦 Namibian English",
  "🇳🇵 Nepali",
  "🇳🇱 Dutch",
  "🇳🇿 New Zealand English",
  "🇳🇮 Nicaraguan Spanish",
  "🇳🇪 Nigerian English",
  "🇳🇴 Norwegian Bokmål",
  "🇳🇴 Norwegian Nynorsk",
  "🇴🇲 Omani Arabic",
  "🇵🇰 Pakistani Urdu",
  "🇵🇦 Panamanian Spanish",
  "🇵🇬 Papua New Guinean English",
  "🇵🇾 Paraguayan Spanish",
  "🇵🇪 Peruvian Spanish",
  "🇵🇭 Philippine Tagalog",
  "🇵🇱 Polish",
  "🇵🇹 Portuguese",
  "🇶🇦 Qatari Arabic",
  "🇷🇪 Réunion French",
  "🇷🇴 Romanian",
  "🇷🇺 Russian",
  "🇷🇼 Rwandan French",
  "🇰🇳 Saint Kitts and Nevis English",
  "🇱🇨 Saint Lucian English",
  "🇻🇨 Saint Vincent and the Grenadines English",
  "🇼🇸 Samoan Samoan",
  "🇸🇲 Sammarinese Italian",
  "🇸🇹 São Tomé and Príncipe Portuguese",
  "🇸🇦 Saudi Arabian Arabic",
  "🇸🇳 Senegalese French",
  "🇷🇸 Serbian Serbian",
  "🇸🇨 Seychellois French",
  "🇸🇱 Sierra Leonean English",
  "🇸🇬 Singaporean English",
  "🇸🇰 Slovak",
  "🇸🇮 Slovenian",
  "🇸🇧 Solomon Islands English",
  "🇸🇴 Somali Somali",
  "🇿🇦 South African English",
  "🇿🇦 South African Afrikaans",
  "🇪🇸 Spanish Spain",
  "🇱🇰 Sri Lankan Sinhala",
  "🇸🇩 Sudanese Arabic",
  "🇸🇷 Surinamese Dutch",
  "🇸🇿 Swazi Swati",
  "🇸🇪 Swedish",
  "🇨🇭 Swiss German",
  "🇨🇭 Swiss French",
  "🇨🇭 Swiss Italian",
  "🇸🇾 Syrian Arabic",
  "🇹🇼 Taiwanese Mandarin",
  "🇹🇯 Tajik Tajik",
  "🇹🇿 Tanzanian Swahili",
  "🇹🇭 Thai",
  "🇹🇱 Timorese Tetum",
  "🇹🇬 Togolese French",
  "🇹🇰 Tokelauan Tokelauan",
  "🇹🇴 Tongan Tongan",
  "🇹🇹 Trinidadian English",
  "🇹🇳 Tunisian Arabic",
  "🇹🇷 Turkish",
  "🇹🇲 Turkmen Turkmen",
  "🇹🇻 Tuvaluan Tuvaluan",
  "🇺🇬 Ugandan English",
  "🇺🇦 Ukrainian",
  "🇦🇪 United Arab Emirates Arabic",
  "🇺🇾 Uruguayan Spanish",
  "🇺🇿 Uzbek Uzbek",
  "🇻🇺 Vanuatu Bislama",
  "🇻🇪 Venezuelan Spanish",
  "🇻🇳 Vietnamese",
  "🇿🇲 Zambian English",
  "🇿🇼 Zimbabwean English",
];

const Languages = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Languages</Text>
        <Text style={{ color: Colors.gray }}>1 of 5</Text>
      </View>
      <View style={{ height: 48 }}>
        <ScrollView
          horizontal
          style={{ marginTop: 8 }}
          showsHorizontalScrollIndicator={false}
        >
          {SELECTED.map((skill, i) => (
            <TouchableOpacity
              key={skill}
              style={{
                backgroundColor: Colors.primary,
                padding: 8,
                borderRadius: 16,
                marginRight: 8,
                height: 32,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: i == 0 ? 16 : 0,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>{skill}</Text>
              <FontAwesome
                name="times"
                size={12}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <View
          style={[
            defaultStyles.textInput,
            {
              height: 36,
              paddingVertical: 0,
              paddingHorizontal: 8,
              gap: 8,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            },
          ]}
        >
          <Ionicons name="search" size={16} color={Colors.gray} />
          <TextInput placeholder="Search" style={{ height: "100%" }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            marginTop: 8,
            flexWrap: "wrap",
            width: "100%",
            flexDirection: "row",
            gap: 8,
            paddingBottom: 192,
          }}
          showsVerticalScrollIndicator={false}
        >
          {LANGUAGES.map((e, i) => (
            <Badge text={e} key={i} selected={SELECTED.includes(e)} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Languages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 16,
  },
});
