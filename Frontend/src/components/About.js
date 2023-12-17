import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const ResultsTable = () => {
	const [urlResults, setUrlResults] = useState([]);
	const [urlInput, setUrlInput] = useState('');
	const [prediction, setPrediction] = useState('');
	const [expanded, setExpanded] = useState(null);
	const [isPredictClicked, setIsPredictClicked] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const url = queryParams.get('url');
	const cardStyle = {
		flex: 1,
		marginRight: '20px',
		marginLeft: '20px',
		boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)',
		display: 'flex',
		paddingLeft: "20x",
		paddingRight: "20px",
		flexDirection: 'column',
		alignItems: 'center', // Center content horizontally
		textAlign: 'center', // Center text horizontally
		width: '100%', // Set width to 100% for responsiveness
		marginBottom: '20px', // Add bottom margin for spacing between cards

		// Media query for larger screens (laptops and desktops)
		'@media (min-width: 768px)': {
			width: 'calc(33.33% - 25px)', // Adjust the width for larger screens
		},
	};


	const imageStylee = {
		maxWidth: '80%',
		maxHeight: '80px',
		marginBottom: '10px',
	};

	const titleStyle = {
		color: '#164863',
		marginTop: '10px', // Add some top margin to the title
	};

	const contentStyle = {
		textAlign: 'left', // Left-align text
	};

	const buttonStylee = {
		marginTop: '15px', // Add some top margin to the button
		backgroundColor: '#164863',
		color: '#fff',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	};


	useEffect(() => {
		setUrlInput(url);
	}, [url]);

	const handleInputChange = (e) => {
		setUrlInput(e.target.value);
	};

	const handlePredictClick = () => {
		setIsPredictClicked(true);
		const API_ENDPOINT = 'http://127.0.0.1:5000/Predict';

		axios
			.post(API_ENDPOINT, { url: urlInput }, { headers: { 'Content-Type': 'application/json' } })
			.then((response) => {
				const detection = response.data.detectionResult;
				setPrediction(detection === 1 ? 'Phishing' : 'Safe');
				setExpanded('panel1');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const handleResetClick = () => {
		setUrlInput('');
		setPrediction('');
		setExpanded(null);
		setIsClicked(true);
	};

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		marginTop: '125px',
		color: 'black',
		marginBottom: '50px',
		fontFamily: 'Calibri',
		fontStyle: 'normal',
		fontWeight: '30px',
	};

	const imageStyle = {
		width: '30vw',
		height: '30vw',
		marginBottom: '20px',
	};

	const inputStyle = {
		width: '50vw',
		height: '40px',
		fontFamily: 'Calibri',
		fontSize: '18px',
		boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)',
		borderColor: '#4B9CC5',
		marginBottom: '20px',
	};

	const buttonsContainerStyle = {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '20px',
	};

	const buttonStyle = {
		marginLeft: '5px',
		marginTop: '20px',
		width: '100px',
		height: '45px',
		backgroundColor: isClicked ? '#427D9D' : '#164863',
		color: 'white',
		fontFamily: 'Calibri',
		transition: 'background-color 0.3s',
		fontSize: '18px',
		fontStyle: 'normal',
		marginRight: '10px',
	};

	const buttonHoverStyle = {
		backgroundColor: '#4B9CC5',
		marginLeft: '5px',
		marginTop: '20px',
		width: '100px',
		height: '45px',
		color: 'white',
		fontFamily: 'Calibri',
		fontSize: '18px',
		fontStyle: 'normal',
		marginRight: '10px',
	};

	const resultsContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '15px',
	};
	useEffect(() => {
		// Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
		const API_ENDPOINT = 'http://127.0.0.1:5000/recenturls';

		// Fetch past ten URL results
		fetch(API_ENDPOINT)
			.then((response) => response.json())
			.then((data) => {
				// Assuming the API response is an array of objects with 'url' and 'result' properties
				setUrlResults(data.slice(0, 10));
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []); // Empty dependency array to run the effect only once on component mount

	return (
		<div style={{}}>
			<div style={{
				textAlign: 'center',
				marginTop: '225px',
				color: 'black',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',

			}}>

				<div style={{
					width: '80%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: '0 auto',
				}}>

					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '-8vw' }}>

						<div style={{
							marginLeft: '20px',
							textAlign: 'center', // Center-align the text
							width: '100%',
						}}>
							<h1 style={{ color: '#164863', marginTop: '-2vw' }}>Phishing URL Checker: Check a Link for Phishing in Seconds</h1>
							<p style={{ marginTop: '-10px', marginBottom: '10px', fontWeight: '30px', fontSize: '20px', color: '#427D9D' }}>
								Enter a suspicious link to check for signs of phishing
							</p>
							<input
								type="text"
								placeholder="Enter URL"
								value={urlInput}
								onChange={handleInputChange}
								style={{
									width: '100%',
									height: '40px',
									fontFamily: "Calibri",
									fontSize: "18px",
									boxShadow: ' 4px 4px 8px rgba(0, 77, 153, 0.3)',
									borderColor: "#4B9CC5",
								}}
							/>
							<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
								<button onClick={handlePredictClick} style={isPredictClicked ? buttonHoverStyle : buttonStyle}>
									Predict
								</button>
								<button onClick={handleResetClick} style={isClicked ? buttonHoverStyle : buttonStyle}>
									Reset
								</button>
							</div>
							{prediction && (
								<div style={{ marginTop: '30px', textAlign: 'center' }}>
									<p style={{ color: '#164863', fontWeight: '30px', fontSize: '20px' }}>Prediction Result: {prediction}</p>
									<p style={{ fontWeight: '30px', fontSize: '20px', marginTop: "-15px", color: '#164863' }}>
										This URL is detected as {prediction}
									</p>
								</div>
							)}
						</div>


					</div>
				</div>
			</div>


			<br /><br />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15px' }}>
				<br />
				<h2 style={{ color: '#164863' }}>Extraction Features</h2>
				{accordionData.map((item, index) => (
					<Accordion
						key={item.id}
						expanded={expanded === item.id}
						onChange={() => setExpanded(expanded === item.id ? null : item.id)}
						sx={{ width: '60%', marginBottom: '16px', boxShadow: '4px 4px 8px rgba(173, 216, 230, 0.6)', backgroundColor: "" }}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`${item.id}bh-content`}
							id={`${item.id}bh-header`}
						>
							<Typography sx={{ fontStyle: 'initial', color: '#164863', fontSize: '18px', fontFamily: 'Calibri' }}>
								{item.title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ textAlign: 'left' }}>
							<Typography sx={{ alignContent: 'left', fontStyle: 'initial', fontSize: '16px', fontFamily: 'Calibri' }}>
								{item.content}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
			<br /><br />

			<h2 style={{ color: '#164863', textAlign: 'center' }}>Recently Checked URLs</h2>

			<div style={{
				boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)',
				borderColor: "#4B9CC5",
				paddingLeft: "20px",
				paddingRight: "20px",
				paddingBottom: "20px",
				width: "55vw",
				margin: '0 auto', // Center the container
			}}>
				<table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '-10vw', width: '60vw' }}>
					<thead style={{ marginLeft: "60px", }}>
						<tr>
							<th style={{ color: '#164863', padding: '8px', textAlign: 'center', }}>URL Checked</th>
							<th style={{ color: '#164863', padding: '8px', textAlign: 'center' }}>Result</th>
						</tr>
					</thead>
					<br />
					<tbody>
						{urlResults.map((result, index) => (
							<tr key={index} style={{ margin: "20px" }}>
								<td style={{ borderRadius: '20px', padding: '8px', textAlign: 'center' }}>{result.url}</td>
								<td
									style={{
										borderRadius: '10px',
										padding: '10px',
										margin: "20px",
										textAlign: 'center',
										color: result.result === 'clean' ? 'green' : 'red',
										backgroundColor: result.result === 'clean' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
									}}
								>
									{result.result}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};



const accordionData = [
	{
		id: 'panel1',
		title: 'Feature 1: Prefix-Suffix Separation',
		content: 'Phishing websites frequently employ deceptive prefixes or suffixes to imitate legitimate domains. Detecting the presence of unusual prefixes or suffixes is vital in spotting potential phishing attempts.',
	},
	{
		id: 'panel2',
		title: 'Feature 2: Subdomains',
		content: 'To appear legitimate, phishing sites may incorporate subdomains. Analyzing the number and patterns of subdomains can provide insights into potential phishing activity.',
	},
	{
		id: 'panel3',
		title: 'Feature 3: URL Length',
		content: 'Phishing URLs are often characterized by excessive length, including numerous random characters or subdirectories. Unusually long URLs can raise red flags as possible phishing attempts.',
	},
	{
		id: 'panel4',
		title: 'Feature 4: Domain Age',
		content: 'Legitimate websites typically have a longer history, while phishing domains are often newly created. Examining the age of a domain is a valuable indicator for detection.',
	},
	{
		id: 'panel5',
		title: 'Feature 5: DNS Records',
		content: "The presence or absence of DNS records can hint at a domain's legitimacy. Legitimate websites usually have DNS records, while some phishing domains might not.",
	},
	{
		id: 'panel6',
		title: 'Feature 6: Domain Registration Length',
		content: 'Phishing domains often have short registration periods to evade long-term detection. Analyzing the registration duration of a domain can assist in identifying suspicious activity.',
	},
	{
		id: 'panel7',
		title: 'Feature 7: Statistical Analysis',
		content: 'Incorporating statistical features, such as entropy, character frequencies, or keyword analysis, can reveal irregularities commonly associated with phishing URLs.',
	},
	{
		id: 'panel8',
		title: 'Feature 8: URL Shorteners',
		content: 'The use of URL shorteners like TinyURL can obscure the true destination. Detecting the use of URL shorteners is a valuable feature in identifying potential phishing links.',
	},
	{
		id: 'panel9',
		title: 'Feature 9: Slash Usage',
		content: 'Phishing URLs may contain excessive slashes or unusual path structures. Identifying irregularities in slash placement and frequency can be informative.',
	},
	{
		id: 'panel10',
		title: 'Feature 10: Dot Usage',
		content: 'The presence of extra dots in domain names can be indicative of phishing. For instance, comparing "legit.com" to "l.egit.com" can reveal potential threats.',
	},
];

function About() {

	return (

		<div style={{ paddingLeft: '12vw', paddingRight: '12vw', color: 'black', fontFamily: 'Calibri', paddingTop: '110px', paddingBottom: '120px' }}>



			<ResultsTable />
		</div>
	);
}

export default About;
