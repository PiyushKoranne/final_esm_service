import { createContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Manager from "./components/Manager"
import Audiences from "./components/Audiences"
import Campaigns from "./components/Campaigns"
import Templates from "./components/Templates"
import Analytics from "./components/Analytics"
import Campaign from "./components/Campaign";
import Audience from "./components/Audience"
export const LoginContext = createContext({})
import { SnackbarProvider } from 'notistack'
import ContactInfo from "./components/ContactInfo"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState({ status: false, access_token: "", username:"", email:"" })
	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<SnackbarProvider anchorOrigin={{horizontal:'right', vertical:'top'}} autoHideDuration={3000} />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact-info" element={<ContactInfo />} />
				<Route path="/home" element={<Home />} />
				<Route path="/manage" element={<Manager />} >
					<Route path="campaigns" element={<Campaigns />} />
					<Route path="campaign/:id" element={<Campaign />} />
					<Route path="audiences" element={<Audiences />} />
					<Route path="audience/:id" element={<Audience />} />
					<Route path="templates" element={<Templates />} />
					<Route path="analytics" element={<Analytics />} />
				</Route>
			</Routes>
		</LoginContext.Provider>
	)
}

export default App
