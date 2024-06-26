import 'antd/dist/reset.css';
import React from 'react';
import UpdateForm from './UpdateForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Button,Spin, Col, Card } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { RollbackOutlined,LoadingOutlined,CloseSquareOutlined,CloseSquareFilled,EditOutlined,EditFilled } from '@ant-design/icons';
import { getCurrentUser } from "../authent/auth.service";



const DetailPetInfo = () => {
const currentUser = getCurrentUser();
const { aid } = useParams();
const [petinfo, setPetinfo] = React.useState({id:0, petname:'', petsummary:'', summary:'',imageurl:'', authorid:0, description:""}); 
const navigate= useNavigate();
const [loading, setLoading] = React.useState(true);
const [theme, setTheme] = React.useState('outlined');

React.useEffect(() => {
  console.log(`path: ${api.uri}/petinfos/${aid}`)
    axios.get(`${api.uri}/petinfos/${aid}`)
      .then((res) => {
        setPetinfo(res.data);
        localStorage.setItem('e',JSON.stringify(res.data))  
        setLoading(false);
      }).then(()=>{
        setLoading(false);
      })  
      .catch((error) => {
        console.log('Error fetching petinfo details ')
      });
  }, [aid]);
  
  function getIcon (theme:string) {
    let Icon;
  
    if (theme === 'filled') 
        Icon=CloseSquareFilled      
    else 
        Icon=CloseSquareOutlined 
    return Icon;
  }
  
  
  const handleDelete = () => {
  
    setTheme('filled')
    axios.delete(`${api.uri}/petinfos/${aid}`, {
       
        headers: {
            "Authorization": `Basic ${localStorage.getItem('aToken')}`
          }
        }        
    )
    .then((results) =>{ console.log('respone ',JSON.stringify(results.data.message))
        if(results.data.message==="removed")
          {  
            alert("This petinfo is removed from the blog list")
            navigate("/");
            window.location.reload();
          }  
    })
    .catch((err) => {
      console.log(`Check network problems pls. `);
      alert("Check network problems");
    })      
}

       
if(loading){
  const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
  return(<Spin indicator={antIcon} />);
}
else {
  const Icon = getIcon(theme)
  return (
    <>
      <h2 style={{ color: 'green' }}> Here is detail information of {petinfo.petname}</h2>   
      
            <Col  span={24} >                                   
             <Card title={petinfo.petname} style={{width: 300,marginLeft:"100px"}}
                   cover={<img alt="put image here" src={petinfo.imageurl} />} hoverable
                  
                   actions={[                    
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===petinfo.authorid)&&<UpdateForm  isNew={false} aid={aid} />,  
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===petinfo.authorid)&& <Icon  style={{ fontSize: '32px', }} onClick={()=>handleDelete()}/>
                  ]}
              >               
                  <div> 
                    <h3>About me</h3>
                    <p>{petinfo.petsummary}</p>

                    <h3>Detail Description</h3>
                    <p> {petinfo.description}</p>
                    <Button  
                        type="primary"
                        icon={<RollbackOutlined />}
                        onClick={() => navigate(-1)} 
                        style={{float:'right'}}
                    />
                  </div> 
              </Card>   
            </Col>
    </>
  );
 }
}

export default DetailPetInfo;