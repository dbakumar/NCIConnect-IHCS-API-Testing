QUnit.config.autostart = false;
QUnit.config.reorder = false;
var client = {"siteKey" : "", "headers" : "", "data" : "" };

$(document).ready(function(){

    //To Start the Qunit process
    $("#startbtn").on("click", function(){
        QUnit.start();
     });


    // Start new module for getParticipantToken
    QUnit.module( "getParticipantToken", {
        before: function() {
           // prepare something once for all tests
           client.siteKey=$("#sitekey").val();
           client.headers={ "Content-Type": "application/json",
                                      "Authorization" : "Bearer" + client.siteKey
                                    };
        },
        beforeEach: function() {
          // prepare something before each test
        },
        afterEach: function() {
          // clean up after each test
        },
        after: function() {
          // clean up once after all tests are done
        }
    });

    QUnit.test( "To send request with in-valid siteKey", function( assert ) {
        var done = assert.async();
        var settings = {
            "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipantToken",
            "method": "POST",
            "timeout": 0,
            "headers": { "Content-Type": "application/json","Authorization" : "Bearer" + client.siteKey + "234633562345345r34"} ,
            "data": JSON.stringify({"data":[{"studyId":"-1"},{"studyId":"-2"}]}),
          };
          
          $.ajax(settings).done(function (data, textStatus, xhr) {
            //Ajax request pass.
            assert.ok( 1 == "2", "Fail - return success with invalid sitekey :"+ JSON.stringify(data) );
            done();
          }).fail(function(xhr, status, error) {
            //Ajax request failed.
            assert.ok(xhr.status == "401", "Pass - return HTTP status code 401")
            done();
           });

    });
    
    QUnit.test( "To send request with valid siteKey", function( assert ) {
        var done = assert.async();
        var settings = {
            "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipantToken",
            "method": "POST",
            "timeout": 0,
            "headers": client.headers,
            "data": JSON.stringify({"data":[{"studyId":"-1"},{"studyId":"-2"}]}),
          };
          
          
          $.ajax(settings).done(function (data, textStatus, xhr) {
            //Ajax request pass.
            assert.ok( xhr.status == "200", "Pass - return success with valid HTTP status code:"+ xhr.status );
            var messageCount =0;
            $.each(data.data, function(k, v) {
              if (v.hasOwnProperty("token") && v["token"].length > 0 &&  v.hasOwnProperty("studyId") && v["studyId"].length ) {
                //console.log(v["token"] + " :: " + v["studyId"]);
                messageCount++;
              } else {
                assert.ok( 1 == "2", "Failed - token/studyId information not send as response. json object : " + JSON.stringify(data) );
              }

              if (messageCount == Object.keys(data.data).length) {
                console.log("message count = " + messageCount + " :: Object count = " + Object.keys(data.data).length);
                assert.ok( 1 == "1", "Pass - token/studyId information received as response. json object : " + JSON.stringify(data) );
                //Store data information to client object for future test case use
                client.data = data.data;
              }
               
            });
            
            done();
          }).fail(function(xhr, status, error) {
            //Ajax request failed.
            assert.ok(xhr.status == "200", "Fail - return status code :" + xhr.status + " and message : " + JSON.stringify(xhr.responseJSON));
            done();
           });

    });

    /* End of getParticipantToken module*/

    // Start new module for getParticipants
    QUnit.module( "getParticipants");

    QUnit.test( "To send request with in-valid siteKey", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipants?type=verified",
        "method": "GET",
        "timeout": 0,
          "headers": { "Content-Type": "application/json","Authorization" : "Bearer" + client.siteKey + "234633562345345r34"} ,
          "data": JSON.stringify({"data":[{"studyId":"-1"},{"studyId":"-2"}]}),
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "2", "Fail - return success with invalid sitekey :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "1", "Pass - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(xhr))
          done();
         });
    });

    QUnit.test( "To send request with valid siteKey and invalid type=*", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipants?type=*",
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "2", "Fail - return success with valid siteKey and invalid type=* :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "1", "Pass - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(xhr))
          done();
         });
    });

    QUnit.test( "To send request with valid siteKey - type=verified", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipants?type=verified",
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "1", " success :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "2", "Fail - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(error)  ); 
          done();
         });
    });

    QUnit.test( "To send request with valid siteKey - type=notverified", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipants?type=notverified",
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "1", " success :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "2", "Fail - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(error)  ); 
          done();
         });
    });

    QUnit.test( "To send request with valid siteKey - type=all", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/getParticipants?type=all",
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "1", "Pass :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "2", "Fail - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(error)  ); 
          done();
         });
    });
 
    /* End of getParticipants module*/

    // Start new module for identifyParticipant
    QUnit.module( "identifyParticipant");

    QUnit.test( "To send request with in-valid siteKey", function( assert ) {
      var done = assert.async();
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/identifyParticipant?type=verified&token=23423424",
        "method": "GET",
        "timeout": 0,
          "headers": { "Content-Type": "application/json","Authorization" : "Bearer" + client.siteKey + "234633562345345r34"}  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "2", "Fail - return success with invalid sitekey :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "1", "Pass - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(xhr))
          done();
         });
    });

  	QUnit.test( "To send request with valid siteKey - type=verified", function( assert ) {
      var done = assert.async();
      
      //console.log(JSON.stringify(client.data));
      if (client.data[0].hasOwnProperty("token") && client.data[0]["token"].length > 0 &&  client.data[0].hasOwnProperty("studyId") && client.data[0]["studyId"].length ) {
         //token = client.data[0]["token"];
      } else {
        assert.ok(1 == "2", "Fail - In sufficient input data for test case, client.data object has : " +  JSON.stringify(client.data));
        done();
      }
      
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/identifyParticipant?type=verified&token=" + client.data[0]["token"],
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "1", "Pass :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "2", "Fail - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(error)  ); 
          done();
         });
    });

    QUnit.test( "To send request with valid siteKey - type=notverified", function( assert ) {
      var done = assert.async();
      
      //console.log(JSON.stringify(client.data));
      if (client.data[1].hasOwnProperty("token") && client.data[1]["token"].length > 0 &&  client.data[1].hasOwnProperty("studyId") && client.data[1]["studyId"].length ) {
         //token = client.data[0]["token"];
      } else {
        assert.ok(1 == "2", "Fail - In sufficient input data for test case, client.data object has : " +  JSON.stringify(client.data));
        done();
      }
      
      var settings = {
        "url": "https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/identifyParticipant?type=notverified&token=" + client.data[1]["token"],
        "method": "GET",
        "timeout": 0,
        "headers": client.headers  
        };
        
        $.ajax(settings).done(function (data, textStatus, xhr) {
          //Ajax request pass.
          assert.ok( 1 == "1", "Pass :"+ JSON.stringify(data) );
          done();
        }).fail(function(xhr, status, error) {
          //Ajax request failed.
          assert.ok(1 == "2", "Fail - return HTTP status code : " + xhr.status + " :: " + JSON.stringify(error)  ); 
          done();
         });
    });




});

