import 'antd/dist/reset.css';
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Button,  Modal, Typography} from 'antd';
import { EditOutlined,EditFilled } from '@ant-design/icons';
import axios from "axios";

import { api } from './common/http-common';
import { getCurrentUser } from "../authent/auth.service";

const { Title } = Typography;
const { TextArea } = Input;
    
const UpdateForm: React.FC = (props:any) => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [toShow, setToShow] = React.useState(false); 
    const aa:any = JSON.parse(localStorage.getItem('e') || "{}");

    const contentRules = [
        {required: true, message: 'Please input / change the value here '}    
      ]
      
      const handleFormSubmit  = (values: any) => {
        const t = values.petname;
        const a = values.petsummary;
        const d = values.description;
        const u = values.imageurl;
        const currentUser = getCurrentUser();
       
        const postPet = {
          petname: t,
          petsummary: a,
          description:d,
          imageurl:u,
          authorid: currentUser.id
        }
       
        if(props.isNew==false){
       console.log(`path: ${api.uri}/petinfos${props.aid}`)
        axios.put(`${api.uri}/petinfos/${props.aid}`, postPet, {
            headers: {
              'Authorization': `Basic ${localStorage.getItem('aToken')}`
            }
          })
            .then((res)=> {
            alert("Pet record updated")
            console.log(res.data);
            localStorage.removeItem("e");
             navigate("/");
            window.location.reload();
        });
      }
       else
       {console.log(`path: ${api.uri}/petinfos`)
        axios.post(`${api.uri}/petinfos`, postPet, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('aToken')}`
        }
      })
        .then((res)=> {
        alert("New pet record created")
        console.log(res.data);
         navigate("/");
        window.location.reload();
      });
      }
    }
  return (
    <>
      <Button icon={<EditOutlined />} onClick={()=>{setToShow(true)}} />
      <Modal open={toShow} onCancel={()=>{setToShow(false)}} title="Welcome User" footer={[]}> 
    <p></p>
    {props.isNew?(<Title level={3} style={{color:"#0032b3"}}>Create New Pet record</Title>):
                 (<Title level={3} style={{color:"#0032b3"}}>Update Pet information</Title>)}
    <Form name="pet" onFinish={(values)=>handleFormSubmit(values)}>

    <Form.Item name="petname" label="Title" rules={contentRules}>
      
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.petname} />)}
      </Form.Item>
      <Form.Item name="petsummary" label="About the pet" rules={contentRules}>
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.petsummary} />)}       
      </Form.Item>
      <Form.Item name="description" label="Detail Description" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.description} />)}
      </Form.Item>
      <Form.Item name="imageurl" label="ImageURL" >
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.imageurl} />)}  
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit the change</Button>
      </Form.Item>  

    </Form>
    </Modal>
    </>
  );
};


export default UpdateForm;
