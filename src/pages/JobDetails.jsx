import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../components/PageHeader';
import { BiSolidShoppingBags } from  "react-icons/bi";
import { FiMapPin,FiCalendar, FiClock, FiDollarSign, } from  "react-icons/fi";
import { PiSubtitlesFill } from "react-icons/pi";
import { SiLevelsdotfyi,SiNamesilo } from "react-icons/si";

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState([])
    useEffect(() => {
       fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data))
    }, [])
  
   const handleApply = async() => {
        const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: "job applied successfully"
});
   }
   
   return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-5'>
      <PageHeader title={"Single Job Page"} path={"single job"}/>
        <h1 className='py-5 font-bold'>Job Id: {id}</h1>
        <h1 className='text-blue text-3xl font-bold mb-3'>Job details</h1>
        <p><i>Here's how the job details align with your job prefernce.Manage</i></p>
        <p><i>job prefernce anytime in your profile</i></p>
        <h2 className='text-black py-5 text-2xl flex items-center gap-2'><BiSolidShoppingBags />Job type</h2>
        <h1 className='py-2 flex items-center gap-2'><PiSubtitlesFill />Job Title:   {job.jobTitle}</h1>
        <h1 className='py-2 flex items-center gap-2'><SiNamesilo />Company Name: {job.companyName}</h1>
        <h1 className='py-2 flex items-center gap-2'><FiDollarSign/>Salary Type: {job.salaryType}</h1>
        <h1 className='py-2 flex items-center gap-2'><FiMapPin/>JobLocation: {job.jobLocation}</h1>
        <h1 className='py-2 flex items-center gap-2'><FiCalendar/> Posting Date: {job.PostingDate}</h1>
        <h1 className='py-2 flex items-center gap-2'><SiLevelsdotfyi />Experience Level: {job.experienceLevel}</h1>
        <h1 className='py-2 flex items-center gap-2'><FiClock/>Employment Type: {job.employmentType}</h1>

        <h2 className='text-black py-5 text-2xl flex items-center gap-2 font-bold mb-3'>Job Description</h2>

        <p className='py-2 flex items-center gap-2'>This position reports to the Human Resources (HR) director and
interfaces with company managers and HR staff. Company XYZ is
committed to an employee-orientated, high performance culture that
emphasizes empowerment, quality, continuous improvement, and the
recruitment and ongoing development of a superior workforce.</p>
<p className='py-2 flex items-center gap-2'>The intern will gain exposure
to these functional areas: HR Information Systems; Employee relations; Training and development;
Benefits; Compensation; Organization development; Employment</p>
<p className='py-2 flex items-center gap-2'>Specific responsibilities: - Employee orientation and training logistics and recordkeeping
- Company-wide committee facilitation and participation
- Employee safety, welfare, wellness and health reporting
- Provide direct support to employees during implementation of HR
services, policies and programs</p>
<p className='py-2 flex items-center gap-2'>What skills will the
intern learn: - Active participation in strategic planning process, including
 developing goals, objectives and processes
- How to engage professionally in HR meetings and seminars with
other HR professionals in the region
- Gain experience with Human Resources Information system (HRIS)
database management and record keeping
- Application of HR law and compliance with governmental regulations</p>

        <button className='bg-blue px-8 py-2 text-white flex items-center gap-2 ' onClick={handleApply}>Apply Now</button>
       
    </div>
  )
}

export default JobDetails