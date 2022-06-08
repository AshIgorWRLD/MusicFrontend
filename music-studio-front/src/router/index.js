import About from "../pages/About";
import PostIdPage from "../pages/post/PostIdPage";
import Posts from "../pages/post/Posts";
import Login from "../pages/Login";
import Users from "../pages/user/Users";
import UserIdPage from "../pages/user/UserIdPage";
import Groups from "../pages/group/Groups";
import GroupIdPage from "../pages/group/GroupIdPage";
import Clients from "../pages/client/Clients";
import ClientIdPage from "../pages/client/ClientIdPage";
import Events from "../pages/event/Events"
import EventIdPage from "../pages/event/EventIdPage";
import Artists from "../pages/artist/Artists";
import ArtistIdPage from "../pages/artist/ArtistIdPage";

export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
    {path: '/users', component: Users, exact: true},
    {path: '/users/:id', component: UserIdPage, exact: true},
    {path: '/groups', component: Groups, exact: true},
    {path: '/groups/:id', component: GroupIdPage, exact: true},
    {path: '/clients', component: Clients, exact: true},
    {path: '/clients/:id', component: ClientIdPage, exact: true},
    {path: '/events', component: Events, exact: true},
    {path: '/events/:id', component: EventIdPage, exact: true},
    {path: '/artists', component: Artists, exact: true},
    {path: '/artists/:id', component: ArtistIdPage, exact: true}

]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]
