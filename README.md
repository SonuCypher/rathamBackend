# Getting Started 



### `npm nodemon index.js`

Runs the app 
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# APIs
 student signin:[http://localhost:3000/api/students/signin].should provide student id and password in the body

student view session:[http://localhost:3000/api/students/freesessions/:userid] user should provide userid in params
 
 student book session:[http://localhost:3000/api/students/booksession/:userid/:sessionid] they should provide the userid and sessionid in the params


 Dean signin:[http://localhost:3000/api/dean/signin]. should provide dean id and password in the body
 
 Dean create session:[http://localhost:3000/api/dean/createsession/:id] should provide user id in params.In the body should provide day and startTime. startTime should be date in yy,mm,dd format.

 Dean view pending session:[http://localhost:3000/api/dean/pendingsession/:id] should provide user id in params.