
// Include the jsforce package 
var jsforce = require('jsforce');

var oauth2 = new jsforce.OAuth2
            ({
					  clientId: '3MVG9d8..z.hDcPK7_xOrrNj8vWFzbwbns6P2HpHVmlYuWrxNS5IWC6fgybfcfjDyKxjGQ0N5ooEgVvkQsw9T ',
					  clientSecret: '2801972203241275296',
					  redirectUri: 'http://localhost:8000/callback',
					  proxyUrl: 'https://safe-stream-17926.herokuapp.com/proxy/',
					  scope: 'chatter_api custom_permissions full id openid refresh_token visualforce web offline_access'
			});
			
			
// Define a method that must be exported
// input the express object "app" 
module.exports = function (app) 
{
	app.get('/oauth2/auth', function(req, res) 
	{
		res.redirect(oauth2.getAuthorizationUrl({ scope : 'chatter_api custom_permissions full id openid refresh_token visualforce web offline_access api' }));
    });



	//
	// Pass received authz code and get access token
	//
	app.get('/callback', function(req, res) 
	{
		var conn = new jsforce.Connection({ oauth2 : oauth2 });
		var code = req.param('code');
		conn.authorize(code, function(err, userInfo) 
		{
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
}	