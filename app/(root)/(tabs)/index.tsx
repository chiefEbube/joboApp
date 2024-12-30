import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "plum"
      }}
    >
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/2">Properties</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    color: "red"
  }
})
