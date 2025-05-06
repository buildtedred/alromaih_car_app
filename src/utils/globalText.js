import { Text } from 'react-native';
import AlmaraiFonts from '../constants/fonts';

const oldRender = Text.render;

Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  const originalStyle = origin.props?.style || [];

  const computedStyle = Array.isArray(originalStyle)
    ? originalStyle
    : [originalStyle];

  const hasBoldWeight = computedStyle.some(
    (style) => style?.fontWeight === 'bold'
  );

  return {
    ...origin,
    props: {
      ...origin.props,
      style: [
        { fontFamily: hasBoldWeight ? AlmaraiFonts.bold : AlmaraiFonts.regular },
        ...computedStyle,
      ],
    },
  };
};
