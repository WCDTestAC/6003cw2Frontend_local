import 'antd/dist/reset.css';
import React from "react";
import { Row, Col, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { getCurrentUser } from "../authent/auth.service";

import SearchUser from './userSearch'
import ImageUploader from './ImageUploader'
import UpdateForm from "./UpdateForm";


const Profile: React.FC = () => {
 
  const currentUser = getCurrentUser();
console.log('current user' + JSON.stringify(currentUser))
  return (
    <>
     <p></p>
        <h2 style={{color:"#135200",marginLeft:"15px"}}>
          <strong>{currentUser.username}</strong> Profile
        </h2>
         
      
<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row >  
        <Col span={12}>   
       <div className="Profile" style={{marginLeft:"15px"}} >
      <table   rules="all" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>

        <tr>
          <th align="left" style={{background:"#d3f261"}} >userID:  </th>
          <td style={{background:"#d3f261"}}>{currentUser.id}</td> 
        </tr>
        <tr>
          <th align="left" style={{background:"#f4ffb8"}}>Username:   </th>
          <td style={{background:"#f4ffb8"}}>{currentUser.username}</td>
        </tr>  
        <tr> 
          <th align="left" style={{background:"#d3f261"}}>Email:  </th> 
          <td style={{background:"#d3f261"}}>{currentUser.email}</td>
        </tr> 
 
 
         <tr> 
          <th align="left" style={{background:"#f4ffb8"}} >Role: </th>
         <td style={{background:"#f4ffb8"}}>{currentUser.role}</td>
        </tr>

        <tr> 
         <th align="left" style={{background:"#f4ffb8"}}>Login token:  </th>
         <td style={{background:"#f4ffb8"}}>{localStorage.getItem('aToken')?.substring(0, 20)}</td>
         </tr>  

    </table>
    </div>
    </Col>
    {/* To search user if login by admin */}
    <Col span={12}>
      { currentUser.role=="admin"&& 
      <SearchUser authbasic={ `${currentUser.atoken}`}/>}
    </Col>

      {/* upload image function */}
      <Col span={18}>
        <div style={{marginLeft:"15px",marginBottom:"15px"}}>
      { currentUser.role=="admin"&&  <ImageUploader />}
      </div>
      </Col>
     

     {/* For admin to create the pet record */}
      <Col span={18}>
        
        <div style={{marginLeft:"15px",marginBottom:"15px"}}>
        { currentUser.role=="admin"&&  <UpdateForm  isNew={true} />}
        { currentUser.role=="admin"&&  <h3> Create Pet Record</h3>}
        </div>
      </Col>    

      </Row>
        
      
     </Space>      
      
            </>
  )

};

export default Profile;
