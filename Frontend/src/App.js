import { Accordion } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import ControlledAccordions from "./components/AccordionComp";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";
import Docs from "./components/Docs";
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<DrawerAppBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/features" element={<About />} />
					<Route path="/resources" element={<ControlledAccordions />} />
					{/* <Route path="/login-signup" element={<LoginSignup />} /> */}
					<Route path="/docs" element={<Docs />} />
					{/* Other routes */}
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
