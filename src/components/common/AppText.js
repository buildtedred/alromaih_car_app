// src/components/common/AppText.js

import React from 'react';
import { Text } from 'react-native';
import AlmaraiFonts from '../../constants/fonts';

/**
 * AppText - A reusable Text component with built-in Almarai font styles.
 * 
 * Props:
 * - bold: use Almarai-Bold
 * - extraBold: use Almarai-ExtraBold
 * - light: use Almarai-Light
 * - style: additional custom styles
 * - children: text content
 */
export default function AppText({ bold, extraBold, light, style, children, ...props }) {
  let font = AlmaraiFonts.regular;
  if (bold) font = AlmaraiFonts.bold;
  else if (extraBold) font = AlmaraiFonts.extraBold;
  else if (light) font = AlmaraiFonts.light;

  return (
    <Text style={[{ fontFamily: font }, style]} {...props}>
      {children}
    </Text>
  );
}
