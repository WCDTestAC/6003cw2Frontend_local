import 'antd/dist/reset.css';
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Modal} from 'antd';
import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../authent/auth.service";

  const LoginPart: React.FC = () => {

    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [toShow, setToShow] = React.useState(false); 

    const onFinish = (values:any) => {
      const { username, password } =values;

        setMessage("");
        setLoading(true);

      login(username, password).then(
        () => {
          if(localStorage.getItem("user"))
            navigate("/profile");
          window.location.reload();
        }
      )
      .catch( 
          (error)  => {
            const resMessage =
              (error.response &&error.response.data &&error.response.data.message) ||
                error.message ||
                  error.toString();
            
            window.alert(`User : ${username}, Sorry you may not have account in our system...... \nPlease try again \nIf not have the account please register`)
            console.log(error.toString());     
            
            setLoading(false);
            setMessage(resMessage);
            navigate("/");
            window.location.reload();
          }
      )

    }

  return (
    <>
      <Button icon={<LoginOutlined />} onClick={()=>{setToShow(true)}} />
      <Modal open={toShow} onCancel={()=>{setToShow(false)}} title="Welcome to Canine Shelter" footer={[]}> 

        <Form style={{margin: "5px"}} 
              name="login_form"
              layout="vertical"
              wrapperCol={{span:8}}
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
        >
          {/* Form username part */}
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input the Username!',
              },
            ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Name" />
          </Form.Item>

          {/* Form password part */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input the Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* Remember and forget part */}
          <Form.Item>

            {/* Form remember tick */}
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember</Checkbox>
            </Form.Item>
            <p></p>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>

          </Form.Item>

          {/*Choice for Login or register  */}
          <Form.Item >
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in 
            </Button>
            Or <a href="/register"> Register</a>
          </Form.Item>

        </Form>

      </Modal>
    </>  
  );

};


export default LoginPart;
