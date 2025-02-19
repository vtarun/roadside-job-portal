import {useState, useEffect} from 'react';

const useFetch = (url, options = {}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    
    useEffect(()=> {
        if(!url){
            return;
        }
        setLoading(true);

        const fetchData = async () => {
            try{
                const response = await fetch(url, options);
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setData(data);
            } catch(error){                
                setError(error?.message);
            } finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [url])


    return {loading, error, data};
}

export default useFetch;