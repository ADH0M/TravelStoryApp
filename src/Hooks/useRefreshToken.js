import useAuth from "./useAuth";
import axios from "../Api/axios";

const useRefreshToken = () => {
    const {setAuth ,auth} = useAuth();

    const refresh =async()=>{
        try{
            const res = await axios.get('refresh' ,{withCredentials:true , headers:{
                'Content-Type':'application/json'
            }});
            setAuth((prev)=>{
                return {...prev , accessToken:res.data.accessToken ,roles:res.data.roles}
            });
            console.log('refresh Token', res.data.accessToken);
            console.log(res.data);
            
            return res.accessToken                        
        }catch(err){
            console.error(err);
        }
    };
    
    console.log(auth);
    return refresh
}

export default useRefreshToken