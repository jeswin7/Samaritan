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
  buttonBackStyle: {
    height: 30,
    width: 30,
    marginLeft: 10,
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
  subContainermentor: {
    width: '90%',
    marginTop: 40,
  },
  mentorContainer: {
    flexDirection: 'row',
    width:'90%'
  },
  addMentorText:{
    position: 'absolute',
    left: 20,
    top: 12,
    marginTop: 10,
    fontSize:20,
    fontWeight:'bold',
    color:COLORS.white
  },
  welcomeMsg: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 5,
    fontWeight: 'bold',
    marginTop: 5
  },
  cardContainer: {
    margin: 10,
    //backgroundColor: COLORS.primary,
    opacity: 0.8,
    borderRadius: 10,
    backgroundColor: '#458592',
    opacity: 0.9,
    borderColor: '#458592',
    borderWidth: 1,
    //borderRadius: 20
  },
  seperatorViewStyles: { 
    height: 60, 
    width: 2, 
    backgroundColor: COLORS.white, 
    marginTop: 30 
  },
  dashboardSubCardStyles: {
    margin: 5, 
    flex: 1, 
    flexDirection: 'column',
    backgroundColor:'#458592', 
    opacity:0.9, 
    borderColor:COLORS.primary,
    borderWidth:1, 
    borderRadius:20
  },
  pickercardContainer: {
    width: '90%',
    margin: 10,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
    borderRadius: 10,
    color: COLORS.white,
  },
  headingMsg: {
    fontSize: 20,
    color: COLORS.secondary,
    margin: 10,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 25,
    color: COLORS.white,
    margin: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subHeadingText: {
    fontSize: 20,
    color: COLORS.white,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  detailText: {
    fontSize: 15,
    color: COLORS.white,
    margin: 10,
    fontWeight: 'bold'
  },
  textContainer: {
    fontSize: 17,
    color: COLORS.white,
    margin: 5,
    textAlign: 'center'
  },
  textCountStyle: {
    fontSize: 40,
    color: COLORS.secondary,
    //margin:10,
    marginBottom: 10,
    textAlign: 'center'
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  //Notifications
  containernotification: {
    height: '100%', 
    alignItems: 'center',
    marginTop: 30

  },
  notificationheader: {
    width: '100%',
    color: COLORS.tertiary,
    paddingVertical: 10,
    //paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headertext: {
    color: COLORS.secondary,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    paddingLeft: 120,
  },
  notificationline: {
    backgroundColor: COLORS.tertiary,
    height: 0.5,
    width: "100%",
  },
  notificationcardContainer:{
    width: '95%',
    margin:5,
    padding:5,
    backgroundColor:COLORS.primary, 
    opacity:0.8, 
    borderRadius:10,
    marginTop:40,
  },
  closeButton:{
    maxWidth: 50,
    alignSelf: 'flex-end',
    paddingRight: 8,

  },
  //add mentor
  addIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
    marginTop: 10,
  },
  inputTextFieldContainer: {
    margin: 10,
    backgroundColor: COLORS.tertiary,//'#9DC7CB', 
    opacity: 0.6,
    borderRadius: 10,
    // borderColor: COLORS.tertiary,
    // borderWidth:5
  },
  inputTextField: {
    paddingVertical: 10,
    fontSize: 18,
    color: COLORS.secondary,
    margin: 5,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    textShadowColor: COLORS.secondary,
    fontWeight: 'bold',
    placeholderTextColor: COLORS.secondary
  },
  dropdown: {
    paddingVertical: 12,
    fontSize: 60,
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginTop: SIZES.medium,
    borderColor: COLORS.primary,
    color: COLORS.white
  },
  dropdownbox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    maxHeight: 200,
    color:COLORS.white,
    placeholderTextColor:COLORS.white
  },
  dropdowntext: {
    color: COLORS.secondary,
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
  detailText:{ 
    fontSize: 15, 
    color: COLORS.white, 
    margin: 10, 
    fontWeight: 'bold' 
  },
  subHeadingText: {
    fontSize: 18,
    color: COLORS.white,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionHeadingText:{ 
    fontSize: 16, 
    color: COLORS.secondary, 
    margin: 10, 
    fontWeight: 'bold',
    textAlign :'center'
  },
  paymentDetailText: {
    fontSize: 15,
    color: COLORS.white,
    margin: 5,
    fontWeight: 'bold',
    //textAlign: 'center'
  },
  paymentValusText: {
    fontSize: 15,
    color: COLORS.white,
    margin: 5,
    //fontWeight: 'bold',
  }
});

export default styles;
