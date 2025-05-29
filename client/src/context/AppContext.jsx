import React, { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    }) //search for jobs and location

    const [isSearched, setIsSearched] = useState(false); //button clicking

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    //function to get jobs data from assets file
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs();
    },[])

    return (
        <AppContext.Provider value={{
            searchFilter,
            setSearchFilter,
            isSearched,
            setIsSearched,
            jobs,setJobs,
            showRecruiterLogin,
            setShowRecruiterLogin,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}