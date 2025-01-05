import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import RunningIcon from '../../assets/images/Others/coffee.svg';
import ReadingIcon from '../../assets/images/Others/coffee.svg';
import CookingIcon from '../../assets/images/Others/coffee.svg';
import HobbyItem from '../../Components/HobbyItem';
import CustomButton from '../../Components/Button';
import routes from '../../Routes/routes';
import {useNavigation} from '@react-navigation/native';

const hobbiesData = [
  {id: '1', name: 'Singing', icon: <RunningIcon width={20} height={20} />},
  {id: '2', name: 'Reading', icon: <ReadingIcon width={20} height={20} />},
  {id: '3', name: 'Hiking', icon: <CookingIcon width={20} height={20} />},
  {id: '4', name: 'Travel', icon: <RunningIcon width={20} height={20} />},
  {
    id: '5',
    name: 'Arts & Crafts',
    icon: <ReadingIcon width={20} height={20} />,
  },
  {id: '6', name: 'Running', icon: <CookingIcon width={20} height={20} />},

  {id: '7', name: 'Swimming', icon: <RunningIcon width={20} height={20} />},
  {id: '8', name: 'Dancing', icon: <ReadingIcon width={20} height={20} />},
  {id: '9', name: 'Photography', icon: <CookingIcon width={20} height={20} />},
  {id: '10', name: 'Cooking', icon: <RunningIcon width={20} height={20} />},
  {id: '11', name: 'DIY', icon: <ReadingIcon width={20} height={20} />},
  {
    id: '12',
    name: 'Console games',
    icon: <CookingIcon width={20} height={20} />,
  },

  {
    id: '13',
    name: 'Food tasting',
    icon: <CookingIcon width={20} height={20} />,
  },
  {id: '14', name: 'Shopping', icon: <RunningIcon width={20} height={20} />},
  {id: '15', name: 'Board games', icon: <ReadingIcon width={20} height={20} />},
  {id: '16', name: 'Gardening', icon: <CookingIcon width={20} height={20} />},
];

const placesData = [
  {id: '1', name: 'Cafe', icon: <RunningIcon width={20} height={20} />},
  {id: '2', name: 'Co-workspace', icon: <ReadingIcon width={20} height={20} />},
  {id: '3', name: 'Restaurant', icon: <CookingIcon width={20} height={20} />},
  {id: '4', name: 'Hotel', icon: <RunningIcon width={20} height={20} />},
  {id: '5', name: 'Lounge', icon: <ReadingIcon width={20} height={20} />},
  {id: '6', name: 'Club', icon: <CookingIcon width={20} height={20} />},

  {id: '7', name: 'Bar', icon: <RunningIcon width={20} height={20} />},
  {id: '8', name: 'Beach house', icon: <ReadingIcon width={20} height={20} />},
  {id: '9', name: 'Hospital', icon: <CookingIcon width={20} height={20} />},
];

const InterestProfile = () => {
  const navigation: any = useNavigation();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const toggleHobbySelection = (hobbyId: string) => {
    if (selectedHobbies.includes(hobbyId)) {
      setSelectedHobbies(selectedHobbies.filter(id => id !== hobbyId));
    } else {
      setSelectedHobbies([...selectedHobbies, hobbyId]);
    }
  };

  const togglePlacesSelection = (placeId: string) => {
    if (selectedPlaces.includes(placeId)) {
      setSelectedPlaces(selectedPlaces.filter(id => id !== placeId));
    } else {
      setSelectedPlaces([...selectedPlaces, placeId]);
    }
  };

  const sendSelectedHobbies = async () => {
    try {
      navigation.navigate(routes.LOCATIONPERMISSION);
      console.log('Hobbies sent to server:', selectedHobbies);
    } catch (error) {
      console.error('Error sending hobbies:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBack width={25} height={25} />
        </TouchableOpacity>
        <Text style={styles.stepStyle}>Step 2 of 2</Text>
      </View>

      <Text style={styles.headerText}>Places based on your interest</Text>
      <Text
        style={[
          styles.stepStyle,
          {marginTop: 5, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD},
        ]}>
        Pick 5 interests, hobbies and places. We’ll curate your feed based on
        what you choose
      </Text>

      <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 0.65}}>
        <View style={{marginTop: 20}}>
          <Text style={styles.label}>Hobbies</Text>
          <View style={styles.hobbiesWrapper}>
            {hobbiesData.map(item => (
              <HobbyItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                isSelected={selectedHobbies.includes(item.id)}
                onSelect={() => toggleHobbySelection(item.id)}
              />
            ))}
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.label}>Places to visit</Text>
          <View style={styles.hobbiesWrapper}>
            {placesData.map(item => (
              <HobbyItem
                key={item.id}
                name={item.name}
                icon={item.icon}
                isSelected={selectedPlaces.includes(item.id)}
                onSelect={() => togglePlacesSelection(item.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{flex: 0.25}}>
        <CustomButton
          title="Continue"
          onPress={() => {
            sendSelectedHobbies();
          }}
        />

        <CustomButton
          title="Skip"
          onPress={() => {
            navigation.navigate(routes.HOMESCREEN);
          }}
          textStyle={{color: COLORS.black}}
          style={{
            color: COLORS.primary,
            marginTop: 10,
            backgroundColor: COLORS.backgroundGray,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    padding: 15,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.textTitle,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  stepStyle: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 75,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textColor,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    marginBottom: 8,
    color: COLORS.textLabel,
    fontSize: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  hobbiesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default InterestProfile;
