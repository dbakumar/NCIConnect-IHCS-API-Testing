# NCIConnect-IHCS-APITesting
The quick testing tool based on Qunit js to validate NCI Connect Study API request and response messages. This helps to run automated test cases on API before making changes to the site CRM software application. 


# How to Contribute
Step 1 : Fork the repo

Step 2 : Add more test case as below in your test.js file: 

  Step 2.1 : Start the new Qunit module. Recommended to create a module per API method.
        
        example : 
        
        QUnit.module( "group a" );
        
  Step 2.2 : Add Your Qunit Test Case. 
        
        example : 
          
          function add( x , y ) {
            return x + y;
          }

          QUnit.test( "add()", function( assert ) {
            var result = add(2,5);
            assert.equal( result, 7, "add(2,5) equals 7" );
          });

Step 3 : Enable Github pages setting on your repo for testing or Make pull request to merge to this master. Happy coding!..
