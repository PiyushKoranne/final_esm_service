import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import userService from "../services/userServices"
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import {LoginContext} from "../App";
import { enqueueSnackbar } from 'notistack';

const Audience = () => {
	const navigate = useNavigate();
	const {isLoggedIn} = useContext(LoginContext);
	const {id} = useParams();
	const columns =[
		{
			title: 'Full Name',
			dataIndex: 'full_name',
			key: 'full_name',
		},
		{
			title: 'Contact Email',
			dataIndex: 'email_address',
			key: 'email_address',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title:"Actions",
			dataIndex:'actions',
			key:'actions',
			render: (text, record) => (
				<div className='flex gap-[10px]'>
					<button onClick={()=>{handleDeleteContact(record?.email_address)}} className='border-none rounded-[5px] bg-rose-600 text-white p-[4px_12px]'>Delete</button>
				</div>
			)
		}
	]
	const [listData, setListData] = useState({list_id:id});
	const [newContact, setNewContact] = useState({list_id:id});
	const [allContacts, setAllContacts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		handleAddNewContact();
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	async function handleDeleteContact(email) {
		try {
			const data = await userService.deleteContact(email, isLoggedIn?.access_token);
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	} 
	

 	async function fetchListData() {
		try {
			if(id === "new") return
			const data = await userService.getListData(id, isLoggedIn?.access_token);
			console.log('###### SELECTED LIST DATA ######', data);
			setListData(data?.data?.result);
			setAllContacts(data?.data?.result?.members?.map(item =>({
				full_name:item?.first_name+" "+item?.last_name,
				email_address:item?.email,
				status:'subscribed' 
			})))
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAddNewContact () {
		try {
			const data = await userService.handleAddContact(newContact, isLoggedIn?.access_token);
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdateAudience (e) {
		try {
			e.preventDefault();
			console.log('Logger data:', isLoggedIn);
			const data = await userService.addNewListing(listData, isLoggedIn?.access_token);
			if(data?.status === 200){
				enqueueSnackbar('Contact added', {variant:'success'});
				navigate('/manage/audiences')
			} else {
				enqueueSnackbar('Contact added', {variant:'warning'});
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		if(isLoggedIn?.status === false){
			navigate("/")
		}
	})

	useEffect(() => {
		fetchListData();
	},[])
	return (
	<div className='min-h-screen'>
		
		<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
			<div><h3>{listData?.name}</h3></div>
			<div className='flex gap-[10px]'>
				<button onClick={showModal} className='common-button common-button-yellow rounded-full'>Add Contact</button>
				<Modal title="Add New Contact" style={{fontFamily:'Trebuchet MS'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<div className='w-full p-[25px] flex flex-col items-center justify-start'>
						<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
							<p className='text-[14px] mb-[10px]'>First Name</p>
							<input onChange={(e) => {setNewContact(prev =>({...prev, first_name:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
							<p className='text-[14px] mb-[10px]'>Last Name</p>
							<input onChange={(e) => {setNewContact(prev =>({...prev, last_name:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
						<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
							<p className='text-[14px] mb-[10px]'>Email Address</p>
							<input onChange={(e) => {setNewContact(prev =>({...prev, email:e.target.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
						</div>
					</div>
				</Modal>
			</div>
		</div>
		<section className='w-full pb-[25px]'>
			<Table className='shadow-[0_5px_5px_0px_rgba(0,0,0,0.1)]' columns={columns} dataSource={allContacts} />
		</section>
		<section className='w-full flex flex-col items-start justify-start p-[25px] ' style={{fontFamily:'Trebuchet MS'}}>
			<div className='w-[50%]'>
				<h1 className='text-[36px] font-[600]' style={{fontFamily:'Trebuchet MS'}}> Add a new Listing </h1>	
				<form className='w-full mt-[25px]' onSubmit={handleUpdateAudience}>
					<div className='w-full flex  flex-col items-start justify-start'>
						<p className='text-[14px] mb-[10px]'>List Name</p>
						<input onChange={(e)=>{setListData(prev =>({...prev, list_name:e.target.value}))}} value={listData?.list_name} className='w-[50%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
					</div>
					<p style={{fontFamily:"Trebuchet MS"}} className='my-[25px] text-[22px] font-[600]'> Campaign Defaults: <span className='text-[12px] text-[#787878]' style={{fontFamily:'Trebuchet MS'}}>(Just in case you forget to add them in your custom campaigns)</span></p>
					<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
						<p className='text-[14px] mb-[10px]'>Sender's Name</p>
						<input onChange={(e)=>{setListData(prev =>({...prev, from_name:e.target.value}))}} value={listData?.from_name} className='w-[50%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
					</div>
					<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
						<p className='text-[14px] mb-[10px]'>Sender's Email</p>
						<input onChange={(e)=>{setListData(prev =>({...prev, from_email:e.target.value}))}} value={listData?.from_email} className='w-[50%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
					</div>
					<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
						<p className='text-[14px] mb-[10px]'>Email Subject</p>
						<input onChange={(e)=>{setListData(prev =>({...prev, subject:e.target.value}))}} value={listData?.subject} className='w-[50%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
					</div>
					<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
						<p className='text-[14px] mb-[10px]'>Email Type</p>
						<Select className='w-[50%] outline-none p-[10px] border-b-[2px] border-b-[#787878]' defaultValue={"html"} value={listData?.email_type} onSelect={(e)=>{setListData(prev =>({...prev, email_type:e}))}}>
							<Select.Option value="plain-text">Plain Text</Select.Option>
							<Select.Option value="html">HTML</Select.Option>
						</Select>
					</div>
					<div className='w-full flex  flex-col items-start justify-start mb-[25px]'>
						<p className='text-[14px] mb-[10px]'>Permission Reminder</p>
						<input onChange={(e)=>{setListData(prev =>({...prev, permission_reminder:e.target.value}))}} value={listData?.permission_reminder} className='p-[10px] w-[50%] outline-none border-b-[2px] border-b-[#787878]' />
						<p style={{fontSize:"12px", fontFamily:'Trebuchet MS'}} className='mt-[8px] font-[11px] text-[#000]'>FOR EXAMPLE:</p>
						<p style={{fontSize:"12px", fontFamily:'Trebuchet MS'}} className='w-[50%] font-[11px] text-[#787878]'>You are receiving this email because you have been subscribed to this email service by Conative IT Solutions, To know more about this service and read our pirvacy policy, kindly visit us at our website (www.conativeitsolutions.com)</p>
					</div>
					<div className='w-full flex flex-col items-start justify-start mb-[25px]'>
						<button style={{margin:'0px', padding:"10px 40px"}} className='common-button bg-yellow-main rounded-full hover:shadow-[0px_4px_0_0_rgba(0,0,0)] transition-all'>Create</button>
					</div>
				</form>
			</div>
		{/* <Form
				onFinish={handleUpdateAudience}
				id='campaign-form'
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			>
				<Form.Item label="List Title">
					<Input  />
				</Form.Item>
				<div className='bold'>Campaign Defaults :</div>
				
				<Form.Item label="Email Type">
					<Select defaultValue={"html"} >
						<Select.Option value="plain-text">Plain Text</Select.Option>
						<Select.Option value="html">HTML</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="From Name">
					<Input  />
				</Form.Item>
				<Form.Item label="From Email">
					<Input  value={listData?.from_email} />
				</Form.Item>
				<Form.Item label="Subject Line">
					<Input  />
				</Form.Item>
				<Form.Item label="Permission Reminder">
					<Input  />
				</Form.Item>
				
				
		</Form> */}
		</section>
	</div>
  )
}

export default Audience