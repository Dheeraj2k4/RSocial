import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen, ScreenHeader, SearchBar } from '@/components/ui';
import { Spacing } from '@/constants/theme';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <Screen>
      <ScreenHeader title="Search" />
      <View style={styles.searchWrap}>
        <SearchBar
          placeholder="Search restaurants, cuisines, dishes…"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <PlaceholderScreen
        icon={MagnifyingGlass}
        title="Discover"
        subtitle="Find restaurants by cuisine, place or vibe — and see where your friends eat."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
});
