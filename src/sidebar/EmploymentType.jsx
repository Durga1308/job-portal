import InputField from '../components/InputField'
const EmploymentType = ({ handleChange }) => {
  return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Type of employment</h4>

            <div>
                <label className='sidebar-label-container'>
                    <input
                        type='radio'
                        name='test'
                        id='test'
                        value=''
                        onChange={handleChange}
                    />
                    <span className='checkmark'></span>Any Experience
                </label>

                <InputField
                 handleChange={handleChange} 
                 value="temporary"
                  title="Temporary"
                   name="test" 
                    id='test'
                   />
                <InputField 
                handleChange={handleChange} 
                value="full-time" 
                title="Full-time" 
                name="test"
                id='test'
                 />
                <InputField 
                handleChange={handleChange} 
                value="part-time" 
                title="Part-time" 
                name="test"
                id='test'
               />
            </div>
        </div>
  )
}

export default EmploymentType