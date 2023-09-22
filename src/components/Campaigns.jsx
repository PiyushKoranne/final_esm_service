import { Button, Dropdown, Space, Table, message } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userService from "../services/userServices"
import {format, parseISO} from "date-fns" 
import { enqueueSnackbar } from 'notistack';
import {LoginContext} from "../App"


const Campaigns = () => {
	const navigate = useNavigate();
	const [refreshTrigger, setRefreshTrigger] = useState(false);
	const {isLoggedIn} = useContext(LoginContext);
	const columns =[
		{
			title: 'Created',
			dataIndex: 'campaign_created_time',
			key: 'campaign_created_time',
		},
		{
			title: 'Campaign Name',
			dataIndex: 'campaign_name',
			key: 'campaign_name',
			render: (text) => <p className='font-[600]' style={{fontFamily:'Trebuchet MS'}}>{text}</p>,
		},
		{
			title: 'Campaign Status',
			dataIndex: 'campaign_status',
			key: 'campaign_status',
		},
		{
			title: 'Total Recepients',
			dataIndex: 'total_recepients',
			key: 'total_recepients',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render:(text, record) => (
				<div className='flex gap-[10px]'>
					<button onClick={()=>{navigate(`../campaign/${record?.campaign_id}`)}} style={{fontFamily:'Trebuchet MS'}} className='border-none rounded-full bg-[#ececec] p-[4px_12px]'>Edit</button>
					<button onClick={()=>{handleDeleteCampaign(record.campaign_id)}} style={{fontFamily:'Trebuchet MS'}} className='border-2 border-rose-600 rounded-full text-rose-600 p-[4px_12px]'>Delete</button>
					<button onClick={() =>{handleSendTestMail(record.campaign_id)}} style={{fontFamily:'Trebuchet MS'}} className='border-2 border-[#787878] rounded-full p-[4px_12px]'>Send Test Email</button>
					<button onClick={() =>{handleSendCampaign(record.campaign_id)}} style={{fontFamily:'Trebuchet MS'}} className='border-none rounded-full bg-green-600 text-white p-[4px_12px]'>Send</button>
				</div>
			)
		},
	]
	const [allCampaigns, setAllCampaigns] = useState([])

	async function handleSendCampaign(campaign_id){
		try {
			const data = await userService.sendCampaign(campaign_id, isLoggedIn?.access_token);
			console.log(data)
			enqueueSnackbar('Campaign has been sent', { variant:'success'});
			setRefreshTrigger(prev =>!prev);
		} catch (error) {
			console.log(error)
		}
	}
	async function handleSendTestMail(campaign_id) {
		try {
			console.log('Sendign Test Email', campaign_id);
			const data = await userService.sendTestMail(campaign_id, isLoggedIn?.access_token);
			console.log(data)
			if(data?.status === 200){
				enqueueSnackbar("Test Email Sent", {variant:'success'})
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function handleDeleteCampaign(campaign_id){
		try {
			const data = await userService.deleteCampaign(campaign_id);
			console.log(data);
			setRefreshTrigger(prev =>!prev);
		} catch (error) {
			console.log(error)
		}
	}

	const fetchAllCampaigns = async () => {
		try {
			console.log('Getting All Campaigns', isLoggedIn);
			const data = await userService.getAllCampaigns(isLoggedIn?.access_token);
			console.log(data);
			setAllCampaigns(data?.data?.result?.map(item =>({
				campaign_id:item?._id,
				campaign_created_time:format(parseISO(item?.createdAt), "dd-MM-yyyy hh:mm aa"),
				campaign_name:item?.campaign_title,
				campaign_status:item?.status,
				total_recepients:item?.recipients?.length,
			})));
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(()=>{
		if(isLoggedIn?.status === false){
			navigate("/")
		}
	})

	useEffect(()=>{
		fetchAllCampaigns();
	},[refreshTrigger])

  return (
	<div className='min-h-screen subtle-bg-img'>
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main bg-white'>
			<div><h3>Campaigns</h3></div>
			<Link to={"../campaign/new"}><button className='common-button bg-yellow-main  hover:shadow-[0px_3px_0_0_rgba(0,0,0)] transition-all rounded-full'>Start a New Campaign</button></Link>
		</div>
		<section className='w-full'>
			<Table columns={columns} dataSource={allCampaigns} />
		</section>
	</div>
  )
}

export default Campaigns