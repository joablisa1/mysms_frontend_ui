import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import CardView from '../views/CardView.vue'
import LoginView from '../components/public/LoginForm.vue'
import PageNotFound from '../views/PageNotFound.vue'
// user components
import UserList from '../views/user/UserList.vue'
import AddUser from "../views/user/AddUser.vue";
import EditUser from "../views/user/EditUser.vue"

import AddShortcode from "../views/shortcode/AddShortcode.vue";
import EditShortCode from "../views/shortcode/EditShortCode.vue"
import ShortcodeList from "../views/shortcode/ShortcodeList.vue";

// import OutboxList from "./views/outbox/OutboxList";
// import InboxList from "./views/inbox/InboxList";
// import InboxCont from "./views/inbox/InboxCont";
// import OutboxStats from "./views/outbox/OutboxStats";

// import AddSchedule from "./views/schedule/AddSchedule";
// import ScheduleList from "./views/schedule/ScheduleList";

import AddSubscription from "../views/subscription/AddSubscription.vue";
import SubscriptionList from "../views/subscription/SubscriptionList.vue";
import EditSubscription from "../views/subscription/EditSubscription.vue"

// import ServiceList from "./views/service/ServiceList";
// import AddService from "./views/service/AddService";
// import BillingList from "./views/billing/BillingList";
// import AddBilling from "./views/billing/AddBilling";
import ContentList from "../views/content/ContentList.vue";
import AddContent from "../views/content/AddContent.vue";

// import OrganizationForm from '../components/organization/OrgnizationCreateView.vue'
// import ListOrganizationForm from '../components/organization/ListOrganForm.vue'
// import EditOrganization from '../components/organization/EditOrganization.vue'

import AddOrganization from "../views/organization/AddOrganization.vue";
import EditOrganization from "../views/organization/EditOrganization.vue"
import OrganizationList from "../views/organization/OrganizationList.vue";



// import AddShortcode from "./views/shortcode/AddShortcode";

import OutboxList from "../views/outbox/OutboxList.vue";
import InboxList from "../views/inbox/InboxList.vue";
// import InboxCont from "./views/inbox/InboxCont";


// import EditUser from "./views/user/EditUser.vue"

// import ServiceList from "./views/service/ServiceList";
// import AddService from "./views/service/AddService";
// import EditService from "./views/service/EditService.vue"

import AddBulk from "../views/bulksms/AddBulk.vue";
import BulkList from "../views/bulksms/BulkList.vue";
// import BulkItem from "./views/bulksms/BulkItem";
// import BulkTabs from "./views/bulksms/BulkTabs";
// import Departments from "./views/departments/DepartmentItems";

// import AddContact from "./views/contact/AddContact.vue"
// import ContactList from "./views/contact/ContactList.vue"
// import EditContact from "./views/contact/EditContacts.vue"

// import AddContactGroup from "./views/contactgroup/AddContactGroup.vue"
// import ListContactGroup from "./views/contactgroup/ListContactGroup.vue"
// import EditContactGroup from "./views/contactgroup/EditContactGroup.vue"

// import AddBulUnit from "./views/bulkunit/AddBulkUnit.vue"
// import ListBulkUnit from "./views/bulkunit/BulkUnitList.vue"
// import EditBulkUnit from "./views/bulkunit/EditBulkUnits.vue"

// import AddGeneralInfo from "./views/generalinfo/AddGeneralInfo.vue"
// import ListGeneralInfo from "./views/generalinfo/ListGeneralInfo.vue"
// import EditGeneralInfo from "./views/generalinfo/EditGeneralInfo.vue"

// import AddGeneralAnswer from "./views/generalanswer/AddGeneralAnswer.vue"
// import ListGeneralAnswer from "./views/generalanswer/ListGeneralAnswer.vue"
// import EditGeneralAnswer from "./views/generalanswer/EditGeneralAnswer.vue"

// import AddPoll from "./views/poll/AddPoll.vue"
// import ListPolls from "./views/poll/ListPolls.vue"
// import EditPoll from "./views/poll/EditPoll.vue"

// import AddPollResult from "./views/pollresult/AddPollResult.vue"
// import ListPollResult from "./views/pollresult/ListPollResult.vue"
// import EditPollResult from "./views/pollresult/EditPollsResult.vue"

// import AddPollReply from "./views/pollreply/AddPollReply.vue"
// import ListPollReply from "./views/pollreply/ListPollReply.vue"
// import EditPollReply from "./views/pollreply/EditPollReply.vue"

// import AddPollChoice from "./views/pollchoices/AddPollChoice.vue"
// import EditPollChoice from "./views/pollchoices/EditPollChoice.vue"
// import ListPollChoice from "./views/pollchoices/ListPollChoices.vue"

// import AddParcelContent from "./views/parcel/AddParcelContent.vue"
// import ListParcelContent from "./views/parcel/ListParcelContent.vue"
// import EditParcelContent from "./views/parcel/EditParcelContent.vue"

// import AddMessage from "./views/message/AddMessage.vue"
// import ListMessage from "./views/message/ListMessage.vue"
// import EditMessage from "./views/message/EditMessages.vue"

// import SummaryReport from "./views/reports/SummaryReports.vue"

// import SettingList from "./views/setting/SettingList.vue";

// import store from '@/store'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoardView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/user',
        name: 'user',
        component: UserList
      },
      {
        path: '/card',
        name: 'card',
        component: CardView
      },
      // {
      //   path: '/edit/:id',
      //   name: 'edit-organization',
      //   component: EditOrganization,
      // },
      // {
      //   path: '/list-organization',
      //   name: 'list-organizations',
      //   component: ListOrganizationForm,
      // },

      // {
      //   path: '/organization',
      //   name: 'organizationForm',
      //   component: OrganizationForm,
      // },

      {
        path: "/content/add",
        component: AddContent,
      },
      // {
      //   path: "/generalinfo/list",
      //   component: ListGeneralInfo,
      // },
      // {
      //   path: "/generalinfo/add",
      //   component: AddGeneralInfo,
      // },
      {
        path: "/organization/add",
        name:'addOrganization',
        component: AddOrganization,
      },
      {
        path: "/organization/edit/:id",
        component: EditOrganization,
      },
      {
        path: "/organizations",
        name:'list-organization',
        component: OrganizationList,
      },
      
      // {
      //   path: "/generalinfo/edit/:id",
      //   component: EditGeneralInfo,
      // },

      // {
      //   path: "/generalanswer/list",
      //   component: ListGeneralAnswer,
      // },
      // {
      //   path: "/generalanswer/add",
      //   component: AddGeneralAnswer,
      // },

      // {
      //   path: "/generalanswer/edit/:id",
      //   component: EditGeneralAnswer,
      // },
      // {
      //   path: "/poll/list",
      //   component: ListPolls,
      // },
      // {
      //   path: "/poll/add",
      //   component: AddPoll,
      // },
      // {
      //   path: "/poll/edit/:id",
      //   component: EditPoll,
      // },

      // {
      //   path: "/parcel/list",
      //   component: ListParcelContent,
      // },
      // {
      //   path: "/parcel/add",
      //   component: AddParcelContent,
      // },
      // {
      //   path: "/parcel/edit/:id",
      //   component: EditParcelContent,
      // },
      // {
      //   path: "/pollresult/list",
      //   component: ListPollResult,
      // },
      // {
      //   path: "/pollresult/add",
      //   component: AddPollResult,
      // },
      // {
      //   path: "/pollresult/edit/:id",
      //   component: EditPollResult,
      // },

      // {
      //   path: "/pollreply/list",
      //   component: ListPollReply,
      // },
      // {
      //   path: "/pollreply/add",
      //   component: AddPollReply,
      // },
      // {
      //   path: "/pollreply/edit/:id",
      //   component: EditPollReply,
      // },
      // {
      //   path: "/pollchoice/list",
      //   component: ListPollChoice,
      // },
      // {
      //   path: "/pollchoice/add",
      //   component: AddPollChoice,
      // },
      // {
      //   path: "/pollchoice/edit/:id",
      //   component: EditPollChoice,
      // },
      // {
      //   path: "/message/list",
      //   component: ListMessage,
      // },
      // {
      //   path: "/message/add",
      //   component: AddMessage,
      // },
      // {
      //   path: "/message/edit/:id",
      //   component: EditMessage,
      // },
      // {
      //   path: "/report",
      //   component: SummaryReport,
      // },

      // {
      //   path: "/tabs",
      //   component: BulkTabs,
      // },
      // {
      //   path: "/tabs1",
      //   component: Departments,
      // },
      // {
      //   path: "/contact",
      //   component: ContactList,
      // },
      // {
      //   path: "/contact/add",
      //   component: AddContact,
      // },
      // {
      //   path: "/contact/edit/:id",
      //   component: EditContact,
      // },
      // {
      //   path: "/group",
      //   component: ListContactGroup,
      // },
      // {
      //   path: "/group/add",
      //   component: AddContactGroup,
      // },
      // {
      //   path: "/group/edit/:id",
      //   component: EditContactGroup,
      // },

      // {
      //   path: "/bulkunit",
      //   component: ListBulkUnit,
      // },

      // {
      //   path: "/bulkunit/add",
      //   component: AddBulUnit,
      // },
      // {
      //   path: "/bulkunit/edit/:id",
      //   component: EditBulkUnit,
      // },

      {
        path: "/contents",
        name:'contents',
        component: ContentList,
      },
      // {
      //   path: "/billing/add",
      //   component: AddBilling,
      // },
      // {
      //   path: "/billings",
      //   component: BillingList,
      // },
      {
        path: "/subscriptions",
        name:'subscriptions',
        component: SubscriptionList,
      },
      {
        path: "/subscription/edit/:id",
        component: EditSubscription,
      },
      {
        path: "/subscription/add",
        component: AddSubscription,
      },

      // {
      //   path: "/schedule/add",
      //   component: AddSchedule,
      // },
      // {
      //   path: "/schedules",
      //   component: ScheduleList,
      // },

      // {
      //   path: "/service/add",
      //   component: AddService,
      // },
      // {
      //   path: "/service/edit/:id",
      //   component: EditService,
      // },
      // {
      //   path: "/services",
      //   component: ServiceList,
      // },
      {
        path: "/shortcode/add",
        name:'shortcode',
        component: AddShortcode,
      },
      {
        path: "/shortcode/edit/:id",
        component: EditShortCode,
      },
      {
        path: "/shortcodes",
        name:'shortcodes',
        component: ShortcodeList,
      },
      // {
      //   path: "/settings",
      //   component: SettingList,
      // },
      {
        path: "/outbox",
        name:'outbox',
        component: OutboxList,
      },
      // {
      //   path: "/outboxstat",
      //   component: OutboxStats,
      // },
      {
        path: "/inbox",
        name:'inbox',
        component: InboxList,
      },
      // {
      //   path: "/register",
      //   component: Register,
      // },
      {
        path: "/bulk/send",
        component: AddBulk,
      },
      {
        path: "/bulk/list",
        name:'bulklist',
        component: BulkList,
      },
      // {
      //   path: '/bulk/:id',
      //   name: 'BulkItem',
      //   component: BulkItem,
      //   props: true
      // },

      // {
      //   path: '/transaction',
      //   name: 'transaction',
      //   component: ListTransactions,
      // },
      {
        path: "/user/add",
        name: "adduser",
        // lazy-loaded
        component: AddUser,
      },

      {
        path: "/user/editUser/:id",
        name: "editUser",
        // lazy-loaded
        component: EditUser,
      },

    ]
  },
 
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  //Page Not found
   {
    path : '/:catchAll(.*)',
    name : 'PageNotFound',
    component : PageNotFound
  },

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record=>record.meta.requiresAuth)){
//     if(!store.state.loggedIn){
//       next({path:{
//         path:'/login'
//       }})
//     }else{
//       next()
//     }

//   }else{
//     next()
//   }
// })

export default router
