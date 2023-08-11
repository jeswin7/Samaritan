import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

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
    backgroundColor: COLORS.secondary,
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
    fontSize: SIZES.medium,
    color: COLORS.white,
    paddingVertical: 5,
  },
  statusDoneStyle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingVertical: 5,
  },  
  statusPendingStyle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'gold',
    paddingVertical: 5,
  },
  seperatorStyle: {
    height: 30, 
    width: '100%' 
  },
  homeContainer: {
    backgroundColor: COLORS.white, 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  homeSubContainer: { 
    backgroundColor: COLORS.white, 
    width: '90%', 
    margin: -40 
  },
  profileView: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'#fff' 
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



  linearGradient: {
    flex: 1,
    backgroundColor: COLORS.secondary
  },
  container: {
    flex: 1,
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  closeButton: {
    padding: 5,
    fontSize: 20
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  msgcontainer: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    maxWidth: '70%', // Adjust this value to limit the chat bubble width
    flexDirection: 'row', // Add this to align bubbles correctly
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 0, // Add this to adjust the border radius for the sent bubble
    marginLeft: 'auto', // Add this to push the sent bubble to the right
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.tertiary,
    borderTopLeftRadius: 0, // Add this to adjust the border radius for the received bubble
    marginRight: 'auto', // Add this to push the received bubble to the left
  },
  message: {
    fontSize: 16,
  },
  messageText: {
    color: COLORS.secondary
  },



  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
    color: COLORS.tertiary,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },


  headingText: {
    fontSize: 20,
    color: COLORS.white,
    margin: 5,
    fontWeight: 'bold',
  }



});

export default styles;
