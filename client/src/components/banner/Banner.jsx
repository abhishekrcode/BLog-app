import { Box,styled,Typography } from "@mui/material";



const Image =styled(Box)`
    ${'' /* background:url(https://th.bing.com/th/id/R.b30626c23c9d0f59aa011d33fbc0cdc9?rik=tPn11HqEcw6s8g&riu=http%3a%2f%2f2.bp.blogspot.com%2f_oalwC3a4OAg%2fTANDqFQsjbI%2fAAAAAAAABS8%2fkpBHJhXxceY%2fs1600%2fBlog_Background.jpg&ehk=p5kwW%2f%2bWYo3y7PUF5XWUetWzm9VoYn9VW4zXwclJHzI%3d&risl=&pid=ImgRaw&r=0); */}
    background:url(https://img.freepik.com/premium-photo/cloud-background-with-pastel-colour_66899-764.jpg?w=996);
    width:100%;
    height:50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    background-repeat:no-repeat;
    background-size:cover;

`

const Heading = styled(Typography)`
    font-size:70px;
    color:white;
    line-Height: 1.2;
    font-family:cursive;
`

const SubHeading = styled(Typography)`
    font-size:20px;
    ${'' /* background:inherit; */}
    color:white;
    font-family:cursive;
`


const Banner = () => {
   return (
    <Image>
        <Heading>BLOG</Heading>
        <SubHeading>Share your Experience...</SubHeading>
    </Image>
   )
}    

export default Banner;