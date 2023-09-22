import React, { useState } from 'react';
import userService from "../services/userServices"
import { useNavigate, Link } from 'react-router-dom';


function Register() {
	const navigate = useNavigate();
	const [registerData, setRegisterData] = useState({ email: "", username: "", password: "" })

	const handleUserRegister = async () => {
		try {
			console.log('Calling Register Backend', registerData)
			const res = await userService.handleRegister(registerData);
			console.log(res);
			if(res.status === 200){
				navigate('/' ,{state:{coming_from:"register"}});
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			console.log(e)
			handleUserRegister();
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className="min-h-screen flex flex-col bg-[#ececec] py-[50px] items-center justify-start">
			<div className="w-[30%] p-[50px_25px] bg-white">
				<div className="w-full flex flex-col items-center justify-start">
					<h2 className='text-[36px] leading-[48px] font-[600] text-teal-700'>Sign up for Conative Emails</h2>
					<h4 className='mt-[50px] font-[500]'>Create a free account?<Link to="/" className='ml-[15px] text-teal-600 border-b-[1px] border-b-teal-600'>Log in</Link></h4>
					<form onSubmit={handleSubmit} className='w-full flex flex-col gap-[25px] mt-[50px]'>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[14px] mb-[10px]'>Business Email</p>
							<input onChange={(e)=>{setRegisterData(prev => ({...prev, email:e.target.value}))}} value={registerData?.email} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[14px] mb-[10px]'>Username</p>
							<input onChange={(e)=>{setRegisterData(prev => ({...prev, username:e.target.value}))}} value={registerData?.username} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[14px] mb-[10px]'>Password</p>
							<input onChange={(e)=>{setRegisterData(prev => ({...prev, password:e.target.value}))}} value={registerData?.password} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start'>
							<p className='text-[12px]'>By creating an account, you agree to our <a href="#"> Terms</a> and have read and acknowledge the <a href="#"> Global Privacy Statement.</a></p>
						</div>
						<div className="text-center">
							<button className='common-button bg-teal-700 hover:bg-teal-800 transition-all text-white font-[500] rounded-full w-full' style={{border:'none', padding:'15px 60px'}}>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>

	)
};
export default Register;