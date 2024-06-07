//import './App.css';
import 'antd/dist/reset.css';
import { Layout, Space,Col, FloatButton} from 'antd';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LogoutOutlined, HomeOutlined,DashboardOutlined,InfoCircleOutlined,HeartFilled } from '@ant-design/icons';

import UserType from './types/user.type';
import * as AuthService from "./authent/auth.service";

import EventBus from "./components/common/EventBus";
import FooterContent from './components/FooterContent';
import Home from './components/Home';

//added
// import { LogoutOutlined, HomeOutlined,DashboardOutlined,InfoCircleOutlined,HeartFilled } from '@ant-design/icons';
// import * as AuthService from "./services/auth.service";
// import UserType from './types/user.type';

// import EventBus from "./components/common/EventBus";


// //import Landing from "./components/Landing"


// import Login from "./components/Login";
// import Register from "./components/Register";

// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import DetailArticle from './components/DetailArticle';
// import Profile from './components/Profile';
// import FavPage from './components/favpage';

// import Copyright from './components/Copyright';

const { Header, Content, Footer } = Layout;

export default function App() {

  const [currentUser, setCurrentUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
     <Router>
      <Layout>

        <Header>              

            <nav style={{float:'left'}}>  
            <div> 
            <Space> 
                {/* icon and link to index page */}
                <Link to={"/"} >
                    <img
                    src="/src/assets/small_Coventry_University.png"
                    alt="profile-img"
                    className="profile-img-card"
                    />
                </Link>
                {/* Home icon to index page  */}
                <Link to="/">
                <HomeOutlined style={{ fontSize: '32px', }} />
                </Link>
                {/* Dashboard icon to dashboard page */} 
                <Link to="/dashboard">
                <DashboardOutlined style={{ fontSize: '32px', }}/>
                </Link>
                {/* About icon to about page */}
                <Link to="/about">
                <InfoCircleOutlined style={{ fontSize: '32px', }}/>
                </Link>
            
            </Space>
            </div>
            </nav>
            
            <nav style={{float:'right'}}>
                {currentUser ? (
                // if user is logged in
                <div> 
                    <Space>   
                    
                    {/* username and the user profile page */}
                    <Link to={"/profile"} >
                        {currentUser.username }
                    </Link>

                    {/* heart mark and user favourite page */}
                    <Link to="/favpage">
                        <HeartFilled style={{ fontSize: '32px', }}/>
                    </Link>

                    {/* logout icon and logout function */}
                    <a href="/" className="nav-link" onClick={logOut}> 
                        <LogoutOutlined style={{ fontSize: '32px', }} />
                    </a> 

                    </Space>
                </div>
                ) : (
                // if user is not logged in
                <div>
                    <Space> 
                        <Login />
                        <Link to="/register">Register</Link> 
                    </Space>
                </div>
                )}              
            </nav>
        
        </Header>

        <Content>
            <Routes>
            <Route index element={ <Home /> } />

            {/* <Route path="/dashboard" element={<Dashboard />}  />  
            <Route path="/about" element={<About />}  />
            <Route path="/:aid" element = {<DetailArticle /> } />            
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favpage" element={<FavPage />} />	 */}

            </Routes>
        </Content>

        <Footer>
            <FooterContent />
            <img
                src="/src/assets/SHAPE_logo.png"
                alt="profile-img"
                className="profile-img-card"
                style={{float:'right'}}
            />
        </Footer>

        <FloatButton.BackTop />

        </Layout>
     </Router>
    )

}