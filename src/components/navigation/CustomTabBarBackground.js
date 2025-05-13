import { View } from "react-native"
import Svg, { Path } from "react-native-svg"

const CustomTabBarBackground = ({
  width,
  height,
  activeIndex = 0,
  tabCount = 5,
  isRTL = false,
  effectiveWidth = width * 0.9,
  sideMargin = (width - width * 0.9) / 2,
}) => {
  const tabWidth = effectiveWidth / tabCount
  const cutoutRadius = 45
  const cutoutDepth = 40
  const startOffset = 25

  // Calculate center position of the active tab with margins
  const safeIndex = Math.max(0, Math.min(tabCount - 1, activeIndex))
  const rtlIndex = isRTL ? tabCount - 1 - safeIndex : safeIndex
  const cutoutCenterX = sideMargin + tabWidth * rtlIndex + tabWidth / 2

  // Define the curve parameters for both paths
  const curveLeft = `C${cutoutCenterX - cutoutRadius * 0.7},${startOffset} 
     ${cutoutCenterX - cutoutRadius * 0.9},${cutoutDepth + startOffset} 
     ${cutoutCenterX},${cutoutDepth + startOffset}`

  const curveRight = `C${cutoutCenterX + cutoutRadius * 0.9},${cutoutDepth + startOffset} 
     ${cutoutCenterX + cutoutRadius * 0.7},${startOffset} 
     ${cutoutCenterX + cutoutRadius},${startOffset}`

  // Main fill path for the white background
  const fillPath = `
    M0,${startOffset}
    H${cutoutCenterX - cutoutRadius}
    ${curveLeft}
    ${curveRight}
    H${width}
    V${height + startOffset}
    H0
    Z
  `

  // Border path that includes the sides and bottom, plus the curved cutout
  // Using the same curve parameters as the fill path
  const borderPath = `
    M0,${startOffset}
    H${cutoutCenterX - cutoutRadius}
    ${curveLeft}
    ${curveRight}
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
        width: width,
      }}
    >
      <Svg width={width} height={height + startOffset} viewBox={`0 0 ${width} ${height + startOffset}`}>
        
        <Path d={fillPath} fill="#fff" fillRule="evenodd" />

        
        <Path d={borderPath} fill="none" stroke="#E5E7EB" strokeWidth={1} strokeLinejoin="round" />
      </Svg>
    </View>
  )
}

export default CustomTabBarBackground
