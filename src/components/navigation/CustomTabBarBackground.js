import { View } from "react-native"
import Svg, { Path } from "react-native-svg"

const CustomTabBarBackground = ({ width, height, activeIndex = 0, tabCount = 5, isRTL = false }) => {
  const tabWidth = width / tabCount
  const cutoutRadius = 80
  const cutoutDepth = 70
  const startOffset = 30 // Increased from 20 to make the background taller
  const edgeMargin = -22 // Horizontal margin from left/right edges

  const safeIndex = Math.max(0, Math.min(tabCount - 1, activeIndex))
  const rtlIndex = isRTL ? tabCount - 1 - safeIndex : safeIndex

  // Calculate center position with edge protection
  const idealCenter = tabWidth * rtlIndex + tabWidth / 2
  const cutoutCenterX = Math.max(cutoutRadius + edgeMargin, Math.min(width - cutoutRadius - edgeMargin, idealCenter))

  // Adjust radius for edge tabs
  const effectiveRadius = Math.min(cutoutRadius, cutoutCenterX - edgeMargin, width - cutoutCenterX - edgeMargin)

  // Main fill path for the white background
  const fillPath = `
    M0,${startOffset}
    H${width}
    V${height + startOffset}
    H0
    Z
    M${cutoutCenterX - effectiveRadius},${startOffset}
    C${cutoutCenterX - effectiveRadius * 0.3},${startOffset} 
     ${cutoutCenterX - effectiveRadius * 1},${cutoutDepth + startOffset} 
     ${cutoutCenterX},${cutoutDepth + startOffset}
    C${cutoutCenterX + effectiveRadius * 1},${cutoutDepth + startOffset} 
     ${cutoutCenterX + effectiveRadius * 0.3},${startOffset} 
     ${cutoutCenterX + effectiveRadius},${startOffset}
  `

  // Border path that includes the sides and bottom, plus the curved cutout
  // but excludes the very top of the cutout where the active tab sits
  const borderPath = `
    M0,${startOffset}
    H${cutoutCenterX - effectiveRadius}
    
    C${cutoutCenterX - effectiveRadius * 0.3},${startOffset + 1} 
     ${cutoutCenterX - effectiveRadius * 1},${cutoutDepth + startOffset} 
     ${cutoutCenterX},${cutoutDepth + startOffset}
    
    C${cutoutCenterX + effectiveRadius * 1},${cutoutDepth + startOffset} 
     ${cutoutCenterX + effectiveRadius * 0.3},${startOffset + 1} 
     ${cutoutCenterX + effectiveRadius},${startOffset}
    
    H${width}
    V${height + startOffset}
    H0
    V${startOffset}
  `

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: height + startOffset,
      }}
    >
      <Svg width={width} height={height + startOffset} viewBox={`0 0 ${width} ${height + startOffset}`}>
        {/* Fill the entire shape with white */}
        <Path d={fillPath} fill="#FFFFFF" fillRule="evenodd" />

        {/* Draw the border around everything except the top of the cutout */}
        <Path d={borderPath} fill="none" stroke="#E5E7EB" strokeWidth={1} strokeLinejoin="round" />
      </Svg>
    </View>
  )
}

export default CustomTabBarBackground
