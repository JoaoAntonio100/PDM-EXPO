import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

const MonstrosScrollView: React.FC<Props> = ({ children, headerImage, headerBackgroundColor }) => {
  return (
    <View style={{ flex: 1 }}>
      {headerImage}
      {children}
    </View>
  );
};

export default MonstrosScrollView;
