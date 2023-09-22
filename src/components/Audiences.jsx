import { Form, Input, Modal, Table } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import userService from "../services/userServices";
import {parseISO, format} from "date-fns"
import { enqueueSnackbar } from 'notistack';
import {LoginContext} from "../App"
 
const Audiences = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [contactData, setContactData] = useState({});
	const {isLoggedIn} = useContext(LoginContext);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		handleAddNewContact();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	async function handleAddNewContact () {
		try {
			const data = await userService.handleAddContact(contactData, isLoggedIn?.access_token);
			console.log(data)
			if(data?.status === 200){
				setIsModalOpen(false);
				enqueueSnackbar('Contact Added Successfully', {variant:'success'});
			}
		} catch (error) {
			setIsModalOpen(false);
			console.log(error);
			enqueueSnackbar('Oops! Could not add contact', {variant:'error'})

		}
	}

	const columns =[
		{
			title: 'Created',
			dataIndex: 'date_created',
			key: 'date_created',
		},
		{
			title: 'Listing Name',
			dataIndex: 'name',
			key: 'name',
			render: (text,record) => <Link to={`../audience/${record?.id}`} style={{fontFamily:'Trebuchet MS'}}  className='font-bold capitalize'>{text}</Link>,
		},
		{
			title: 'Listing Rating',
			dataIndex: 'list_rating',
			key: 'list_rating',
		},
		{
			title: 'Total Recepients',
			dataIndex: 'member_count',
			key: 'member_count',
		},
		{
			title: 'Confirm Subscription',
			dataIndex: 'subscription_confirmation',
			key: 'subscription_confirmation',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actioons',
			render: (text, record) => (
				<div className='flex gap-[10px]'>
					<button onClick={()=>{ setContactData(prev =>({...prev, list_id:record?.id})); showModal();}}  className='border-none rounded-full text-green-800 common-button p-[4px_12px]' style={{padding:'4px 12px'}}>Add Contact</button>
					<Modal title="Add new contact" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
						<div className='w-full p-[25px] flex flex-col items-center justify-start'>
							<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
								<p className='text-[14px] mb-[10px]'>First Name</p>
								<input onChange={(e) => {setContactData(prev =>({...prev, first_name:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
							</div>
							<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
								<p className='text-[14px] mb-[10px]'>Last Name</p>
								<input onChange={(e) => {setContactData(prev =>({...prev, last_name:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
							</div>
							<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
								<p className='text-[14px] mb-[10px]'>Email Address</p>
								<input onChange={(e) => {setContactData(prev =>({...prev, email:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
							</div>
						</div>
					</Modal>
					<button onClick={()=>{handleDeleteCampaign(record.campaign_id)}} className='border-none rounded-full text-rose-600 p-[4px_12px] border-2'>Delete</button>
				</div>
			)
		},
	]
	const [allListings, setAllListings] = useState([])

	async function fetchListings() {
		try {
			console.log('Calling the get all listing function')
			const data = await userService.getAllListings(isLoggedIn?.access_token);
			console.log(data);
			const arr = data?.data?.result?.listings?.map(item => ({
				id:item?._id,
				date_created:item?.createdAt ? format(parseISO(item?.createdAt), "dd-MM-yyyy hh:mm aa") : new Date(),
				name:item?.list_name,
				list_rating:item?.list_rating || 'Nill',
				member_count:item?.members?.length,
				subscription_confirmation:item?.confirm_subscription ? "true":"false"
			}))
			setAllListings(arr)
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(()=>{
		if(isLoggedIn?.status === false){
			navigate("/")
		}
	})

	useEffect(()=>{
		fetchListings()
	},[])
  return (
	<div className='min-h-screen subtle-bg-img' >
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main bg-white'>
			<div><h3>Audiences</h3></div>
			<Link to={"../audience/new"}><button className='common-button bg-yellow-main  hover:shadow-[0px_3px_0_0_rgba(0,0,0)] transition-all common-button-yellow rounded-full'>Create a New Listing</button></Link>
		</div>
		<section className='w-full'>
			<Table columns={columns} dataSource={allListings} />
		</section>
	</div>
  )
}

export default Audiences