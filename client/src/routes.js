import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Transection from "views/Transection";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "tim-icons icon-button-power",
    component: Dashboard,
    layout: "/admin"
  },
  
  {
    path: "/profile",
    name: "Account",
    icon: "tim-icons  icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/create",
    name: "Transection",
    icon: "tim-icons icon-pencil",
    component: Transection,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Report",
    icon: "tim-icons icon-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Test Page 1",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "test page 2",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // }
];
export default routes;
