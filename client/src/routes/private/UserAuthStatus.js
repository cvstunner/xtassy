import axios 				 from 'axios';
import {Outlet} 			 from 'react-router-dom';
import {useAuth} 			 from '../../context/auth';
import {useState, useEffect} from 'react';
import PageNotFound from '../../pages/PageNotFound';

export default function UserAuthStatus(){
	const [status, setStatus] = useState(false);
	const [auth, setAuth] = useAuth();

	useEffect(() => {
		const isAuthorized = async () => {
			const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user`);
			
			if(res.data.status){
				setStatus(true);
			}
			else{
				setStatus(false);
			}
		}

		if(auth?.token){
			isAuthorized();
		}
	}, [auth?.token]);

	return status ? <Outlet/> : <PageNotFound/>;
}