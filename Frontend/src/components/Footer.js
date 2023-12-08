import React from "react";
import { Box } from "@mui/material";

export default function Footer() {
	return (
		<Box
			sx={{
				backgroundColor: "#164863",
				padding: "12px",
				width: "100%",
				
				bottom: 0,
				left: 0,
				right: 0,
			}}
			component="footer"
		>
			<div style={{ maxWidth: "960px", margin: "0 auto" }}>
				{/* Content inside the footer */}
				<p style={{ color: "white", textAlign: "center", margin: 0, fontFamily: "Calibri", fontStyle: "initial", fontWeight: "20px", paddingTop: "10px", height: "50px" }}>
				Copyright © 2023 Team Chakde India. All Rights Reserved.
				</p>
			</div>
		</Box>
	);
}