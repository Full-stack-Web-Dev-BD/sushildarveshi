import JwtDecode from "jwt-decode";
import CatalogAndProductGroup from "views/Catalog&ProductGroup/Catalog&ProductGroupManagement";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import ImportData from "views/ImportData";
import ProductManagement from "views/ProductManagement/ProductManagement";
import TableList from "views/TableList.js";
import Transection from "views/Transection/Transection";
import UserProfile from "views/UserProfile.js";
import Users from "views/Users";

const token = window.localStorage.getItem('load-token')

let user = token?  JwtDecode(token):{}


var adminRoute = [
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
  {
    path: "/create",
    name: "Transection",
    icon: "tim-icons icon-pencil",
    component: Transection,
    layout: "/admin"
  },
  {
    path: "/catalogandproductgroup",
    name: "Catalog & Product ",
    icon: "tim-icons icon-molecule-40",
    component: CatalogAndProductGroup,
    layout: "/admin"
  },
  {
    path: "/productManagement",
    name: "Product Management",
    icon: "tim-icons icon-gift-2",
    component: ProductManagement,
    layout: "/admin"
  },  

  {
    path: "/icons",
    name: "Test Page 1",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
];
var userRoute = [
  {
    path: "/users",
    name: "Users",
    icon: "tim-icons icon-settings-gear-63",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "View & Manage",
    icon: "tim-icons icon-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile ",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
];



export default user.type == 'admin' || user.type == 'Admin'? adminRoute :userRoute;