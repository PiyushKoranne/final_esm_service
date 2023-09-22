import {useContext, useEffect, useState} from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { LoginContext } from '../App';

const Manager = () => {
	const [active, setActive] = useState('audience')
	const {isLoggedIn} = useContext(LoginContext);
	const navigate = useNavigate();
	useEffect(()=>{
		if(isLoggedIn?.status === false){
			navigate("/")
		}
	})
	useEffect(()=>{
		if(window.location.pathname?.startsWith('/manage/audience')){
			setActive("audience")
		} else if(window.location.pathname?.startsWith('/manage/campaign')){
			setActive("campaign")
		}
	},[window.location.pathname])
	console.log(active)
  return (
	<div className=' overflow-hidden manager-parent-container bg-white flex items-center justify-start'>
		<div className='w-[250px] h-[100vh] side-menu-container'>
			<div className=' py-[15px] px-[25px]'><h3 className='py-[10px] text-center border-b-[1px] border-[#bebebe]'>Marketing 101</h3></div>
			<div className='text-center pb-[15px]'>
				<button onClick={()=>{navigate('./campaign/new')}} className="w-[80%] common-button  hover:shadow-[0px_3px_0_0_rgba(0,0,0)] transition-all rounded-full hover:shadow-[0px_3px_0px_0px_rgba(0,0,0)] transition-all">Add Campaign</button>
			</div>
			<Link to={"./audiences"}><div style={{borderRight: active ==="audience" ? "4px solid #ffb000":"", backgroundColor:active ==="audience" ? "#ececec":""}} className='sidemenu-item bg-[url("/src/assets/icons8-audience-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat'>Audiences</div></Link>
			<Link to={"./campaigns"}><div style={{borderRight: active ==="campaign" ? "4px solid #ffb000":"", backgroundColor:active ==="campaign" ? "#ececec":""}} className='sidemenu-item bg-[url("/src/assets/icons8-contact-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat'>Campaigns</div></Link>
			{/* <Link to={"./analytics"}><div className='sidemenu-item bg-[url("/src/assets/icons8-tags-24.png")] bg-[length:18px_18px] bg-[left_10px_top_12px] bg-no-repeat analytics'>Analytics</div></Link> */}
		</div>
		<div className='overflow-auto w-[calc(100%-250px)] border-[1px] border-[#bebebe] h-[100vh]'>
			<Outlet />
		</div>
	</div>
  )
}

export default Manager