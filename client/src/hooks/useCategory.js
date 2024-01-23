import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useCategory(){
	const [catgs, setCatgs] = useState([]);

  const getCategories = async () => {
  	try{
  		const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category`);
  		if(res.data.success){
  			setCatgs(res.data.categories);
  		}
  	}catch(error){
  		console.log(error);
  	}
  }

  useEffect(() => {
  	getCategories();
  }, []);

  return catgs;
}