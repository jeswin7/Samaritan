import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  dashboardHeading: {
    color: COLORS.secondary,
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
  },
  drawerItemStyle: {
    height: 0
  },
  menuIcon: {
    height: 20,
    width: 25,
    marginLeft: 20
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
  //Home Component Style
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
    color: COLORS.primary,
    fontWeight:'bold',
    fontSize:16,
    borderColor: COLORS.primary
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
    color: COLORS.primary
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
    marginTop: SIZES.medium,
    marginBottom:SIZES.medium
  },
  listView: {
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: SIZES.medium,
  }, 
  detailView: {
    backgroundColor:COLORS.tertiary,
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
  titleNameStyle: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    paddingVertical: 5,
    fontWeight:'bold',
    fontSize:20
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    paddingVertical: 5,
    fontWeight:'bold'
  },
  seperatorStyle: {
    height: 30,
    width: '100%'
  },
  homeMainContainer : { 
    flexGrow: 1 
  },
  homeInnerContainer : { 
    flex: 1 
  },
  homeContainer: {
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  homeSubContainer: {
    backgroundColor: '#fff',
    width: '90%',
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 25,
    color: 'gold'
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  // Request Component style
  requestContainer: {
    marginTop: SIZES.medium,
  },
  statusView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  statusIcon: {
    height: 15,
    width: 15,
    backgroundColor: COLORS.green,
    borderRadius: 30,
  },
  statusTitle: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontWeight:'bold'
  },
  //mentorDetails
  mentorDetailsContainer: {
    backgroundColor: COLORS.white,
    height: '100%'
  },
  mentorDetailsSubContainer: {
    margin: 20
  },
  sendConnectionButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin:20
  },
  sendConnectionButton: {
    marginVertical: 40,
    elevation: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin:20
  },
  sendConnectionText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  //Notifications
  containernotification: {
    height: '100%', 
    alignItems: 'center',
    marginTop: 30,
    width:'100%',
    backgroundColor: COLORS.tertiary
  },
  textContainer: {
    fontSize: 18,
    color: COLORS.tertiary,
    margin: 10,
  },
  subContainer: {
    width: '90%',
  },
  notificationheader: {
    width: '100%',
    color: COLORS.tertiary,
    paddingVertical: 10,
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
    backgroundColor: COLORS.secondary
  },
  notificationcardContainer:{
    margin:5,
    padding:5,
    backgroundColor:COLORS.primary, 
    borderRadius:10,
    marginTop:20,
  },
  closeButton:{
    maxWidth: 50,
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  signOutLbl : { 
    color: COLORS.white 
  }
});

export default styles;
