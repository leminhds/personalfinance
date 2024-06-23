import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  innerButton: {
    alignItems: 'center',
    margin: 10,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  innerCircleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.White,
    textAlign: 'center',
  },
  innerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DarkGray,
  },
});

export default styles;
