import React from 'react';
import Review from './views/Buttons/ButtonDropdowns/Review';

const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Review/Review'));
const ReviewCreated = React.lazy(() => import('./views/Review/ReviewDetail'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Classes = React.lazy(() => import('./views/Buttons/Teacher'));
const Teachers = React.lazy(() => import('./views/Buttons/Buttons/Info'));

const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Reviews = React.lazy(() => import('./views/Pages/Reviews'));
const ListReview = React.lazy(() => import('./views/Pages/Reviews/ListReview'));

const TeacherProfile = React.lazy(() => import('./views/Pages/TeacherProfile/TeacherProfile'));
const Report = React.lazy(() => import('./views/Users/Report'));
const AddTeacher = React.lazy(() => import('./views/Users/AddTeacher'));

const ReviewDetail = React.lazy(() => import('./views/Pages/Reviews/ReviewDetail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/teachers', exact: true, name: 'Teachers', component: Teachers },
  { path: '/teachers/add', exact: true, name: 'Add Teachers', component: AddTeacher },
  { path: '/classes', exact: true, name: 'Classes', component: Classes },
  { path: '/review/list', name: 'Info', component: Reviews },
  { path: '/teachers/review', name: 'Review', component: ButtonDropdowns},
  { path: '/review/detail/:id',exact: true, name: 'Review1', component: ReviewCreated},
  { path: '/reports', name: 'Report', component: Report},
  { path: '/classes', name: 'Widgets', component: Widgets },
  { path: '/subjects', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/teachers/:id', exact: true, name: 'Teacher Profile', component: TeacherProfile},
  { path: '/teachers/:id/list', name: 'Info', component: ListReview },
  { path: '/review/:id', exact: true, name: 'Review Details', component: ReviewDetail },
];

export default routes;
