import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

function JobCard({ job }) {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/apply-job/${id}`)
  }

  return (
    <div className='border shadow p-6 rounded'>
        <div className='flex justify-between items-center'>
            <img className='h-8' src={assets.company_icon} alt="" />
        </div>
        <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs'>
            <span className='bg-blue-50 border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
            <span className='bg-red-50 border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
        </div>
        <p className='text-gray-500 text-sm mt-4'
        dangerouslySetInnerHTML={{__html:job.description.slice(0, 150)}}></p>
        <div className='flex items-center mt-4 text-sm gap-4'>
            <button 
            className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
            onClick={() => {handleClick(job._id); scrollTo(0,0)}}
            >Apply Now</button>
            <button 
            className='text-gray-500 border border-gray-600 rounded px-4 py-2'
            onClick={() => {handleClick(job._id); scrollTo(0,0)}}
            >Learn more</button>
        </div>
    </div>
  )
}

export default JobCard