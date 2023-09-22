import axios from "axios"
const baseUrl = import.meta.env.VITE_BACKEND_URL

class User {
	handleLogin(data){
		
		const url = baseUrl+"/auth/login";
		const config = {
			headers:{
				"Content-Type":'application/json'
			}
		}
		return axios.post(url, data, config)
	}
	handleRegister(data){
		console.log('#### BACKEND URL #### ',baseUrl)
		const url = baseUrl+"/auth/register";
		const config =  {
			headers:{
				"Content-Type":'application/json'
			}
		}
		return axios.post(url, data, config)
	}
	getAllListings(access_token) {
		const url = baseUrl+"/manage/get-all-listings";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		console.log(access_token);
		return axios.get(url, config)
	}
	getListData(list_id, access_token) {
		const url = baseUrl+"/manage/get-list-info"+"?list_id="+list_id;
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url,{list_id:list_id}, config)
	}
	addNewListing(data, access_token) {
		const url = baseUrl+"/manage/create-audience";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, data, config)
	}
	addNewCampaign(data, access_token) {
		const url = baseUrl+"/manage/create-campaign";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, data, config)
	}
	updateCampaign(data, id, access_token) {
		const url = baseUrl+"/manage/edit-campaign";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {...data, campaign_id:id}, config)
	}
	getCampaignData(campaign_id, access_token){
		const url = baseUrl+"/manage/get-campaign-info";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {campaign_id:campaign_id}, config)
	}
	sendCampaign(campaign_id,access_token){
		const url = baseUrl+"/manage/send-campaign";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {campaign_id:campaign_id}, config)
	}
	sendTestMail(campaign_id, access_token){
		const url = baseUrl+"/manage/send-campaign-test-email";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {campaign_id:campaign_id}, config)
	}
	deleteCampaign(campaign_id){
		const url = baseUrl+"/manage/delete-campaign";
		const config =  {
			headers:{
				"Content-Type":'application/json',
			}
		}
		return axios.post(url, {campaign_id:campaign_id}, config)
	}
	handleAddContact(data, access_token) {
		const url = baseUrl+"/manage/add-contact";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, data, config)
	}
	getListContacts(id) {
		const url = baseUrl+"/manage/get-list-contacts"+"?list_id="+id;
		const config =  {
			headers:{
				"Content-Type":'application/json',
			}
		}
		return axios.get(url, config)
	}
	getAllCampaigns(access_token) {
		const url = baseUrl+"/manage/get-all-campaigns";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.get(url, config)
	}
	getAllTemplates() {
		const url = baseUrl+"/manage/get-all-templates";
		const config =  {
			headers:{
				"Content-Type":'application/json',
			}
		}
		return axios.get(url, config)
	}
	deleteContact(email, access_token){
		const url = baseUrl+"/manage/delete-contact";
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {email:email}, config)
	}
	submitUserContactInfo(contactData, access_token){
		const url = baseUrl+'/auth/add-contact-info';
		const config =  {
			headers:{
				"Content-Type":'application/json',
				"authorization":`Bearer ${access_token}`
			}
		}
		return axios.post(url, {contactData}, config)
	}
}

const new_user = new User();

export default new_user