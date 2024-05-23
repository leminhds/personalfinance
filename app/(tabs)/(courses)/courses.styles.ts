import { StyleSheet, Dimensions, Platform } from "react-native";
import {Colors} from "@/constants/Colors";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.Snow,
    borderBottomColor: Colors.Hare,
    borderBottomWidth: 1.5,
    width: width,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryLogo: {
    width: width * 0.12,
    height: height * 0.045,
  },
  diamondLogo: {
    width: width * 0.06,
    height: height * 0.04,
  },
  diamondText: {
    fontSize: 16,
    color: Colors.Macaw,
    margin: 5,
    fontFamily: "Nunito_ExtraBold",
  },
  fireText: {
    fontSize: 16,
    color: Colors.Fox,
    margin: 5,
    fontFamily: "Nunito_ExtraBold",
  },
  fireLogo: {
    width: width * 0.06,
    height: height * 0.04,
  },
  body: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  unitLogo: {
    height: 120,
    width: 200,
    margin: 15,
  },
  section: {
    flex: 1,
    paddingBottom: 60,
  },
  tier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  moduleContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: Colors.White, // or any color you prefer
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.DarkGray,
    marginBottom: 10,
    textAlign: "center",
  },
  moduleHeader: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.LightGray, // or any color you prefer
    borderRadius: 10,
  },
  moduleHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: "center",
  },
});