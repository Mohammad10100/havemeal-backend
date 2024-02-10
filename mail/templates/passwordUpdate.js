exports.passwordUpdated = (email, firstName, lastName) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
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
                justify-items: center;
                align-items: center;
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
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
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
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p style="color: white;">Hey ${firstName} ${lastName},</p>
                <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.
                </p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:platform@gmail.com">@gmail.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};