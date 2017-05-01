
// Add the module required for cron 
var cron = require('node-cron');

// Include the jsforce package 
var jsforce = require('jsforce');

// For providing the callback URL,we need http,express packages
var http = require('http');
var express = require('express')
var app = express();


var oauth2 = new jsforce.OAuth2({
					  clientId: '3MVG9d8..z.hDcPK7_xOrrNj8vWFzbwbns6P2HpHVmlYuWrxNS5IWC6fgybfcfjDyKxjGQ0N5ooEgVvkQsw9T ',
					  clientSecret: '2801972203241275296',
					  redirectUri: 'http://localhost:8000/callback',
					  proxyUrl: 'https://safe-stream-17926.herokuapp.com/proxy/',
					  scope: 'chatter_api custom_permissions full id openid refresh_token visualforce web offline_access'
			});
 
// Run the cron Job every 15 minutes 
cron.schedule('15 * * * * *', function(){
	// Verify if the salesforce connection has been established
	if(typeof refreshToken != 'undefined')
	{
		oauth2.refreshToken(refreshToken).then(function(ret) {
		  var conn = new jsforce.Connection({
			 accessToken: ret.access_token,
			 instanceUrl: ret.instance_url
		  });
		  console.log(conn.accessToken+"Acesstoken");
		  
		  // Query to verify if the acesss token is valid or not
		  var records = [];
		  conn.query("SELECT Id, Name FROM Account", function(err, result) 
		  {
			  if (err) { return console.error(err); }
			  console.log("total : " + result.totalSize);
			  console.log("fetched : " + result.records.length);
		  });
		});
	}	
});


app.get('/oauth2/auth', function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'chatter_api custom_permissions full id openid refresh_token visualforce web offline_access api' }));
});



//
// Pass received authz code and get access token
//
app.get('/callback', function(req, res) {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.param('code');
  conn.authorize(code, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
	refreshToken=conn.refreshToken;
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
  });
});

// Create a http server and listen to port-3000
http.createServer(app).listen(8000, "0.0.0.0", function(){
	
  console.log('Express server listening on port ' + 8000);
});