import {Box,TextField,Button,styled,Typography} from '@mui/material';
import {useState,useContext,useEffect} from 'react';

import { API } from '../../service/api.js';

import { DataContext } from '../../context/DataProvider.jsx';

import { useNavigate } from 'react-router-dom';

const Component =styled(Box)`             
    width:600px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);

`;

const Image = styled('img')({
    width:200,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
});

const Wrapper =styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction: column;
    & > div, & > button, & >p  {
        margin-top:20px;
    }
`
const LoginButton = styled(Button)`
    text-transform:none;
    background:pink;
    color:white;
    height:48px;
    border-radius:2px;
    ${'' /* &:hover {
        background:lightblue
    } */}
`

const SignupButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
    ${'' /* &:hover {
        background:lightgreen
    } */}
`

const Text = styled(Typography)`
    color:#878787;
    font-size:16px;
`

const signupInitialValues ={
    name:'',
    username:'',
    password:''
}

const signInInitialValues ={
    username:'',
    password:''
}

const Error = styled(Typography)`
    font-size: 10px;
    ${'' /* color: #ff6161; */}
    color:red;
    line-height:1;
    margin-top:10px;
    font-weight:600;
`

const Login =({isUserAuthenticated}) =>{
    
    const [account,toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error,setError] = useState('');
    const [login,setLogin] = useState(signInInitialValues);
    
    const navigate = useNavigate();
    const  {setAccount} = useContext(DataContext);
    
    const imageURL ='https://th.bing.com/th/id/OIP.hG3--7knex7nuaoRgFaRlQHaEJ?pid=ImgDet&rs=1' ;

    useEffect( () => {
            setError(false);
    }, [login])


    const OnValueChange = (e) => {
        setLogin({...login,[e.target.name]: e.target.value });

    }

    const OnInputChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value });
    }
   
   
   

    const loginUser = async () => {
        let response = await API.userSignIn(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
            

            setAccount({name:response.data.name,username:response.data.username});
            isUserAuthenticated(true);
            setLogin(signInInitialValues);
            navigate('/');

        } else {
            setError('Something went wrong! Please try again later');
            
        }
        
    }

    

    const signUpUser = async () => {
        let response = await API.userSignup (signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        }else {
            setError('Something went wrong! Please try again later');   
             
        }
    }

   
    const toggleSignup =()=>{
        account === 'signup'? toggleAccount('login'): toggleAccount('signup');
    }
  
    


    return (
        <Component>
        <Box >
            <Image src={imageURL} alt="login"/>
            
              {  account === 'login'?
                <Wrapper>
            <TextField variant='standard' value={login.username} onChange={(e) => OnValueChange(e)} name='username' label='Enter username' />
            <TextField variant='standard' value={login.password} onChange={(e) => OnValueChange(e)} name='password' label ='Enter password' />
           
           
            { error && <Error> {error} </Error> }
            
            <LoginButton variant='contained' onClick={()=> loginUser()}>Login</LoginButton>
           
            <Text style={{textAlign:'center'}}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
            </Wrapper> 
            :
            <Wrapper>
            <TextField variant='standard' onChange={(e)=> OnInputChange(e)} name='name' label ='Enter Name' />
            <TextField variant='standard' onChange={(e)=> OnInputChange(e)} name='username' label ='Enter Username' />
            <TextField variant='standard' onChange={(e)=> OnInputChange(e)} name='password' label ='Enter Password' />
            
            { error && <Error> {error} </Error> }
            
            <SignupButton onClick={() => signUpUser()}>Signup</SignupButton>
            <Text style={{textAlign:'center'}}>OR</Text>
            <LoginButton variant='contained' onClick={()=>toggleSignup()}>Already have an account</LoginButton>
            </Wrapper>

            }

        </Box>
        </Component>
    )
}

export default Login;

