import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

function JobListing() {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false)
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategories = (category) => {
        setSelectedCategories(
            (prev) => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocations = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        )
    }

    //filtered data by using category and location
    useEffect(() => {
        //filterdata using selected categories
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        //filterdata using selected locations
        const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)
        //filterdata using search title
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        //filterdata using search location
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocation, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* sidebar  */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {isSearched && (searchFilter.title !== '' || searchFilter.location !== '') &&
                    (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600 '>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={(e) => setSearchFilter(prev => ({ ...prev, title: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img onClick={(e) => setSearchFilter(prev => ({ ...prev, location: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }
                <button className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'
                    onClick={(e) => {
                        if(showFilter){
                            setShowFilter(false)
                        }
                        else{
                            setShowFilter(true)
                        }
                    }}
                >
                    {showFilter ? "Close" : "Filters"}
                </button>
                {/* Category Filter  */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium py-4 text-lg'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125'
                                     type="checkbox"
                                     onChange={() => handleCategories(category)}
                                    checked={selectedCategories.includes(category)} />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* location Filter  */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium py-4 text-lg pt-14'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input className='scale-125'
                                 type="checkbox"
                                 onChange={() => handleLocations(location)}
                                 checked={selectedLocation.includes(location)}
                                />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* job listing  */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get Your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {/* <JobCard/> */}
                    {filteredJobs.slice((currentPage-1)*6, currentPage*6).map((job, index) => (
                        <JobCard key={index} job={job}/>
                    ))}
                </div>
                {/* pagination  */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img src={assets.left_arrow_icon} alt="" onClick={() => setCurrentPage(Math.max(currentPage-1, 1))}/>
                        </a>
                        {Array.from({length:Math.ceil(filteredJobs.length/6)})
                        .map((_,index) => (
                            <a href="#job-list" key={index}>
                                <button onClick={() => setCurrentPage(index+1)} className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img src={assets.right_arrow_icon} alt="" onClick={() => setCurrentPage(Math.min(currentPage+1, Math.ceil(filteredJobs.length/6)))}/>
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing
