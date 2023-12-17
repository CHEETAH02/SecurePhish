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
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    preferredDemoDate: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ display: 'flex', maxWidth: '900px', margin: 'auto', textAlign:"left" , color:"#164863", fontWeight: '30px', fontSize: '20px',}}>
      <div style={{ flex: 1 ,marginRight:"-2vw", marginLeft:"3vw"}}>
       <br/>
        <form onSubmit={handleSubmit} style={{borderColor:"#164863", }}>
          <div style={{ marginBottom: '15px' ,}}>
            <label>Name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width:"300px" }}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width:"305px" }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Company: </label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width:"270px" }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Preferred Demo Date: </label>
            <input type="date" name="preferredDemoDate" value={formData.preferredDemoDate} onChange={handleChange} style={{ width:"170px", height:"40px" }}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Message:  </label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" style={{ width:"275px" }} />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#164863',
              color: '#fff',
              padding: '10px',
              borderRadius: '3px',
              cursor: 'pointer',
              marginBottom: '15px',
              alignSelf:"center",
              width:"200px",
              marginLeft:"0px"
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <div style={{ flex: 1 }}>
        {/* Replace the image source with your actual image */}
        <img
          src="/contact.jpg" 
          alt="Contact Us Image"
          style={{ width: '100%', height: 'auto',marginTop:"-2vw" }}
        />
      </div>
    </div>
  );
};


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
           Know More!
          </button>
         
        </div>
        
      </div>

      <img src="/phishing.jpg" style={{ width: '60vw', height: '60vw', maxWidth: '500px', maxHeight: '500px', marginBottom: '20px' }} alt="Phishing image" />
    </div>
  </div>
</div>
<br/><br/><br/>
<h1 style={{ textAlign: 'left', color: '#164863' }}>What makes us Stand Out</h1>
<div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "", paddingBottom: "10px" ,}}>

  <div style={{ borderRight: '1px solid #164863', paddingRight: '10px' }}>
    <AnimatedCounter endValue={96} title="Percent Accuracy" />
  </div>
  <div style={{ borderRight: '1px solid #164863', paddingRight: '10px' }}>
    <AnimatedCounter endValue={75} title="Another Metric" />
  </div>
  <div style={{ borderRight: '1px solid #164863', paddingRight: '10px' }}>
    <AnimatedCounter endValue={85} title="Yet Another Metric" />
  </div>
  <AnimatedCounter endValue={85} title="Yet Another Metric" />
</div>

<br/><br/>
<h1 style={{ textAlign: 'left', color: '#164863' }}>About Us</h1>
<div style={{ width: '75vw', paddingRight:"5vw",paddingLeft: '5vw',  textAlign: 'left',fontWeight: '30px', fontSize: '20px',
    color: '#427D9D', // Blue color
    
 }}>
  <p>
  SecurePhish, an AI-powered phishing detection system, safeguards individuals and organizations from evolving threats. Its advanced algorithm, using a dataset of legitimate and phishing websites, employs the Random Forest Algorithm for reliable results with a low false positive rate. 
    <br /><br/>
    Beyond algorithms, SecurePhish offers an intuitive browser extension for seamless integration into web experiences. This extension ensures hassle-free, secure browsing for individuals and businesses, fortifying digital defenses in an increasingly vulnerable online landscape.
    <br /><br />
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
<br/><br/>
      <h1 style={{ textAlign: 'left', color: '#164863' }}>Contact Us For a Demo</h1>
	  <ContactForm/>
    </div>
  );
}
