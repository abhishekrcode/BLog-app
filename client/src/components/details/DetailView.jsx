
import {Box, Typography,styled } from '@mui/material'
import { useState, useEffect,useContext } from 'react';

import { Delete, Edit } from '@mui/icons-material';


import {useParams,Link, useNavigate} from 'react-router-dom'

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

//Components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
   margin: '50px 100px',
   [theme.breakpoints.down('md')]: {//md --> medium screen se niche jaayega tho
       margin: 0 
   },
}));

const Image = styled('img')({
   marginTop: '25px',
   width: '100%',
   height: '50vh',
   objectFit: 'cover',
   
});



const Heading = styled(Typography)`
   font-size: 38px;
   font-weight: 600;
   text-align: center;
   margin: 50px 0 10px 0;
   word-break: break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;
const Author = styled(Box)(({ theme }) => ({
   color: '#878787',
   display: 'flex',
   margin: '20px 0',
   [theme.breakpoints.down('sm')]: {
       display: 'block'
   },
}));

const Description = styled(Typography)`
    word-break: break-word;
` 

const DetailView = () => {
   
   const [post, setPost] = useState ({});

   const { id } = useParams(); 

   const { account } = useContext(DataContext);

   const navigate = useNavigate(DataContext);

   const url = post.picture ? post.picture : 'https://th.bing.com/th/id/OIP.KQWM_RqYbY7VCDxbzyt0fgHaFb?pid=ImgDet&rs=1';

   useEffect (() => {
    const fetchData = async () => {
         let response = await API.getPostById(id);
         if(response.isSuccess){
            setPost(response.data);
         }
    }
    fetchData();
   },[])


   const deleteBlog = async() => {
    let response = await API.deletePost(post._id);
    if(response.isSuccess){
        navigate('/');
    }
   }
 
    return (
       <Container>
            <Image src={url} alt="blog"/>

            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /> </Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{ post.description}</Description>
           <Comments post ={post}/>  
       </Container>
    )
}
export default DetailView;