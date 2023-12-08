import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const accordionData = [
  {
    id: 'panel1',
    title: 'COVID-19 pandemic-themed phishing attacks ',
    content: `With the onset of the COVID-19 pandemic in 2020, attackers took advantage of the situation and launched numerous phishing attacks related to pandemic relief, vaccines, or health information. For example, phishing websites impersonated the World Health Organization (WHO) or the Centers for Disease Control and Prevention (CDC) to collect personal information or spread malware.`,
  },
  {
    id: 'panel2',
    title: 'Zoom phishing attacks ',
    content: `During the pandemic, the use of video conferencing platforms like Zoom increased significantly. Attackers capitalized on this trend and created phishing websites that mimicked Zoom login pages to steal users’ credentials. They would send emails with a fake meeting invitation, which redirected users to a phishing site when clicked.`,
  },
  {
    id: 'panel3',
    title: 'Netflix attacks ',
    content: `In 2020, phishing attacks targeting Netflix users became prevalent. Attackers sent emails that appeared to be from Netflix, claiming that the user’s account had been suspended due to payment issues. The email contained a link to a fake Netflix website, where users were prompted to enter their login credentials, billing information, and personal details.`,
  },
  {
    id: 'panel4',
    title: 'Google and Microsoft impersonation attacks',
    content: `In 2020 and 2021, cybercriminals launched phishing campaigns that impersonated Google and Microsoft services. They sent emails that appeared to be from these companies, with subject lines like “Critical security alert” or “Action required: Update your payment details.” The emails contained links to fake login pages designed to steal users’ credentials.`,
  },
];

export default function AccordionComponent() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
	<div style={{ marginTop:"-2vw"}}>
		<div>
    <div style={{ textAlign: 'left !important',  }}>
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft:"10vw", paddingTop: '20px', marginTop: "100px", marginBottom: "20px", height: "65%" }}>
        <h1 style={{ fontStyle: "normal", color: "#164863", fontSize: "30px",  fontFamily: "Calibri", fontWeight: "bold" }}>Some Recent Scenarios of Phishing Attacks</h1>
        {accordionData.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
            sx={{ width: '90%', marginBottom: '16px',boxShadow: '4px 4px 8px rgba(	0, 77, 153, 0.3)', }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}bh-content`}
              id={`${item.id}bh-header`}
            >
              <Typography sx={{ fontStyle: "initial", color: "#164863", fontSize: "18px", fontFamily: "Calibri" }}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ alignContent: "left", fontStyle: "initial", fontSize: "16px", fontFamily: "Calibri" }}>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      </div>
      {/* References Section */}
     

    </div>
	<div style={{ textAlign: 'left', paddingLeft: '10vw', border: "black", paddingRight: '8vw', color: 'black', fontFamily: 'Calibri', paddingTop: '20px', paddingBottom: '20px' }}>
  <h1 style={{ color: '#164863', fontSize: '30px', fontWeight: 'bold' }}>References</h1>
  <div style={{ width: '100%', padding: "10px", boxShadow: '4px 4px 8px rgba(173, 216, 230, 0.6)' , backgroundColor:"white"}}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/research.png" alt="Research Papers Icon" style={{ width: '30px', marginRight: '10px' }} />
      <h4 style={{ color: '#164863' }}>Research Papers Referred:</h4>
    </div>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/dataset.png" alt="Datasets Icon" style={{ width: '30px', marginRight: '10px' }} />
      <h4 style={{ color: '#164863' }}>Datasets used:</h4>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/report.png" alt="Statistics Icon" style={{ width: '30px', marginRight: '10px' }} />
      <h4 style={{ color: '#164863' }}>Statistics and Reports used as reference:</h4>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <br /><br />
  </div>
</div>
</div>

  );
}
