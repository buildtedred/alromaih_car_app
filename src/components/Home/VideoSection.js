// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Dimensions, Linking } from 'react-native';
// import { useLocale } from '../../contexts/LocaleContext';
// import { videosData } from '../../mock-data';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// export default function VideoSection() {
//   const { locale } = useLocale();
//   const [YoutubePlayerComponent, setYoutubePlayerComponent] = useState(null);
//   const [playingId, setPlayingId] = useState(null);
//   const [showAll, setShowAll] = useState(false);
//   const [dimensions, setDimensions] = useState(Dimensions.get('window'));
//   const primaryColor = '#1C74D9';

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       setDimensions(window);
//     });

//     (async () => {
//       try {
//         const mod = await import('react-native-youtube-iframe');
//         setYoutubePlayerComponent(() => mod.default);
//       } catch (err) {
//         console.error('Failed to load YouTubePlayerComponent:', err);
//       }
//     })();

//     return () => subscription?.remove?.();
//   }, []);

//   const getLocalized = (val) => (typeof val === 'object' ? val?.[locale] : val);

//   const renderItem = ({ item }) => {
//     const videoWidth = dimensions.width * 0.9;
//     const videoHeight = videoWidth * (9 / 16);

//     return (
//       <View className="w-[90%] mb-6 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md self-center">
//         {YoutubePlayerComponent && item.videoId ? (
//           <View className="overflow-hidden rounded-t-2xl">
//             <YoutubePlayerComponent
//               height={videoHeight}
//               width={videoWidth}
//               videoId={item.videoId}
//               play={playingId === item.id}
//               onChangeState={(state) => {
//                 if (state === 'ended') setPlayingId(null);
//                 else if (state === 'playing') setPlayingId(item.id);
//               }}
//             />
//           </View>
//         ) : (
//           <View
//             className="bg-gray-200 items-center justify-center h-[200px]"
//           >
//             <Text className="text-gray-500">{locale === 'ar' ? 'تحميل المشغل...' : 'Loading player...'}</Text>
//           </View>
//         )}

//         <View className="p-4">
//           <Text className="text-lg font-semibold text-[#1C74D9] mb-1">
//             {getLocalized(item.title)}
//           </Text>
//           <Text className="text-xs text-gray-400">{item.channel}</Text>

//           <View className="h-px bg-gray-200 my-3" />

//           <Text className="text-sm text-gray-700 mb-4">
//             {getLocalized(item.description)}
//           </Text>

//           <TouchableOpacity
//             className="py-2 px-4 rounded-lg bg-red-500 self-start"
//             onPress={() =>
//               item.videoId && Linking.openURL(`https://www.youtube.com/watch?v=${item.videoId}`)
//             }
//           >
//             <Text className="text-white font-medium text-sm">
//               {locale === 'ar' ? 'مشاهدة على يوتيوب' : 'Watch on YouTube'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const visibleVideos = showAll ? videosData : videosData.slice(0, 3);

//   return (
//     <View className="w-full items-center mb-10">
//       <Text className="text-2xl font-bold text-center text-[#1C74D9] mb-5">
//         {locale === 'ar' ? 'فيديوهات' : 'Videos'}
//       </Text>

//       <FlatList
//         data={visibleVideos}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         scrollEnabled={false}
//         contentContainerStyle={{ alignItems: 'center' }}
//         className="w-full"
//       />

//       {videosData.length > 3 && (
//         <TouchableOpacity
//           onPress={() => setShowAll((prev) => !prev)}
//           className="flex-row items-center justify-center mt-2 py-2"
//         >
//           <Text className="text-sm font-medium text-[#1C74D9]">
//             {showAll
//               ? locale === 'ar' ? 'عرض أقل' : 'Show Less'
//               : locale === 'ar' ? 'عرض المزيد' : 'Show More'}
//           </Text>
//           <Icon
//             name={showAll ? 'chevron-up' : 'chevron-down'}
//             size={22}
//             color={primaryColor}
//             className="ml-1"
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }
