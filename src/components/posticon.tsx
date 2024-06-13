import React from 'react';
import axios from 'axios';
import { LikeOutlined,LikeFilled,HeartOutlined,HeartFilled} from '@ant-design/icons';
import { getCurrentUser } from "../authent/auth.service";
import { NavigateFunction, useNavigate } from 'react-router-dom';

function getIcon (theme:any, iconType:any) {
  let Icon:any;

  if (theme === 'filled') {
    if (iconType === 'like') {
      Icon = LikeFilled
    } else if (iconType === 'heart') {
      Icon = HeartFilled
    } 
  } else if (theme === 'outlined') {
    if (iconType === 'like') {
      Icon = LikeOutlined
    } else if (iconType === 'heart') {
      Icon = HeartOutlined
    } 
  }
 
  return Icon;
}

  const  PostIcon = (props:any) =>{

    const [selected, setSelected] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const theme = selected ? 'filled' : 'outlined'; 
    const iconType = props.type;
    const Icon = getIcon(theme, iconType);
    const currentUser = getCurrentUser();
    const navigate: NavigateFunction = useNavigate();

    const onclick = () =>{
    console.log('currentUser',  currentUser)
    
      if((!currentUser))
        {alert("Please. Login for procceed this action")}
      else  
        if(props.type=='like')  {
          setSelected(!selected);
          postLike();
        }
      else
        if(props.type=='heart') {
          addFav();
          setSelected(!selected);
        }
    };
    
  

  function postLike()
  {
    if(props.type=='like'&&currentUser.username!="undefined"){ 
      console.log(`logging like: ${currentUser.username} `)
         
      return (axios.post
        (props.countLink, '', {
          headers: {
            'Authorization': `Basic ${localStorage.getItem('aToken')}`
          }
        })    
        .then(responsejson =>{ 
                console.log('responsejson.data ',responsejson.data)
                if(responsejson.data.userid&&responsejson.data.message==="liked")
              {   
                  alert("Post liked")
        
                  window.location.reload();
                }
                else{
                  alert("you have post like already")
                }
        })
        .catch(err => {
              console.log(`${props.type} Check network problems please. ${props.id}`);
                alert("Check network problems");
        })
      )

    }
  }
  
  function addFav() 
  {
    if(props.type=='heart'&&currentUser.username!="undefined"){ 
      
      console.log(`logging fav: ${currentUser.username} password: ${currentUser.password}`)
      
      return (
        axios.post(props.FavLink, '', {
            headers: {
              'Authorization': `Basic ${localStorage.getItem('aToken')}`
            }
        })   
            .then(responsejson =>{ if(responsejson.data.userid&&responsejson.data.message==="added")
            {
             alert("Favourite dog added")
             navigate("/favpage");
             window.location.reload();
            }
               else(alert("you have add this dog to favourite already"))
            })
            .catch(err => {
            console.log('err ', err)
            console.log(`${props.type} Check network problems please. ${props.id}`);
            alert("Check network problems");
            })
      )

    }
  }

  React.useEffect(()=>{
    if(props.type=='like'){
      console.log("props.countLink ",props.countLink)
      axios.get(props.countLink)
      .then((res)=>{
        console.log(' res ', res.data)
        setCount(res.data);
        console.log('count ', count)
      })
      .catch(err => {
        console.log('err ', err)
        console.log(`${props.type} icon error for post ${props.type} `)
      });
    }
   });
    
    return (
      
      <span>        
        <Icon
          onClick={onclick}   
          style={{color:'steelblue'}}  />
         {props.type=='like'&&count}
      </span> 

    )

}

export default PostIcon;
