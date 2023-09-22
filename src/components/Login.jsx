import React, { useContext, useState } from 'react';
import { LoginContext } from '../App';
import userService from "../services/userServices"
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {

	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [loggerData, setLoggerData] = useState({ email: "", password: "" })
	function handleSubmit(e) {
		try {
			e.preventDefault();
			userService.handleLogin(loggerData)
				.then(res => {
					console.log('###########LOFIN RESPONSE ############\n',res);
					if (res.status === 200) {
						setIsLoggedIn(prev => ({ ...prev, status: true, username: res?.data?.username, email:res.data?.email, access_token:res.data?.access_token }));
						if(res?.data?.contact){
							navigate('/home');
						} else {
							navigate('/contact-info', {state: {coming_from:"login"}});
						}
					}
				}).catch(() => {
					setIsLoggedIn(prev => ({ ...prev, status: false, username: "", email:"", access_token:"" }));
				})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<section className="min-h-screen flex flex-col bg-[#ececec] py-[50px] items-center justify-start">
			<div className="w-[30%] p-[50px_25px] bg-white">
				<div className="w-full flex flex-col items-center justify-start">
					<h2 className='text-[36px] leading-[48px] font-[600] text-teal-700'>Log in</h2>
					<h4 className='mt-[50px] font-[500] '>Need a Conative Emails account?<Link to="/register" className='text-teal-600 ml-[15px]'>Create an account</Link></h4>
					<form onSubmit={handleSubmit} className='w-full flex flex-col gap-[25px] mt-[50px]'>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[14px] mb-[10px]'>Username or Email</p>
							<input onChange={(e)=>{setLoggerData(prev => ({...prev, email:e.target.value}))}} value={loggerData?.email} className='p-[10px] w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[14px] mb-[10px]'>Password</p>
							<input type='password' onChange={(e)=>{setLoggerData(prev => ({...prev, password:e.target.value}))}} value={loggerData?.password} className='p-[10px] w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='text-center'>
							<button className='common-button bg-teal-700 hover:bg-teal-800 transition-all text-white font-[500] rounded-full w-full' style={{border:'none', padding:'15px 60px'}}>Log In</button>
						</div>
						<div className="w-full flex flex-col gap-[15px]">
							<a style={{fontFamily:'Trebuchet MS'}} className='font-[500] text-teal-700' href="#">Forgot username?</a>
							<a style={{fontFamily:'Trebuchet MS'}} className='font-[500] text-teal-700' href="#">Forgot password</a>
							<a style={{fontFamily:'Trebuchet MS'}} className='font-[500] text-teal-700' href="#">Can't log in?</a>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Login