import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true, // Ensure credentials (cookies) are sent
                });
            
                if (res.data.success) {
                    if (res.data.jobs && res.data.jobs.length > 0) {
                        dispatch(setAllJobs(res.data.jobs));
                    } else {
                        console.log("No data found");
                    }
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    console.log("Unauthorized: Please check your credentials.");
                    // Handle unauthorized error (e.g., redirect to login)
                } else {
                    console.log("Error fetching jobs:", error);
                    console.log("Error response data:", error.response?.data); // Additional error details
                }
            }
            
        };

        fetchAllJobs();
    }, [searchedQuery]); // Added searchedQuery as a dependency
}

export default useGetAllJobs;
