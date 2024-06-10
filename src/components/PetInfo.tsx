import 'antd/dist/reset.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import {LoadingOutlined} from '@ant-design/icons';
import PostIcon from './PostIcon';
import ShowComment from './comments';



const PetInfo = () => {
  const [petinfos, setPetinfos] = React.useState(null);  
  const [loading, setLoading] = React.useState(true);    
  React.useEffect(()=>{
    axios.get(`${api.uri}/petinfos`)
      .then((res)=>{
        setPetinfos(res.data);   
        localStorage.setItem('a',JSON.stringify(res.data))                        
      })
      .then(()=>{
        setLoading(false);
      })  
            
  }, []);
   
  
 
  if(loading){
    
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
    
  } else {
    if(!petinfos){
      return(<div>There is no Pet Information available now.</div>)
    } else {
       
    
      return(

      <>
        <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
          {
            (petinfos as Array<any>) && petinfos.map(({id, petname, imageurl, links})=> (
            <Col key={id}>                                          
             <Card title={petname} style={{width: 300}}
                   cover={<img alt="petImg" src={imageurl} />} hoverable
                   actions={[
                    <ShowComment msgLink={links.msg} id={id}/>,
                    <PostIcon type="heart" FavLink={links.fav} id={id}/>
                  
                  ]} 
                   >               
                  <Link to= {`/${id}`}>Details</Link>
                 
                </Card>
                
              </Col>
            ))
          }
        </Row>
        </>
      
    )
    }
  }
}


export default PetInfo;