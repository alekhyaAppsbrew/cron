

  // Add the Config file
  var config = require('../config/config.json');
  
  
  /** checkRegistered () is used to check if the instance
   *  is registered or not
   *  Input       : Nil
   *  Output      : 1.Boolean
   *                  a)0 - If unregistered
   *				  b)1 - If registered
   *  Method type : POST      
   **/  
   function checkRegistered()
   {
	   // Include the file for postgress
	   var pg = require('pg');
		  
	   // Prepare the connection variables
	   var conString = process.env.ELEPHANTSQL_URL || config.conString;
	   var client = new pg.Client(conString);
	   client.connect(function(err) 
	   {
			if(err) 
			{
				return console.error('could not connect to postgres', err);
			}	
			//TODO: get the exact column name
	        client.query('SELECT * FROM instancereg LIMIT 1', function(err, result) 
			{
				if(err) 
				{
					return console.error('error running query', err);
                }
				return result.rows[0].Instance_Flag;
            });
        });
    }
   module.exports = checkRegistered;