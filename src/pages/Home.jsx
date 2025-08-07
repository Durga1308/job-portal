import { useEffect, useState } from "react"; 
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import UploadResume from "../components/UploadResume";
  
const Home = () => {
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [jobs, setJobs] = useState([]);
      const[isLoading, setIsLoading] = useState(true);
      const[currentPage, setCurrentpage] = useState(1);
      const itemsPerPage = 6;

      useEffect(() => {
        setIsLoading(true);
        fetch(`jobs.json`)
        .then((res) => res.json())
        .then((data) => {

          setJobs(data);
          setIsLoading(false)
        })
      }, [])
      // handle input change
      const [query, setQuery] = useState("");
      const handleInputChange = (event) => {
          setQuery(event.target.value)
      }
      // filter jobs by title
      const filteredItems = jobs.filter(
        (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      console.log(filteredItems)

      //----- Radio filter -------
      const handleChange = (event) => {
        setSelectedCategory(event.target.value)
      }

      //----button based filtering -----
      const handleClick = (event) => {
        setSelectedCategory(event.target.value)
      }

      // calculate the index range
      const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex, endIndex};
      }

      // funtion for the next page
      const nextPage = () => {
        if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
          setCurrentpage(currentPage + 1);
        }
      }

      // funtion for the previous page
      const prevPage = () => {
        if(currentPage > 1){
          setCurrentpage(currentPage - 1)
        }
      }
      // main funtion
      const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;

        // filtering Input items
        if(query){
          filteredJobs =filteredItems;
        }

        //category filtering
        if(selected) {
          filteredJobs = filteredJobs.filter(
            ({
              jobLocation,
              maxPrice,
              experienceLevel,
              salaryType,
              employmentType,
              postingDate
            }) => 
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
          );
          console.log(filteredJobs);
        }

      // slice the data based on current page
      const {startIndex, endIndex} = calculatePageRange();
      filteredJobs = filteredJobs.slice(startIndex, endIndex)
     return filteredJobs.map((data, i) => <Card key={i} data={data}/>);
   }
   const result = filteredData(jobs,selectedCategory,query);
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
        <Sidebar handlechange={handleChange} handleclick={handleClick}/>
        </div>

       {/* job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ? (<p>Loading....</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
            <h3>{result.length} Jobs</h3>
            <p>No data found!</p>
            </>
          }
          
          {/*pagination here */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
          <button 
          onClick={prevPage}
           disabled={currentPage === 1} 
           className="hover:underline">Previous</button>
          <span className="mx-2">
            Page {currentPage} of{" "}
             {Math.ceil(filteredItems.length / itemsPerPage)}
             </span>
          <button 
          onClick={nextPage}
           disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} 
           className="hover:underline">Next</button>
              </div>
            ) : ""
          }
          </div>

        {/* right side */}
        <div className="bg-white rounded"><UploadResume /></div>
      </div>
    </div>
  )
}

export default Home;