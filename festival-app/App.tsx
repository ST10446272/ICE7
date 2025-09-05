import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ----------------- TYPES -----------------
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Details: undefined;
  Settings: undefined;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

// ----------------- DIMENSIONS -----------------
const { width } = Dimensions.get("window");

// ----------------- NAVIGATOR -----------------
const Stack = createNativeStackNavigator<RootStackParamList>();

// ----------------- CUSTOM SUMMER BUTTON -----------------
const SummerButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.summerButton} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// ----------------- HOME SCREEN -----------------
function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Summer Vibes</Text>
      <Text style={styles.subHeadline}>Feel the Rhythm 🌴</Text>

      <Image
        source={require("./assets/images/background1.jpg")}
        style={styles.image1}
        resizeMode="cover"
      />

      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.purposeText}>Discover amazing festivals & events</Text>

      <SummerButton title="Next" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

// ----------------- PROFILE SCREEN -----------------
function ProfileScreen({ navigation }: { navigation: any }) {
  const upcomingEvents = [
    { id: 1, title: "Electronic Fest", image: require("./assets/images/7.jpg") },
    { id: 2, title: "Music Carnival", image: require("./assets/images/2.jpg") },
  ];

  const recentVideos = [
    { id: 1, title: "New York", image: require("./assets/images/3.jpg") },
    { id: 2, title: "Germany", image: require("./assets/images/5.jpg") },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Banner */}
      <TouchableOpacity>
        <ImageBackground
          source={require("./assets/images/poster.jpg")}
          style={styles.bannerImage}
          resizeMode="cover"
        >
          <Text style={styles.eventText}>Main Banner Event</Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* Upcoming Events */}
      <Text style={styles.heading}>Upcoming Events &gt;</Text>
      <View style={styles.row}>
        {upcomingEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.imageButton}>
            <ImageBackground source={event.image} style={styles.imageButton} resizeMode="cover">
              <Text style={styles.eventText}>{event.title}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Event Videos */}
      <Text style={styles.heading}>Recent Event Videos &gt;</Text>
      <View style={styles.row}>
        {recentVideos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.imageButton}>
            <ImageBackground source={video.image} style={styles.imageButton} resizeMode="cover">
              <Text style={styles.eventText}>{video.title}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      <SummerButton title="Go to Details" onPress={() => navigation.navigate("Details")} />
    </ScrollView>
  );
}

// ----------------- DETAILS SCREEN -----------------
function DetailsScreen({ navigation }: { navigation: any }) {
  const upcomingEvents = [
    { id: 1, title: "Summer Music Fest", image: require("./assets/images/1.jpg") },
    { id: 2, title: "Electronic Dance Party", image: require("./assets/images/4.jpg") },
    { id: 3, title: "New York Live Concert", image: require("./assets/images/8.jpg") },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Featured Event Banner */}
      <ImageBackground
        source={require("./assets/images/Kaytra.jpg")}
        style={styles.bannerImage}
        resizeMode="cover"
      >
        <Text style={styles.eventText}>Kaytranda Performance</Text>
      </ImageBackground>

      <Text style={styles.heading}>Top Performances</Text>

      {/* Event Cards */}
      {upcomingEvents.map((event) => (
        <TouchableOpacity key={event.id} style={styles.imageButtonLarge}>
          <ImageBackground source={event.image} style={styles.imageButtonLarge} resizeMode="cover">
            <View style={styles.eventCardContainer}>
              <Text style={styles.eventCardText}>{event.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}

      <SummerButton title="Skip" onPress={() => navigation.navigate("Settings")} />
    </ScrollView>
  );
}

// ----------------- SETTINGS SCREEN -----------------
function SettingsScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [bookingType, setBookingType] = useState<string>("");
  const [entries, setEntries] = useState<User[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    bookingType: "",
  });

  const validateInput = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", bookingType: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
      valid = false;
    }
    if (!bookingType.trim()) {
      newErrors.bookingType = "Booking type is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validateInput()) return;

    const newEntry: User = {
      id: Date.now(),
      name,
      email,
      phone,
      role: bookingType,
    };
    setEntries([...entries, newEntry]);

    setName("");
    setEmail("");
    setPhone("");
    setBookingType("");
  };

  return (
    <ScrollView contentContainerStyle={styles.bookingContainer}>
      <Text style={styles.title}>Booking Sheet</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        placeholderTextColor="#888"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <Text style={styles.label}>Booking Type</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={bookingType}
          onValueChange={(itemValue) => setBookingType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Booking Type" value="" />
          <Picker.Item label="Event Ticket" value="Event Ticket" />
          <Picker.Item label="Workshop" value="Workshop" />
          <Picker.Item label="Consultation" value="Consultation" />
        </Picker>
      </View>
      {errors.bookingType && <Text style={styles.error}>{errors.bookingType}</Text>}

      <SummerButton title="Save Booking" onPress={handleSave} />

      <Text style={styles.listTitle}>Saved Bookings</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>{item.role}</Text>
            <Text>{item.email}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

// ----------------- APP ENTRY -----------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fffafc",
    padding: 16,
  },
  bookingContainer: {
    flexGrow: 1,
    backgroundColor: "#fffafc",
    padding: 16,
  },
  title: {
    fontSize: width * 0.06,
    marginBottom: 20,
    color: "#ff69b4",
    textAlign: "center",
    fontWeight: "bold",
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00aaff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  headline: {
    margin: 5,
    fontSize: width * 0.1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff4da6",
  },
  subHeadline: {
    margin: 5,
    fontSize: width * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#00bcd4",
  },
  image1: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#ff66cc",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: width * 0.05,
    color: "#444",
  },
  purposeText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: width * 0.04,
    color: "#777",
  },
  summerButton: {
    backgroundColor: "#ff66cc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 15,
    alignItems: "center",
    shadowColor: "#00bcd4",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    width: width * 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.045,
    textAlign: "center",
  },
  bannerImage: {
    height: width * 0.45,
    width: width * 0.9,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  imageButton: {
    height: width * 0.35,
    width: width * 0.35,
    margin: 6,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageButtonLarge: {
    height: width * 0.55,
    width: "100%",
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  eventText: {
    textAlign: "center",
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#fff",
    marginTop: "auto",
    marginBottom: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    paddingHorizontal: 6,
    alignSelf: "center",
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: "600",
    marginTop: 10,
    color: "#ff4da6",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00bcd4",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: width * 0.04,
    backgroundColor: "#fefefe",
    color: "#000",
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "#ff66cc",
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  picker: {
    color: "#000",
  },
  error: {
    color: "#ff4444",
    fontSize: width * 0.035,
    marginTop: 4,
  },
  listTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#00aaff",
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#ffeaf4",
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#ff69b4",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#00bcd4",
  },
  userName: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#333",
  },
  eventCardContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  eventCardText: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: width * 0.04,
  },
});
