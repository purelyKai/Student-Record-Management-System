#import sys
#import json
import smtplib
from email.mime.text import MIMEText
from smtplib import SMTP_SSL

# Read email data from command line arguments
#email_data_json = sys.argv[1]
#email_data = json.loads(email_data_json)

def send_email():
    # Set up the connection to the SMTP server
    with SMTP_SSL('smtp.mail.yahoo.com', 465) as server:
        # Log in to the email account
        server.login('scrumlords@yahoo.com', 'cs361OSU')

        # Create the email message
        #message = MIMEText(f"Dear {email_data['firstName']},\n\n\nYour account has been created!\n\nUsername: {email_data['username']}\nPassword: {email_data['password']}\n\n\nRegards,\nStudent Record Management System")
        message = MIMEText("Dear Kai, your account has been created.")

        # Set the sender and recipient
        message['From'] = 'scrumlords@yahoo.com'
        message['To'] = 'kaibblack03@gmail.com'
        message['Subject'] = 'CS361 - Account Information'

        # Send the email
        server.sendmail('scrumlords@yahoo.com', 'kaibblack03@gmail.com', message.as_string())

if __name__ == "__main__":
    send_email()
#[email_data['email']]