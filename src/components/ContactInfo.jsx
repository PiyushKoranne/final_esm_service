import { useState, useContext } from 'react'
import { LoginContext } from '../App'
import { useLocation, useNavigate } from 'react-router-dom';
import userService from "../services/userServices";

const ContactInfo = () => {
	const {state} = useLocation();
	const navigate = useNavigate();
	const {isLoggedIn} = useContext(LoginContext);
	const [contactInfo, setContactInfo] = useState({	})
	
	const handleContactInfoSubmit = async (e) => {
		e.preventDefault();
		const data = await userService.submitUserContactInfo(contactInfo, isLoggedIn?.access_token);
		console.log(data);
		if(data?.status === 200){
			if(state?.coming_from === "register"){
				navigate('/')
			} else if(state?.coming_from === "login") {
				navigate("/home")
			}
		}
	}
	console.log(isLoggedIn);

  return (
	<div className='w-full bg-[#ffffff] min-h-screen flex flex-col items-center justify-start'>
		<div className='w-3/4 flex flex-col items-start justify-start py-[50px]'>
			<h1 className='text-[36px] leading-[52px] tracking-[0.72px] font-[600] w-[50%]'>Psst... We need some more information to comply with the email policies.</h1>
			<div className='w-full border-b mt-[5px] border-[#FFB000]'></div>
			<div className=' w-full p-[55px_25px] flex flex-col items-start justify-start gap-[15px]'>
				<form className="contact-info-form w-full" onSubmit={handleContactInfoSubmit}>
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>Company Name</p>
						<input value={contactInfo?.company} onChange={(e)=>{setContactInfo(prev =>({...prev, company:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>				
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>Street Address 1:</p>
						<input value={contactInfo?.street_address1} onChange={(e)=>{setContactInfo(prev =>({...prev, street_address1:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>				
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>Street Address 2:</p>
						<input value={contactInfo?.street_address2} onChange={(e)=>{setContactInfo(prev =>({...prev, street_address2:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>				
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>City</p>
						<input value={contactInfo?.city} onChange={(e)=>{setContactInfo(prev =>({...prev, city:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>				
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>State</p>
						<input value={contactInfo?.state} onChange={(e)=>{setContactInfo(prev =>({...prev, state:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>				
					<div className='w-full flex flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>Country</p>
						<input value={contactInfo?.country} onChange={(e)=>{setContactInfo(prev =>({...prev, country:e.target.value}))}} className='w-[30%] default-input default-input-lg' />
					</div>	
					<div className='w-full flex flex-col items-start justify-start mt-[20px]'>
						<button className='common-button common-button-lg rounded-full bg-yellow-main hover:shadow-[0px_4px_0_0_rgba(0,0,0)] transition-all'>Let's Go</button>
					</div>		
				</form>	
			</div>
		</div>
	</div>
  )
}

export default ContactInfo