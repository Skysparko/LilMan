import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Models} from 'appwrite';

type Props = {
  myTaskData: Models.Document[] | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CatScrollMenu = ({myTaskData, setSelectedCategory}: Props) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categoryList, setCategoryList] = useState<Array<string>>(['']);

  useEffect(() => {
    if (myTaskData) {
      let data = [...new Set(myTaskData.map(item => item.category))];
      setCategoryList(data);
    }
  }, [myTaskData]);

  return (
    <ScrollView horizontal>
      {categoryList?.map((category, key) =>
        key === activeCategory ? (
          <View key={key}>
            <LinearGradient
              key={key}
              colors={['#7512fc', '#6102e3']}
              style={styles.activeCatScrollContainer}>
              <View style={styles.rightCircle}>
                <Text style={styles.blendText}>o</Text>
              </View>
              <View style={styles.leftCircle}>
                <Text style={styles.blendText}>o</Text>
              </View>
              <Text style={[styles.lightText, styles.title]}>{category}</Text>
            </LinearGradient>
          </View>
        ) : (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => {
              setActiveCategory(key);
              setSelectedCategory(category);
            }}>
            <LinearGradient
              colors={['#7512fc', '#6102e3']}
              style={styles.inActiveCatScrollContainer}>
              <View style={styles.rightCircle}>
                <Text style={styles.blendText}>o</Text>
              </View>
              <View style={styles.leftCircle}>
                <Text style={styles.blendText}>o</Text>
              </View>
              <Text style={[styles.lightText, styles.title]}>{category}</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        ),
      )}
    </ScrollView>
  );
};

export default CatScrollMenu;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  taskContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  activeCatScrollContainer: {
    margin: 10,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    overflow: 'hidden',
    backgroundColor: '#6102e3',
    elevation: 10,
  },
  inActiveCatScrollContainer: {
    margin: 10,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    overflow: 'hidden',
    backgroundColor: '#6102e3',

    opacity: 0.3,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  rightCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomLeftRadius: 100,
    height: 100,
    width: 100,
    backgroundColor: '#5900d1',
  },
  blendText: {
    color: '#5900d1',
  },
  leftCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 100,
    height: 100,
    width: 100,
    backgroundColor: '#5900d1',
  },
  emptyContent: {
    alignItems: 'center',
    gap: 20,
    marginTop: 100,
  },

  button: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    width: 100,
  },
  lightText: {
    color: 'white',
  },
  darkText: {
    color: 'black',
  },
});
