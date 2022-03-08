import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';
import { LoadingArticle, SortCard } from './components/LoadingComponents';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

export default function App() {
  const [isConnected, recheckConnection] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fill an array with empty data
  const [cardArray, setCardArray] = useState(new Array(3).fill(0));

  useEffect(() => {
    // handle loading data here, or wherever it makes sense to
  }, []);

  const renderLoadingContent = () => {
    return (
      <>
        <Card style={styles.card}>
          <SortCard />
        </Card>
        {cardArray.map(() => {
          return (
            <Card style={styles.card}>
              <LoadingArticle />
            </Card>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && renderLoadingContent()}
      <Button
        mode="contained"
        onPress={() => {
          setCardArray(new Array(3).fill(0));
          setIsLoading(true);
        }}>
        Reload Cards
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    paddingTop: Constants.statusBarHeight + 18,
    backgroundColor: '#ecf0f1',
    padding: 18,
  },
  card: {
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 18,
  },
});
