const HTMLRecoveryEmail = (code) => {
    return `
        <div>
            <h1> password Recovered </h1>
            <p> 
                Hello, we received a requrest to reset your password. use the verification code below to proceed:
            </p>
            <div>${code}</div>
            <p>
                This code is valid for the next <strong>15 minutes</strong>. If you diden't request this email, you can safely ignore it
            </p>
            <hr style="border:none; border-top: 1px solid #ddd; margin: 10px 0;">
            <footer>
                If you ned custher assistance, please contact our support team at 
                <a href="mailTo: support@example.com"> support@example.com </a>
            </footer>
        </div>
    `;
}

export default HTMLRecoveryEmail