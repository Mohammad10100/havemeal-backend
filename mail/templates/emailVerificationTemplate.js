const otpTemplate = (otp) => {
	return (`<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
	
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #999595;
				background: #191919;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #4c4b4b;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
				color: white;
			}
			.logo {
				color: #FFF;
				font-family: Poppins;
				font-size: 2rem;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				max-width: 200px;
				margin-bottom: 20px;
				margin-top: 20px;
				background-color: #3d3d3d;
				padding: 0.5rem 3rem;
				padding-top: 0.6rem;
				border-radius: 1rem;
				display: flex;
			}
	
			.spanLogo {
				color: #236EFF;
				font-family: Poppins;
				font-size: 2rem;
				font-style: italic;
				font-weight: 700;
				line-height: normal;
			}
			.logoDiv{
                display:flex;
                align-items:center;
                text-align:center;
				justify-content: center;
            }
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="logoDiv"><p class="logo">Have<span class="spanLogo">Meal</span></p></div>
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with HaveMeal. To complete your registration, please use the following OTP to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
					Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at
				// <a href="mailto:@gmail.com">@gmail.com</a>. We are here to help!
			</div>
		</div>
	</body>
	
	</html>`);
};
module.exports = otpTemplate;