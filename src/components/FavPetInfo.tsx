import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import axios from 'axios';
import {LoadingOutlined, CloseSquareOutlined,CloseSquareFilled} from '@ant-design/icons';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { api } from './common/http-common';
import ShowComment from './comments';



const FavPetInfo = (props:any) => {
  const [petinfos, setPetinfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState('outlined');
  const navigate: NavigateFunction = useNavigate();
  let origin:any=localStorage.getItem('a')
   
 
 React.useEffect(()=>{
          
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${api.uri}/petinfos/fav`,
    headers: { 
      'Authorization': `Basic ${localStorage.getItem('aToken')}`
    }
  };
  
  axios.request(config)
  .then((results) => {      
    let filterPets = filterPosts(results.data, JSON.parse(origin))
    console.log("filterPets ", filterPets)
    setPetinfo(filterPets )
    
  })    
    .then(()=>{   
    setLoading(false); })
 },[])
  
  
  console.log('after filter pet ',petinfos)
  
  function getIcon (theme:string) {
    let Icon;
  
    if (theme === 'filled') 
      Icon=CloseSquareFilled
     else
      Icon=CloseSquareOutlined
    return Icon;
  }



  function filterPosts(filterarray:any[], originarray:any[]) 
  { let resArr:any=[];
 for(let i=0; i<filterarray.length;i++)
  for( let j=0; j<originarray.length;j++)
    {
      console.log("petid,originarray", filterarray[i].petid, originarray[j].id)
     if(filterarray[i].petid== originarray[j].id)
      {resArr.push(originarray[j])
      break
      }  
    }
return resArr 
  }
    
  const handleDelete = (fav:any) => {
  
    setTheme('filled')
  axios.delete(fav.links.fav, {
       
        headers: {
            "Authorization": `Basic ${localStorage.getItem('aToken')}`
          }
        }        
    )
      .then((results) =>{ console.log('respone ',JSON.stringify(results.data.message))
        if(results.data.message==="removed")
      {  
          alert("This pet is removed from your favorite list")
          navigate("/favpage");
          window.location.reload();}
        
      })
      .catch((err) => {
      console.log(`Check network problems pls. `);
         alert("Check network problems");
  })      
}

 
  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!petinfos){
      return(<div>There is no pet .</div>)
    } else {
       
     
      const Icon = getIcon(theme)
      return(<>
      
        <Row gutter={[16,16]}>
          {
            petinfos&& petinfos.map(({id, title, petsummary, imageurl, links})=> (
            <Col  key={id}>                            
             <Card title={title} style={{width: 300}}
                   cover={<img alt="example" src={imageurl} />} hoverable
                   actions={[
                    <ShowComment    msgLink={links.msg} id={id}/>,
                    <Icon onClick={()=>handleDelete({links})}/>
                  ]} 
                   >         
                  <Link to= {`/${id}`}>Details</Link>
                 
                </Card>
                
              </Col>
            ))
          }
        </Row></>
      )
    }
  }

}


export default FavPetInfo;