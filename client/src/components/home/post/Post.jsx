
import { Box, Typography,styled } from "@mui/material";
import {addElipsis} from '../../../utils/common-utils'

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius:10px;
    margin:10px;
    margin:
    height: 50px;
    ${'' /* center mai move karne ke liye */}
    display:flex;
    align-items:center;
    flex-direction:column;
    & > p {
        padding: 0 5px 5px 5px ;
    }

`;
const Image = styled('img')({
    width:'100%',
    borderRadius: '10px 10px 0 0 ',
    objectFit:'cover',
    height:150, //image ki height barabar rahe uske liye

});

const Text = styled(Typography)`
    color:#87878;
    font-size:12px;

`;

const Heading = styled(Typography)`
    font-size:18px;
    font-weight:600;
`

const Details = styled(Typography)`
    font-size:14px;
    word-break: break-word;
    ${'' /* ellipsis dalana hota jyada lamba description hota hai tho ... lagane ke liye so uske liye coomon utils mai addElisis ke naam se ek funtion banakar export karna hoga */}
`


const Post = ({post}) => {

    const url = post.picture ? post.picture : 'https://th.bing.com/th/id/OIP.KQWM_RqYbY7VCDxbzyt0fgHaFb?pid=ImgDet&rs=1'
    return (
        <Container>
            <Image src={url} alt="blog"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.description,100)}</Details>
        </Container>
    )
}


export default Post;