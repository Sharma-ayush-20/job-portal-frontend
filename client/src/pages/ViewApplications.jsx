import React, {useState} from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

function ViewApplications() {
   const [hoverState, setHoverState] = useState(null);

    const hoverOpen = (id) => {
    if(hoverState === id){
      setHoverState(null) // Close karne ke liye null set karo
    }
    else{
      setHoverState(id) // Jo id click hui usse open karo
    }
   }

   return (
    <>
      <div className='container px-3 py-5 w-full bg-gray-50 min-h-screen'>
        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          <table className='w-full border-collapse'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>#</th>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>User name</th>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Job Title</th>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Location</th>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Resume</th>
                <th className='text-left py-3 px-4 font-semibold text-gray-700'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
             {viewApplicationsPageData.map((data, index) => (
              <tr key={index} className='hover:bg-gray-50 transition-colors'>
                 <td className='py-4 px-4 text-gray-600 font-medium'>{data._id}</td>
                 <td className='py-4 px-4'>
                   <div className='flex items-center gap-3'>
                     <img src={data.imgSrc} alt="" className='w-10 h-10 rounded-full object-cover border-2 border-gray-200' />
                     <span className='font-medium text-gray-900'>{data.name}</span>
                   </div>
                 </td>
                 <td className='py-4 px-4 text-gray-700'>{data.jobTitle}</td>
                 <td className='py-4 px-4 text-gray-700'>{data.location}</td>
                 <td className='py-4 px-4'>
                   <div className='flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer'>
                     <span className='text-sm font-medium'>Resume</span>
                     <img src={assets.resume_download_icon} alt="" />
                   </div>
                 </td>

                 <td className='py-4 px-4 relative'>
                   <button 
                     onClick={() => hoverOpen(data._id)}
                     className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                   >
                     <span className='text-gray-500 font-bold text-lg hover:cursor-pointer'>⋯</span>
                   </button>
                   {hoverState === data._id && (
                     <div className='absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-32 z-10 hover:cursor-pointer'>
                       <p className='py-2 cursor-pointer text-sm text-green-700 bg-green-200 font-medium text-center rounded'>Accept</p>
                       <p className='py-2 cursor-pointer text-sm text-red-700 bg-red-200 text-center font-medium rounded'>Reject</p>
                     </div>
                   )}
                 </td>

              </tr>
            ))}
           </tbody>  
          </table>
        </div>
      </div>
    </>
  )
}

export default ViewApplications