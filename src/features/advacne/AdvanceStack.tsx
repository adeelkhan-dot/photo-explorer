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
import { SCREEN_NAMES } from "../../constants/screen";


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
        name={SCREEN_NAMES.ADVANCE_SCREEN}
        component={AdvanceScreen}
        options={{headerShown: false }}
      />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_PARALLEL_MODALS} component={ParallelModals} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_CARD_ANIMATIONS} component={CardAnimations} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_ACTION_SHEET} component={ActionSheet} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_LOADER} component={Loader} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_SHIMMER} component={Shimmer} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_INPUT_MODAL} component={InputModal} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_KEYBOARD_AWARE} component={KeyboardAware} />
      <Stack.Screen name={SCREEN_NAMES.ADVANCE_KEYBOARD_ACTION_TAB} component={KeyboardActionTab} />
    </Stack.Navigator>
  );
}
