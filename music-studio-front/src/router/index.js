import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import Users from "../pages/Users";
import UserIdPage from "../pages/UserIdPage";
import Groups from "../pages/Groups";
import GroupIdPage from "../pages/GroupIdPage";

export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/users', component: Users, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
    {path: '/users/:id', component: UserIdPage, exact: true},
    {path: '/groups', component: Groups, exact: true},
    {path: '/groups/:id', component: GroupIdPage, exact: true}

]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]
