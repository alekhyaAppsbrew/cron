

   DESCRIPTION:
   
                1.This code establishes connection with salesforce.
				2.The connection is refreshed every 15 minutes.
				
   
   STEPS TO RUN:

                1.Enter the following URL in any browser:
                  http://localhost:8000/oauth2/auth

                2.Salesforce login page is rendered,enter the cedentials.

                3.Once the initial connection is established,for every 15 minutes the connection is refreshed and SOQL is run every fifteen minutes to test the access token's validity				