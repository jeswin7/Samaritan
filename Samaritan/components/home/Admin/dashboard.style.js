import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardHeading: {
    color: COLORS.secondary,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
  },
  menuIcon: {
    height: 20,
    width: 25,
    marginLeft: 20,
  },
  buttonBellStyle: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileIcon: {
    height: 20,
    width: 20,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
  },
  filterBtn: {
    width: 50,
    height: "100%",
    marginLeft: 5,
    marginRight: -18,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    height: '80%',
    marginTop: SIZES.medium,
  },
  listView: {
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: SIZES.medium,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8
  },
  cheveronView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  cheveronIcon: {
    height: 25,
    width: 15,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    paddingVertical: 5,
  },
  statusDoneStyle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: 'green',
    paddingVertical: 5,
    border: '1px solid red'
  },  
  statusPendingStyle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: 'orange',
    paddingVertical: 5,
    border: '1px solid red'
  },
  seperatorStyle: {
    height: 20, 
    width: '100%' 
  },
  homeContainer: {
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  connectionContainer: {
    height: '100%', 
    alignItems: 'center' 
  },
  subContainer: { 
    width: '90%', 
  },
  subContainermentor : {
      width: '90%', 
     marginTop: 40, 
  },
  welcomeMsg: { 
    fontSize: 20, 
    color: COLORS.white, 
    marginRight: 5, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  cardContainer:{
    margin:10,
    backgroundColor:COLORS.primary, 
    opacity:0.8, 
    borderRadius:10
  },
  pickercardContainer:{
    width: 330,
    margin:10,
    backgroundColor:COLORS.primary, 
    opacity:0.8, 
    borderRadius:10,
    color: COLORS.white,
  },
  headingMsg:{ 
    fontSize: 20, 
    color: COLORS.white, 
    margin: 10, 
    fontWeight: 'bold' 
  },
  headingText:{ 
    fontSize: 25, 
    color: COLORS.white, 
    margin: 5, 
    fontWeight: 'bold',
    textAlign :'center'
  },
  subHeadingText:{ 
    fontSize: 20, 
    color: COLORS.white, 
    margin: 10, 
    fontWeight: 'bold',
    textAlign :'center'
  },
  detailText:{ 
    fontSize: 15, 
    color: COLORS.white, 
    margin: 10, 
    fontWeight: 'bold' 
  },
  textContainer: { 
    fontSize: 20, 
    color: COLORS.white, 
    margin:5 
  },
  profileView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'#fff' 
  },
  //add mentor
  addIcon: {
    position: 'absolute',
     right: 20,
      top: 10,
      marginTop: 10,
  },
  inputTextField: {
    paddingVertical: 10, 
    fontSize: 18, 
    color: COLORS.white, 
    margin:5,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    textShadowColor: COLORS.white
  },
  dropdown: {
    paddingVertical: 12,
    fontSize: 50,
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
    borderColor: COLORS.primary
  },

  dropdownbox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    maxHeight: 200,
  },
  dropdowntext: {
    color: COLORS.white,
  },
  saveButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12

  },
  saveText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  ratingText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 30,
    color: 'gold'
  },
});

export default styles;
