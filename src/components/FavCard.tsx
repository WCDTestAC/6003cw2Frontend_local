import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import axios from 'axios';
import {LoadingOutlined, CloseSquareOutlined,CloseSquareFilled} from '@ant-design/icons';
import PostIcon from './posticon';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { api } from './common/http-common';
import ShowComment from './comments';

const FavCard = (props:any) => {
  const [petinfos, setPetinfos] = React.useState(null);  
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState('outlined');
  const navigate: NavigateFunction = useNavigate();
  let origin:any=localStorage.getItem('a')
   
 
 React.useEffect(()=>{
  
 // console.log(`path ${api.uri}/articles/fav`)  
  //console.log (`atoken ,Basic ${localStorage.getItem('aToken')}`)         
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
   //console.log(`path ${api.uri}/articles/fav`) 
   //console.log('results.data ', JSON.stringify(results.data))
   //console.log('filterting....')
    // let filterArticle = filterPosts(results.data, JSON.parse(origin))

    let filterPets = filterPosts(results.data, JSON.parse(origin))
    console.log("filterPets", filterPets)
    setPetinfos(filterPets )
    
  })    
    .then(()=>{   
    setLoading(false); })
 },[])
  
  
  console.log('after filter petinfos ',petinfos)
  
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
 
 //  console.log("filterarray.length  ",filterarray.length)
 //  console.log("originarray.length  ",originarray.length)
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
// console.log('fav link arr ', fav.links.fav)
// console.log('fav link ', fav)
  axios.delete(fav.links.fav, {
       
        headers: {
            "Authorization": `Basic ${localStorage.getItem('aToken')}`
          }
        }        
    )
      .then((results) =>{ console.log('respone ',JSON.stringify(results.data.message))
        if(results.data.message==="removed")
      {  
          alert("This petinfos is removed from your favorite list")
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
      return(<div>There is no pet available now.</div>)
    } else {
       
     
      const Icon = getIcon(theme)
      return(<>
      
        <Row gutter={[16,16]}>
          {
            petinfos && petinfos.map(({id, petname, imageurl, links})=> (
              <Col key={id}>                                          
              <Card title={petname} style={{width: 300}}
                    cover={<img alt="petImg" src={imageurl} />} hoverable
                    actions={[
                     //<PostIcon type="like" countLink={links.likes} id={id} />,
                     <ShowComment    msgLink={links.msg} id={id}/>,
                     <PostIcon type="heart" FavLink={links.fav} id={id}/>,
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


export default FavCard;