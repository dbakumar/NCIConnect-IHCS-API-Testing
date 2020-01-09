QUnit.config.autostart = false;
var client = {"siteKey" : "", "headers" : "" };

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

    QUnit.test( "To send request with in-valid Site Key", function( assert ) {
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
            assert.ok( 1 == "2", "Failed - return success with invalid site key :"+ JSON.stringify(data) );
            done();
          }).fail(function(xhr, status, error) {
            //Ajax request failed.
            assert.ok(xhr.status == "401", "Passed - return HTTP status code 401")
            done();
           });

    });
    
    QUnit.test( "To send request with valid Site Key", function( assert ) {
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
            assert.ok( xhr.status == "200", "Passed - return success with valid site key and token:"+ JSON.stringify(data) );
            assert.ok( 1 == "200", "Passed - return success with valid site key and token:"+ JSON.stringify(data) );
            done();
          }).fail(function(xhr, status, error) {
            //Ajax request failed.
            assert.ok(xhr.status == "200", "Failed - return status code :" + xhr.status + " and message : " + JSON.stringify(xhr.responseJSON));
            done();
           });

    });

    /* End of getParticipantToken module*/
 
  		
});

