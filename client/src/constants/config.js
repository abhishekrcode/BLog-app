// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}


//Ab actaul api banani hai.

//API SERVICE CALL
//Sample Request
//Need Service Call: {url:'./', method:'POST/GET/PUT/DELETE', params:true/false, query:true/false }

export const SERVICE_URLS ={
    userSignup:{url:'/signup', method:'POST'},
    userSignIn:{url:'/signIn', method:'POST'},
    uploadFile:{url:'/file/upload', method:'POST'},
    createPost:{url:'create', method:'POST'},
    getAllPosts:{url:'/posts',method:'GET', params:true},
    getPostById:{url:'post', method:'GET', query:true},
    updatePost:{url:'update', method:'PUT', query:true},
    deletePost:{url:'/delete', method:'DELETE', query:true},
    newComment:{url:'/comment/new', method:'POST'},
    getAllComments:{url:'comments',method:'GET',query:true},
    deleteComment: {url:'comment/delete', method:'DELETE',query:true},
}