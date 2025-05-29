import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets.js'
import moment from 'moment'
import Footer from '../components/Footer'

function Applications() {
  const [isEdit, setIsEdit] = useState(false)
  // save resume data
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit ? (
            <>
              <label htmlFor="resumeUpload" className='flex items-center cursor-pointer'>
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
                <input 
                  accept='application/pdf' 
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  id='resumeUpload'
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="Upload icon" />
              </label>
              <button 
                className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 cursor-pointer'
                onClick={() => { setIsEdit(false); console.log(resume) }}
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>
                Resume
              </a>
              <button 
                onClick={() => setIsEdit(true)} 
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* user applied for a job */}
        <h2 className='text-2xl font-semibold mb-4'>Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b text-left'>Company</th>
                <th className='py-3 px-4 border-b text-left'>Job Title</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='py-4 px-4 border-b'>
                    <div className='flex items-center gap-2'>
                      <img src={job.logo} alt={`${job.company} logo`} className='w-8 h-8 rounded-full'/>
                      <span>{job.company}</span>
                    </div>
                  </td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b'>
                    <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-200' : 'bg-blue-100'} px-4 py-2 rounded-lg`}>
                        {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Applications
