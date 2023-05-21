//Ab hume api call karna hai uske bht saare method hai 
//1.Javascript ke request function ka use kar sakte ho ;ekin wo deplicate ho chuka hai
//2.js6 ke fetch function ka use kar sakte ho.
//library ka use kar sakte ho jo hai axios.So hum yaha axios ko use karenge and interceptor ka use karenge.
//so Step 1. Install axios --> npm i axios in client folder
//so with the help of axios we are going to call API

//then write code 

import axios from 'axios';

import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType} from '../utils/common-utils';

const API_URL = ''; //backend ka server yaha par chal raha hai.

const axiosInstance = axios.create({
    baseURL:API_URL,
    //suppose API humara delay ho jaata hai or pending state mai chale jaata hai uske liye hum ek timeout dalna hoga suppose 10 sec ka tho uske liye hume 10000 likhna hoga.
    timeout:10000,
    headers:{
        // "Accept": "application/json, form-data", 
        "content-type": "application/json"  
    }
})

//now interceptor banana hai request and response ka
//yeh 2 callback function leta hai 1st function successful ke case mai hota hai and 2nd failed ke case mai hota hai.
axiosInstance.interceptors.request.use(
    function(config) {
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config ;
    },
    function (error){
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    function(response){
        //yaha par app loader use kar rhe ho tho yaha stop kar sakte ho

        return processResponse(response);
    },
    function(error) {
        ////yaha par app loader use kar rhe ho tho yaha stop kar sakte ho
        return Promise.reject(ProcessError(error));
    }
)

//if success -> return {is }

const processResponse = (response) => {
    if(response?.status === 200){
        return {
            isSuccess: true,
            data:response.data
        }
    }else
     { return {
        isFailure: true,
        status:response?.status,
        msg:response?.msg,
        code:response?.code
    }
  }
}

const ProcessError =(error) => {
    if(error.response){
        //Request made and server responded with a status which is out of the range 
        console.log("ERROR IN RESPONSE:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status //yaha par backend ke pass request gyi hai esliye code aa raha hai.matlab humne code bheja tha 500 karke.
        }
        
    }else if (error.request)
    {//request made but no response recieved means frontend and backend mai connection nehi hua hai.
        console.log("ERROR IN REQUEST:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:"" //but incase of this backend ke pass request nehi gyi hai tho blank rahega similaarly for nichewala part.
        }
        

    }else
    {//something happened in setting up request that treigger an error --> means pronblems in frontend side only
        console.log("ERROR IN NETWORK:",error.toJSON());
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
        

    }

}

//SERVICE_URL humara ek he object hai tho hume esmai loop lagana hoga saare request ko access karne ke liye. abhi tho ek he request hai object mai but futher bht saare request honge usmai so uske liye
//common api banayi hai 

const API ={};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {}: body,
            responseType: value.responseType,
            headers: {
                authorization:getAccessToken()
            },
            TYPE : getType(value,body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };



