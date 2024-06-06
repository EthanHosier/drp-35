import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Colors from "@/constants/Colors";
import {useFilterStore} from "@/utils/store/filter-store";

const Filter = () => {

  const [numMembers, setNumMembers] = React.useState(
      useFilterStore((state) => state.numMembers.toString())
  );

  return (
      <KeyboardAwareScrollView
          style={{ padding: 16, backgroundColor: Colors.background }}
          showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 16 }}>
            Number of Members
          </Text>
          <TextInput
              style={{
                marginTop: 8,
                width: "100%",
                height: 40,
                borderWidth: 1,
                borderColor: Colors.lightGray,
                padding: 8,
                borderRadius: 12,
              }}
              value={numMembers}
              placeholderTextColor={Colors.gray}
              placeholder={"0"}
              onChangeText={(text) => {
                setNumMembers(text);
                useFilterStore.setState({ numMembers: parseInt(text) });
              }}
          />
        </View>
      </KeyboardAwareScrollView>
  );
};

export default Filter;
