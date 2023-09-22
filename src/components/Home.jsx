import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const {isLoggedIn} = useContext(LoginContext);

	useEffect(()=>{
		if(isLoggedIn?.status === false){
			navigate("/")
		}
	})
  return (
	<div className="flex w-full h-[100vh] bg-white subtle-bg-img">
		<div className="h-full w-[50%] flex flex-col items-center jsutify-start p-[25px] gap-[15px]">
			<div className="rounded-[10px] shadow-sm w-full pb-[25px]">
				<h3 className="stats-number text-dark-green capitalize	">{`Welcome back!`}</h3>
			</div>
			<div className="rounded-[10px] shadow-sm w-full relative">
				<h3>Total Audiences:</h3>
				<h3 className="stats-number text-dark-green">23</h3>
				<button onClick={()=>{navigate("/manage/audiences")}} className="common-subtle-button rounded-full right-[15px]" style={{backgroundColor:'#ececec'}}>Manage Audiences</button>
			</div>
			<div className="rounded-[10px] shadow-sm w-full">
				<h3>Total Contacts:</h3>
				<h3 className="stats-number text-dark-green">1800 +</h3>
			</div>
			<div className="rounded-[10px] shadow-sm w-full">
				<h3>Events Organized:</h3>
				<h3 className="stats-number text-dark-green">50 +</h3>
			</div>
		</div>
		<div className="home-section-left h-full p-[25px] w-[50%] flex flex-col items-start justify-center bg-light-pink ">
			<h1 className="text-dark-green text-[62px] leading-[76px] font-semibold w-[50%]">Let&apos;s jump right into it.</h1>
			<div className="w-full mt-[20px]">
				<Link to={"/manage/audiences"}><button className="common-button common-button-green arrow-right-button py-[15px] px-[50px] border-2 rounded-full">Start Marketing</button></Link>
			</div>
		</div>
	</div>
  )
}

export default Home