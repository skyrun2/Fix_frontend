import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/ui/button';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SlideData {
  id: string;
  title: string;
  highlight: string;
  description: string;
  image: any;
}

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const flatListRef = useRef<FlatList<SlideData>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: SlideData[] = [
    {
      id: '1',
      title: 'Trusted pros\nfor ',
      highlight: 'every job.',
      description: "From small fixes to big projects, we've got you covered.",
      image: require('@/assets/images/mascot_drill.png'),
    },
    {
      id: '2',
      title: 'Quality products\nat the ',
      highlight: 'best prices.',
      description: 'Explore tools, equipment and more from top brands.',
      image: require('@/assets/images/toolbox.png'),
    },
    {
      id: '3',
      title: 'One app.\n',
      highlight: 'Everything fixed.',
      description: 'Hire pros, shop products, book services - all in one place.',
      image: require('@/assets/images/mascot_wrench.png'),
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      router.push('/role-selection' as any);
    }
  };

  const handleSkip = () => {
    router.push('/role-selection' as any);
  };

  const renderSlide = ({ item }: { item: SlideData }) => {
    return (
      <View style={styles.slideContainer}>
        {/* Visual Showcase */}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </View>

        {/* Text Details */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#1E2022' }]}>
            {item.title}
            <Text style={{ color: '#FFA000' }}>{item.highlight}</Text>
          </Text>
          <Text style={[styles.description, { color: isDark ? '#94A3B8' : '#64748B' }]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0D0E11' : '#FFFFFF' }]}>
      {/* Top Header - Logo and Skip button */}
      <View style={styles.header}>
        <Text style={[styles.logoText, { color: '#FFA000' }]}>FIX</Text>
        <Pressable onPress={handleSkip} style={[styles.skipButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
          <Text style={[styles.skipText, { color: isDark ? '#CBD5E1' : '#475569' }]}>Skip</Text>
        </Pressable>
      </View>

      {/* Slider Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />

      {/* Footer / Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: isActive ? 24 : 8,
                    backgroundColor: isActive ? '#FFA000' : isDark ? '#334155' : '#CBD5E1',
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Button Trigger */}
        <Button
          label={activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          iconName="arrow-forward"
          size={activeIndex === slides.length - 1 ? 'lg' : 'md'}
          style={[
            styles.nextButton,
            { width: activeIndex === slides.length - 1 ? SCREEN_WIDTH * 0.46 : SCREEN_WIDTH * 0.32 },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatList: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: SCREEN_WIDTH * 0.78,
    height: '100%',
  },
  textContainer: {
    marginTop: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 35,
    paddingTop: 15,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nextButton: {
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
