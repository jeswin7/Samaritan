import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import SeekerHome from "./home/Seeker/HomeScreen";
import Nearbyjobs from "./home/nearby/Nearbyjobs";
import Popularjobs from "./home/popular/Popularjobs";
import Login from "./login/Login";
import Signup from './register/Signup';
import ForgotPassword from "./forgotPassword/ForgotPassword";
import Dashboard from "./home/Mentor/Dashboard";
import AdminDashboard from "./home/Admin/Dashboard";

// job details screen
import Company from "./jobdetails/company/Company";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";
import Specifics from "./jobdetails/specifics/Specifics";

// common
import NearbyJobCard from "./common/cards/nearby/NearbyJobCard";

export {
  ScreenHeaderBtn,
  SeekerHome,
  Nearbyjobs,
  Popularjobs,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
  NearbyJobCard,
  Login,
  Signup,
  ForgotPassword,
  Dashboard,
  AdminDashboard
};
