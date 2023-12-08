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


import CountUp from 'react-countup';
const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2', // Light background color
    paddingBottom: '10px',
    position: 'relative', // Set position to relative
  };

  const verticalLineStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 'calc(33.333% - 1px)', // Adjust for the width of the line
    borderLeft: '1px solid #ccc', // Light border color
  };
const AnimatedCounter = ({ endValue, title }) => {
  const counterStyle = {
    fontSize: '36px',
    color: '#164863', // Blue color
    margin: '0',
	fontWeight:"bold"
  };

  const titleStyle = {
    fontSize: '22px',
    color: '#427D9D', // Blue color
    margin: '2px 0',
	fontWeight:"bold"
  };

  return (
    <div style={{ flex: 1, textAlign: 'center' , marginLeft:"3.5vw", marginRight:"3.5vw", marginTop:"2vw"}}>
		
      <CountUp end={endValue} duration={-1} decimals={2} style={counterStyle} />
      <p style={titleStyle}>{title}</p>
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

export default function Hero() {
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
	backgroundColor:"#e6f3ff",
	boxShadow: '4px 4px 8px rgba(0, 77, 153, 0.3)',
	display: 'flex',
	paddingLeft:"20px",
	paddingRight:"20px",
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
    const API_ENDPOINT = 'https://securephish.onrender.com/Predict';

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

  return (
    <div style={containerStyle}>

<div style={{
  textAlign: 'center',
  marginTop: '225px',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft:"5vw"
}}>

  <div style={{
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  }}>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '-15vw' }}>

      <div style={{
        marginLeft: '40px',
        textAlign: 'left',
        width: '100%',
      }}>
        <h1 style={{ color: '#164863', marginTop: '-2vw' }}>SecurePhish: Safeguarding Your Digital Horizon from Phishing Threats!</h1>
        <p style={{ marginTop: '-10px', marginBottom: '10px', fontWeight: '30px', fontSize: '20px', color: '#427D9D' }}>
		Shield your online world with SecurePhish – an intelligent system powered by advanced AI and Machine Learning. Our smart technology is designed to strengthen your protection against sneaky phishing and scam attacks that might outsmart ordinary security tools. SecurePhish's state-of-the-art model goes the extra mile to detect various phishing threats effectively. 
        </p>
		<br/>
        <div style={{ display: 'flex', marginTop: '20px' }}>
		
          <button  style={{ fontFamily: 'Calibri',
    fontSize: '18px',
    fontStyle: 'normal', width:"200px", backgroundColor:"#164863", color:"white", height:"50px"}}>
           Know more!
          </button>
         
        </div>
        
      </div>

      <img src="/phishing.jpg" style={{ width: '60vw', height: '60vw', maxWidth: '500px', maxHeight: '500px', marginBottom: '20px' }} alt="Phishing image" />
    </div>
  </div>
</div>
<br/><br/><br/>
<h1 style={{ textAlign: 'left', color: '#164863' }}>What makes us Stand Out</h1>
<div style={{ display: 'flex', justifyContent: 'space-between',backgroundColor:"",paddingBottom:"10px",}}>
      <AnimatedCounter endValue={96} title="Percent Accuracy" />
      <AnimatedCounter endValue={75} title="Another Metric" />
      <AnimatedCounter endValue={85} title="yet Another Metric" />
	  <AnimatedCounter endValue={85} title="yet Another Metric" />
    </div>
<br/>
<h1 style={{ textAlign: 'left', color: '#164863' }}>About Us</h1>
<div style={{ width: '75vw', paddingRight:"5vw",paddingLeft: '5vw',  textAlign: 'left',fontWeight: '30px', fontSize: '20px',
    color: '#427D9D', // Blue color
    
 }}>
  <p>
    SecurePhish is a cutting-edge AI and Machine Learning-powered phishing detection system designed to safeguard individuals and organizations against the ever-evolving threat of phishing attacks. With cybercriminals becoming increasingly sophisticated in their methods, SecurePhish offers a robust and proactive solution to identify and thwart phishing attempts before they can cause harm.
    <br /><br />
    At the core of SecurePhish lies an advanced AI and ML algorithm that utilizes an extensive dataset containing both legitimate and phishing websites. From this dataset, we extract various features based on URL addresses, domains, HTML, and JavaScript code. These features are then used to train a model using the Random Forest Algorithm. This approach forms the bedrock of our system's accuracy, ensuring it delivers reliable results with a notably low false positive rate.
    <br /><br />
    Our commitment to enhancing online safety extends beyond just powerful algorithms. SecurePhish offers an intuitive browser extension that seamlessly integrates with your web experience, making secure browsing a hassle-free reality. Whether you're an individual concerned about securing your personal and financial data or a business seeking to fortify your digital defenses, SecurePhish provides the protection you need in an increasingly vulnerable online landscape.
  </p>
</div>
<br/>

<h1 style={{ alignContent: 'center', color: '#164863', }}>Our Products</h1>
      {/* Feature Cards */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft:"15vw", marginRight:"15vw" }}>
        {/* Feature Card 1 */}
        <Card style={cardStyle}>
          <CardContent>
            <img src="/extensions.png" alt="SecurePhish Browser Extension" style={imageStylee} />
            <h3 style={titleStyle}>SecurePhish Browser Extension</h3>
            <p style={contentStyle}>Lorem ipsum dolor sit amet, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</p>
            <button style={buttonStylee} onClick={() => window.location.href = '/extension-details'}>
              Install browser extension
            </button>
          </CardContent>
        </Card>

        {/* Feature Card 2 */}
        <Card style={cardStyle}>
          <CardContent>
            <img src="/mail.png" alt="SecurePhish URL Scanner Email Plugin" style={imageStylee} />
            <h3 style={titleStyle}>SecurePhish URL Scanner Email Plugin</h3>
            <p style={contentStyle}>Lorem ipsum dolor sit amet,  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</p>
            <button style={buttonStylee} onClick={() => window.location.href = '/url-scanner-details'}>
              Install email plugin
            </button>
          </CardContent>
        </Card>

        {/* Feature Card 3 */}
        <Card style={cardStyle}>
          <CardContent>
            <img src="/api.png" alt="SecurePhish AntiPhishing API" style={imageStylee} />
            <h3 style={titleStyle}>SecurePhish AntiPhishing API</h3>
            <p style={contentStyle}>Lorem ipsum dolor sit amet, ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</p>
            <button style={buttonStylee} onClick={() => window.location.href = '/api-details'}>
              Get API key
            </button>
          </CardContent>
        </Card>
      </div>

 
	  
    </div>
  );
}
