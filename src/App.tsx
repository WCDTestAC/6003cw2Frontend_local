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
import LoginPart from './components/LoginPart';
import Register from './components/Register';

import DetailPetInfo from './components/DetailPetInfo';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import FavPage from './components/FavPets';

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
                    src="/src/assets/logo-no-background_small.png"
                    alt="profile-img"
                    className="profile-img-card"
                    />
                </Link>
                <p></p>


            
            </Space>
            </div>
            </nav>
            
            <nav style={{float:'right'}}>
                {currentUser ? (
                <div> 
                    <Space>   
                    
                    {/* username and the user profile page */}
                    <Link to={"/profile"} >
                        {currentUser.username }
                    </Link>

                    {/* About icon to about page */}
                <Link to="/aboutus">
                <InfoCircleOutlined style={{ fontSize: '32px', }}/>
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
                        <LoginPart />
                        <Link to="/register">Register</Link> 
                    </Space>
                </div>
                )}              
            </nav>
        
        </Header>

        <Content>
            <Routes>
            <Route index element={ <Home /> } />


            <Route path="/register" element={<Register />} />
            <Route path="/:aid" element={<DetailPetInfo />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favpage" element={<FavPage />} />	

            </Routes>
        </Content>

        <Footer>
            
           
            <img
                src="/src/assets/logo-black_small.png"
                alt="profile-img"
                className="profile-img-card"
                style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
            /> <p></p> <FooterContent />
        </Footer>

        <FloatButton.BackTop />

        </Layout>
     </Router>
    )

}