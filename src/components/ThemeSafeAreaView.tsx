import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

const ThemeSafeAreaView: React.FC<SafeAreaViewProps> = ({ 
  style, 
  children, 
  edges = ['top', 'bottom'],
  ...props 
}) => {
  const insets = useSafeAreaInsets();

  const paddingStyle: ViewStyle = {
    flex: 1,
  };

  if (edges.includes('top')) {
    paddingStyle.paddingTop = insets.top;
  }
  if (edges.includes('bottom')) {
    paddingStyle.paddingBottom = insets.bottom;
  }
  if (edges.includes('left')) {
    paddingStyle.paddingLeft = insets.left;
  }
  if (edges.includes('right')) {
    paddingStyle.paddingRight = insets.right;
  }

  return (
    <View
      style={[paddingStyle, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemeSafeAreaView;

