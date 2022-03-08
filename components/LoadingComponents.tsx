import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';

const LoadingRect = (props: {
  width: string | number;
  height: string | number;
  style?: StyleProp<ViewStyle>;
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ])
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={[
        styles.LoadingRect,
        { width: props.width, height: props.height },
        { opacity: opacityAnim },
        props.style,
      ]}
    />
  );
};

const Row = ({ style, ...otherProps }) => {
  return <View style={[{ flexDirection: 'row' }, style]} {...otherProps} />;
};

const LoadingText = () => {
  // return 0, 1, or 2. Add 1 to ensure we always have at least 1 line
  const lineCount = Math.floor(Math.random() * 3) + 1;
  const lines = new Array(lineCount).fill(0); 

  return lines.map((line) => {
    const range = (100 - 65) / 5;
    const width = Math.floor(Math.random() * range) * 5 + 70
    const lineLength = `${width}%`;

    return (
      <Row style={{ marginBottom: 8 }}>
        <LoadingRect width={lineLength} height={20} />
      </Row>
    );
  });
};

export const SortCard = () => {
  return (
    <View style={[styles.card, sortCardStyles.sortCard]}>
      <LoadingRect width={80} height={14} />
      <LoadingRect width={'100%'} height={32} style={sortCardStyles.sort} />
    </View>
  );
};

export const LoadingArticle = () => {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Row style={{}}>
        <LoadingRect width={100} height={100} style={{ marginRight: 16 }} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {LoadingText()}
          <Row style={{ flex: 1, alignItems: 'flex-end' }}>
            <LoadingRect width={36} height={12} />
          </Row>
        </View>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  LoadingRect: {
    borderRadius: 4,
    opacity: 0.1,
    backgroundColor: '#323643',
  },
});

const sortCardStyles = StyleSheet.create({
  sortCard: {
    marginTop: 4,
  },
  sort: {
    marginTop: 16,
  },
});
