import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    color: COLORS.secondary,
    paddingVertical: 5
  },
  seperatorStyle: {
    height: 30, 
    width: '100%' 
  },
  homeContainer: {
    backgroundColor: '#fff', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  homeSubContainer: { 
    backgroundColor: '#fff', 
    width: '90%', 
    margin: -40 
  },
  profileView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'#fff' 
  },
  // Request Component style
  requestContainer: {
    height: '90%',
    marginTop: SIZES.medium,
  },
  statusView: {
    flexDirection:'row', 
    flex:1,
    alignItems:'center',
  },
  statusIcon: {
    height:15,
    width:15,
    backgroundColor:COLORS.green, 
    borderRadius:30, 
  },
  statusTitle : {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    marginLeft: 10
  }
});

export default styles;
