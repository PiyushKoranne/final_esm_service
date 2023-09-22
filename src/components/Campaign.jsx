import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Form, Select, Steps, Tag, Switch, Upload, Empty } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState, useContext } from 'react';
import userService from "../services/userServices";
import { enqueueSnackbar } from 'notistack'
import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../App';
import parse from "html-react-parser"
 
const Campaign = () => {
	const {id} = useParams();
	const {isLoggedIn} = useContext(LoginContext);
	const [campaignData, setCampaignData] = useState({});
	const [allListings, setAllListings] = useState([]);
	const [allTemplates, setAllTemplates] = useState([]);
	const [htmlPreview, setHtmlPreview] = useState("")
	async function fetchAllListings() {
		try {
			const data = await userService.getAllListings(isLoggedIn?.access_token);
			setAllListings(data?.data?.result?.listings)
		} catch (error) {
			console.log(error)
		}
	}

	async function handleAddCampaign() {
		try {
			console.log(id,'Updating the Template');
			if(id === "new"){
				const data = await userService.addNewCampaign(campaignData, isLoggedIn?.access_token);
				console.log('CAMPAIGN ADDING RESULT : ', data);
				if(data?.status === 200) {
					enqueueSnackbar("Campaign Added Successfully.", {variant:'success'})
				} else {
					enqueueSnackbar("Campaign failed to update", {variant:'error'})
				}
			} else {
				const data = await userService.updateCampaign(campaignData, id, isLoggedIn?.access_token);
				console.log(data);
				if(data?.status === 200) {
					enqueueSnackbar("Campaign Updated Successfully.", {variant:'success'})
				} else {
					enqueueSnackbar("Campaign failed to update", {variant:'error'})
				}
			}
		} catch (error) {
			console.log(error)
			enqueueSnackbar("Campaign failed to update", {variant:'error'})
		}
	}

	const handleBeforeUpload = (file) => {
		const allowedFileTypes = ['image/jpeg', 'image/png'];
		if (allowedFileTypes.includes(file.type)) {
		  return true;
		} else {
		  message.error('Invalid file type. Please upload a .jpg or .png file.');
		  return false;
		}
	};
	
	const handleUpload = (info) => {
		if (info.file.status === 'done') {
		  // The file has been successfully uploaded
		  setCampaignData(prev => ({...prev, social_image:info.file.originFileObj}));
		}
	};

	async function fetchAllTemplates() {
		const data = await userService.getAllTemplates();
		console.log(data);
		setAllTemplates(data?.data?.result?.templates)
	}
	async function fetchCampaignData() {
		try {
			if(id !== 'new'){
				// fetch campaign data here
				const data = await userService.getCampaignData(id, isLoggedIn?.access_token);
				console.log('THIS CAMPAIGN DATA ############', data);
				setCampaignData(data?.data?.result)
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

	useEffect(() =>{
		if(id !== "new"){
			fetchCampaignData();
		}
		fetchAllListings()
		// fetchAllTemplates()
	},[])
	console.log('#####LOGGER DATA#####',isLoggedIn)
	const steps = [
		{
			title: 'Add Details',
			content: 
			<div className='flex flex-col items-center justify-start w-full p-[25px] gap-[20px]' >
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Campaign Title</p>
					<input value={campaignData?.campaign_title} onChange={(e)=>{setCampaignData(prev =>({...prev, campaign_title:e.target?.value}))}} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Campaign Subject Line</p>
					<input value={campaignData?.campaign_subject_line} onChange={(e)=>{setCampaignData(prev =>({...prev, campaign_subject_line:e.target?.value}))}} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Campaign Preview Text</p>
					<input value={campaignData?.campaign_preview_text} onChange={(e)=>{setCampaignData(prev =>({...prev, campaign_preview_text:e.target?.value}))}} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Campaign Sender's Name</p>
					<input value={campaignData?.campaign_sender_name} onChange={(e)=>{setCampaignData(prev =>({...prev, campaign_sender_name:e.target?.value}))}} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Reply To Email: </p>
					<input value={campaignData?.reply_to} onChange={(e)=>{setCampaignData(prev =>({...prev, reply_to:e.target?.value}))}} className='w-[100%] p-[10px] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				
			</div>
		},
		{
			title: 'Choose Recipients',
			content: 
			<div className='flex flex-col items-center justify-start w-full p-[25px] gap-[20px]'>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Recipients: </p>
					<Select className='w-full p-[4px] border-b-[2px] border-b-[#787878]' mode='multiple' defaultValue={campaignData?.recipients} onChange={(e)=>{setCampaignData(prev =>({...prev, recipients:e}))}} >
		 				{
		 					allListings?.map(item => (
		 						<Select.Option value={item?._id}>{item?.list_name}</Select.Option>
		 					))
		 				}
		 			</Select>
				</div>
			</div>
			// {/* <Form

				
			// 	layout="horizontal"
			// 	style={{ fontFamily: 'Montagu Slab Variable,sans-serif' }}
			// >
			// 	<Form.Item label="Choose Email Template">
			// 		<Select onSelect={(e)=>{setCampaignData(prev =>({...prev, template_id:e}))}} >
			// 			{
			// 				allTemplates?.map(item => (
			// 					<Select.Option value={item?.id}>{item?.name}</Select.Option>
			// 				))
			// 			}
			// 		</Select>
			// 	</Form.Item>
			// 	<Form.Item  label="Template Name">
			// 		<Input  />
			// 	</Form.Item>
			// 	<Form.Item  label="Custom Email Template">
			// 		
			// 	</Form.Item>
			// 	
			// </Form>
			// </div> */}
			
		},
		{
			title: 'Choose a Template',
			content: 
			<div className='flex flex-col items-center justify-start w-full p-[25px] gap-[20px]'>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Template Name <span className='text-[12px] text-rose-500'>Required*</span></p>
					<input value={campaignData?.custom_template_name} onChange={(e)=>{setCampaignData(prev =>({...prev, custom_template_name:e.target?.value}))}} className='w-[100%] outline-none border-b-[2px] border-b-[#787878]' />
				</div>
				<div className='w-full flex  flex-col items-start justify-start'>
					<p className='text-[14px] mb-[10px]'>Template Code <span className='text-[12px] text-rose-500'>Required*</span></p>
					<Editor 
			 			height='300px'
			 			language="html"
			 			theme="vs-dark"
			 			value={campaignData?.custom_email_template}
			 			defaultValue='<!-- Write your HTML code here -->'
			 			onChange={(e)=>{setCampaignData(prev => ({...prev, custom_email_template:e}))}}
			 			className='p-[10px]'
			 		/>
				</div>
				<div className='w-full flex justify-between border-b-[1px] relative border-b-[#989898] py-[10px]'>
			 		<p>Template Preview:</p> 
			 		<p className='text-[11px] font-[400] absolute left-0 text-[#898989] top-[30px]'>Kindly ensure templates are under a maximum allowed width of 600px</p>
			 		<button onClick={()=>{setHtmlPreview(campaignData?.custom_email_template)}} className='p-[8px_24px] bg-green-400'>Generate</button>
			 	</div>
			 	<div className='pt-[25px] w-full bg-white flex items-center justify-center'>
			 		{
			 			htmlPreview === "" ? 
			 			<Empty/>
			 			:
			 			<div className='w-full bg-white'>
			 				{parse(htmlPreview)}
			 			</div>
			 		}
			 	</div>
			</div>
			,
		},
	];
	const [current, setCurrent] = useState(0);
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));
	return (
		<div className='min-h-screen'>
			<div className='flex items-center justify-between p-[20px] border-b-[1px] border-b-yellow-main'>
				<div><h3>{campaignData?.campaign_title}</h3></div>
			</div>
			<div className='p-[20px] flex flex-col items-center justify-start'>
				<div className='w-[50%]'>
					<Steps current={current} items={items} />
					<div className='mt-[25px]'>{steps[current].content}</div>
					<div
						className='mt-[25px] flex gap-[15px] px-[25px]'
					>
						{current < steps.length - 1 && (
							<button className='common-button bg-yellow-main common-button-yellow rounded-full  hover:shadow-[0px_4px_0_0_rgba(0,0,0)] transition-all' style={{padding:'12px 60px'}} onClick={() => next()}>
								Next
							</button>
						)}
						{current === steps.length - 1 && (
							<button className='common-button rounded-full bg-yellow-main hover:shadow-[0px_4px_0_0_rgba(0,0,0)] transition-all' onClick={handleAddCampaign}>
								Finish
							</button>
						)}
						{current > 0 && (
							<button
								className='common-button rounded-full'
								onClick={() => prev()}
								style={{padding:'12px 60px'}}
							>
								Previous
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Campaign