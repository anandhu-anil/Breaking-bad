import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import IconANT from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import {Colors, height, Typography, width} from '../styles';
import {getOtherCharacters} from '../api';
import Card from '../components/Card';

const SingleCharacterScreen = () => {
  const red_state = useSelector(state => state?.home?.singleCharacter);
  const [otherCharacters, setOtherCharacters] = useState([]);

  useEffect(() => {
    loadOtherCharacters();
  }, []);

  const loadOtherCharacters = async () => {
    try {
      let response = await getOtherCharacters(red_state.category);
      let filteredData = response.filter(f => f.char_id !== red_state.char_id);
      setOtherCharacters(filteredData.slice(0, 5));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <ImageBackground
            source={{uri: red_state.img}}
            style={styles.imgBack}
            blurRadius={3}>
            <View style={styles.imgMask}>
              <Image source={{uri: red_state.img}} style={styles.innerIMG} />
              <View style={styles.height20} />
              <Text style={Typography.largeTextBold}>{red_state.name}</Text>
              <View style={styles.height5} />
              <Text style={Typography.extraSmallTextThin}>
                {red_state.nickname}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.innerContainer}>
            <View style={styles.row}>
              <View>
                <Text style={styles.titleText}>Potrayed</Text>
                <View style={styles.height5} />
                <Text style={Typography.extraSmallTextThin}>
                  {red_state.portrayed}
                </Text>
              </View>
              {red_state.birthday !== 'Unknown' && (
                <View style={styles.row0}>
                  <Text style={Typography.extraSmallTextThin}>
                    {moment(red_state.birthday, 'DD-MM-YYYY').format(
                      'D-MMMM-YYYY',
                    )}
                  </Text>
                  <IconANT
                    name="gift"
                    size={18}
                    color={Colors.WHITE}
                    style={styles.marginLeft10}
                  />
                </View>
              )}
            </View>
            <View style={styles.height20} />
            <Text style={styles.titleText}>Occupation</Text>
            <View style={styles.height5} />
            {red_state?.occupation?.map((Occ, index) => (
              <Text style={Typography.extraSmallTextThin} key={index}>
                {Occ}
              </Text>
            ))}
            <View style={styles.height20} />
            <Text style={styles.titleText}>Appeared in</Text>
            <View style={styles.height10} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {red_state?.appearance?.map((app, index) => (
                <View key={index} style={styles.horizontalContainer}>
                  <Text style={Typography.extraSmallTextThin}>
                    Season {app}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.height20} />
            <View style={styles.height20} />
            <Text style={Typography.largeTextBold}>Other characters</Text>
            <View style={styles.height20} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {otherCharacters.map((char, index) => {
                return (
                  <Card key={index} style={styles.itemContainer}>
                    <Image source={{uri: char?.img}} style={styles.itemIMG} />
                    <View style={styles.row}>
                      <View>
                        <Text
                          style={[Typography.mediumText, styles.width3]}
                          numberOfLines={1}>
                          {char?.name}
                        </Text>
                        <Text
                          style={[Typography.extraSmallTextThin, styles.width3]}
                          numberOfLines={1}>
                          {char?.nickname}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {},
  imgBack: {height: height * 0.45, width: '100%'},
  imgMask: {
    backgroundColor: Colors.TRANSPARENT,
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerIMG: {height: height * 0.25, width: width * 0.4, borderRadius: 8},
  height5: {height: 5},
  height10: {height: 10},
  height20: {height: 20},
  innerContainer: {margin: 15},
  titleText: {...Typography.smallText, color: Colors.PRIMARY},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  row0: {flexDirection: 'row', alignItems: 'center'},
  marginLeft10: {marginLeft: 10},
  horizontalContainer: {
    backgroundColor: Colors.SECONDARY,
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 2,
  },
  itemContainer: {margin: 10},
  itemIMG: {height: height * 0.25, width: width * 0.43, borderRadius: 6},
});

export default SingleCharacterScreen;
