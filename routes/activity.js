//activity.js

'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("5 -- For Save");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};
/*
exports.saveToDE = function (req, res) {
    
    console.log("5 -- For saveToDE");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    res.send(200, 'saveToDE');
};
*/


exports.stop = function (req, res) {
    
    console.log("5 -- For Stop");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log( req.body );
    logData(req);
    res.send(200, 'Stop');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("5 -- For Execute");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Executed: "+req.body.inArguments[0]);
    
    var requestBody = req.body.inArguments[0];

    const accountSid = requestBody.accountSid;
    const authToken = requestBody.authToken;
    const to = requestBody.to;
    const from = requestBody.messagingService;
    const body = requestBody.body;

    const client = require('twilio')(accountSid, authToken); 
     
    console.log("to- "+to);
    
    client.messages 
          .create({ 
             body: body,
             to:   "+91"+to, //"+916375372026",
             from:"+19386666580"
            }) 
            .then(message => {
                
                console.log("SID - "+message.sid);
                console.log("Body - "+message.body);
                console.log("Status - "+message.status);
                console.log("Created date - "+message.date_created);
                console.log("Sent Date - "+message.date_sent);
                console.log("Error code -"+message.error_code);
                console.log("Error message - "+message.error_message);
                console.log("Direction - "+message.direction);
            }) 
            .catch(error => {
            console.log(error);
            })
          .done();
        
            (async () => {
            console.log("166 - MC API");
           //authenticate MC api
            const http = require('https');
            var authEndpoint = "mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com"; //add authentication endpoint
            var url = authEndpoint + '/v2/token';
            const data = JSON.stringify({
                client_id: "ylhl8vjfjvcjzymfxomo37ek", //pass Client ID
                client_secret: "QwO7nJ85sXKeODCMtP6SkVU9", //pass Client Secret
                grant_type: "client_credentials"
            })
            const options = {
                hostname: authEndpoint,
                path: '/v2/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Content-Length': data.length
                }
            }
            const requestForToken = http.request(options, res => {
                console.log("186 - requestForToken res started");
                console.log("187 - "+res);
                console.log("res completed");
                res.on('data', d => {
                    console.log("189 - "+d);
                    console.log("access token - "+d.access_token);
                    console.log("rest url - "+d.rest_instance_url);
                    console.log("193 ");
                    process.stdout.write(d);
                    console.log("access token - "+d.access_token);
                    console.log("rest url - "+d.rest_instance_url);
                    
                })
            })
            requestForToken.on('error', error => {
                console.log("Error occured");
                console.log(error);
            })
            requestForToken.write(data);
            requestForToken.end();
            });

    
                
    //logData(req.keyValue);
    // FOR TESTING
    logData(req);
    res.send(200, 'Publish');

    // Used to decode JWT
    // JWT(req.body, process.env.jwtSecret, (err, decoded) => {

    //     // verification error -> unauthorized request
    //     if (err) {
    //         console.error(err);
    //         return res.status(401).end();
    //     }

    //     if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
    //         // decoded in arguments
    //         var decodedArgs = decoded.inArguments[0];
            
    //         logData(req);
    //         res.send(200, 'Execute');
    //     } else {
    //         console.error('inArguments invalid.');
    //         return res.status(400).end();
    //     }
    // });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("5 -- For Publish");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
     logData(req);
     res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("5 -- For Validate");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Validated: "+req.body.inArguments[0]);       
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
