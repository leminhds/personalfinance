import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5C1865',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  term: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  definition: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default styles