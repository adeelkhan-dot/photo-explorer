import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdvanceScreen from "./AdvanceScreen";
import ParallelModals from "./ParallelModals";
import CardAnimations from "./CardAnimations";
import ActionSheet from "./ActionSheet";
import Loader from "./Loader";
import Shimmer from "./Shimmer";
import InputModal from "./InputModal";
import KeyboardAware from "./KeyboardAware";
import KeyboardActionTab from "./KeyboardActionTab";


export type AdvanceStackParamList = {
  AdvanceScreen: undefined;
  ParallelModals: undefined;
  CardAnimations: undefined;
  ActionSheet: undefined;
  Loader: undefined;
  Shimmer: undefined;
  InputModal: undefined;
  KeyboardAware: undefined;
  KeyboardActionTab: undefined;
};

const Stack = createNativeStackNavigator<AdvanceStackParamList>();

export default function AdvanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdvanceScreen"
        component={AdvanceScreen}
        options={{ title: "Advance Concepts",headerShown: false }}
      />
      <Stack.Screen name="ParallelModals" component={ParallelModals} />
      <Stack.Screen name="CardAnimations" component={CardAnimations} />
      <Stack.Screen name="ActionSheet" component={ActionSheet} />
      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="Shimmer" component={Shimmer} />
      <Stack.Screen name="InputModal" component={InputModal} />
      <Stack.Screen name="KeyboardAware" component={KeyboardAware} />
      <Stack.Screen name="KeyboardActionTab" component={KeyboardActionTab} />
    </Stack.Navigator>
  );
}
