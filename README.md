# NewRelic-SynthMon-BulkWhoIs


This is a script, performs a WHOIS bulk request for a given list of domains.  

Webservice : https://rapidapi.com/backend_box/api/bulk-whois
Webservice Subscription: Free. 25 Checks per month.  

Requirements:
=============
	1: Rapid Account and Subscription to the Above service.
	2: The Rapid Key to be stored in New Relic under 'Secure Credentials'
	3: List of domains to check, stored in variable under 'Secure Credentials'.


Secure Credentials
==================
	VW_BULKWHOIS_DOMAIN 
		+ Contains the list of domains to scan.  There is a max of 10 domains that can be passed per request.
		+ The string, must always start with 'whois?domains=' and end with 'format=split'.  
		+ Each domain must be separated by '%2c'
	
		+ Example : whois?domains=google.com%2cbbc.co.uk&format=split

	VW_X_RAPID_API_KEY
		contains the passkey, as supplied by RapidAPI.

	
Monitor Configuration
=====================
	Type: Synthetic Monitoring
	Sub Type: End Point Availability: Scripted API:
	Period : 1 per day.
	Runtime : Node 16.10.0
	Locations: London
	Est' monthly credit usage : 30.


Output/Results:
===============
	Query results, use : SELECT * FROM SyntheticChecks Where monitorName = [name of monitor]

	Columns:
	--------
	custom.http-status-code	 	: will contain the http status code
	custom.body 			: contains the response body
	custom.all-registration-expiry	: contains the list of domains and expiry dates/time
	custom.[domain]-registry-expiry : contains the name of the domain and the date of expiry in the pattern '[domain] : [expiry txt]'




