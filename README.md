[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/qBr6G7dS)
# Final-project
Web Programming 2023 - Final Project

### Link to render static site:
https://frontend-final-project-aleksi.onrender.com/

## Summary

This application is an online marketplace where users can create camping gear related listings, edit/delete their own listings and search for listings based on keywords and categories. The marketplace allows users to create accounts, login/logout and reset their passwords.

## Running and Installation instructions
To run the application locally one needs to:
1. Clone the project
2. Run `npm install` inside frontend and backend folders to download necessary packages
3. Create .env files in the roots of frontend and backend folders with the following contents:  

Backend .env
```
MYSQL_HOST='localhost'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='example'
MYSQL_DATABASE='example_db'
JWT_KEY='any-string'
FRONTEND_URL=http//localhost:5173
```  
Frontend .env  
```
VITE_API_URL=http//localhost:5000
```  
4. Run `docker-compose up -d` in project root folder
5. Run `npm run dev` inside backend and frontend folders 

## Backend implementation

Project's backend was built with Node.js using Express framework.

### Endpoints

**Items**  
- **GET "/api/items"**  
Responds with all items in the items table.
- **GET "/api/items/myitems" (valid token required)**  
Responds with all of users own items.
- **POST "/api/items" (valid token required)**  
Inserts valid item to database if it doesnt already exist based on item title/category/price.
- **DELETE "/api/items/:id" (valid token required)**  
Deletes an item from the items table based on the item id received.
- **PUT "/api/items/:id" (valid token required)**  
Updates items title/description/price values in the database based on the given id, if the received values are valid.
  
**Users**  
- **GET "/api/users" (valid token required)**  
Responds with all users names and emails in the users table.
- **POST "/api/users/signup"**  
Inserts valid user to database if it doesnt already exist based on given email, if successful responds with users id, email and token.
- **POST "/api/users/login"**  
Creates a token for authentication if the email and password received are valid, responds with users id, email and token.
- **POST "/api/users/forgotpassword"**  
Checks if the email received exists in database, if it does creates a token that expires in 5min using JWT_KEY and users old password. Builds a one time use link to reset password in the following format: "*${process.env.FRONTEND_URL}/resetpassword/${identifiedUser.id}/${token}*". This link is supposed to be sent to the users email, but I didnt implement that part in the project. Instead the URL to reset password is sent as a response to be logged in console for testing purposes.
- **GET "/api/users/resetpassword/:id/:token"**  
Verifies that the password reset URL is valid to use by checking that user id exists and that the token received is valid. On success responds with a message "Verified".
- **PUT "/api/users/resetpassword/:id/:token"**  
Verifies that user id and token received are valid. Validates the password received. Updates user's password based on user id.

## Frontend implementation

### All Listings -page
It uses an ItemsList -component, which renders a list of Item -components. These listings display the items category, title, description, price and owner's name. Users can filter the listings that are visible on the page based on selected categories by checking or unchecking checkboxes. Users are also able to filter the listings by keywords by typing text inside an input field and clicking the magnifying glass -icon next to it. These keywords are listed under the input field with designated cross -icons next to them, that the user can click to remove active keywords. Both of these filtering methods are usable simultaneously. For parts of the layout and styling I used Material UI component library including checkboxes, icons and grid -component that lays out the listings in two columns on larger screens and single column on small screens.  

### My Listings -page
It lists users own listings. This page uses the same ItemsList and Item -components as All Listings -page does, but it displays buttons for editing and deleting listings that the Item -components on All Listings -page do not display. Owner's name is also removed from the displayed listings. Clicking on the Edit -button will replace the title/description/price text fields with corresponding input fields, where the user can edit the existing values. While the listing is in edit mode the buttons switch from Edit/Delete to Save/Cancel. Clicking the Save -button sends PUT request to backend with replaced values and ends the editing mode, unless the inputs are invalid, in which case appropriate error messages are displayed below each field. Cancel -button resets any changes and also closes the editing mode. Clicking the Delete -button will display a confirmation modal with Cancel/Delete -buttons. After either of the PUT or DELETE requests complete, refetch for useQuery is triggered to update the current listings being displayed.

### All Users -page
Lists registered users names and emails. This page is mostly a leftover from my demo-project that I used as a starting point for this project, that I decided to keep in for testing purposes.  

### Add Item -page
It contains a form with input fields for title, description, price and image link. It also has a dropdown menu to select item's category. Mandatory fields to fill are title and price, category has to also be selected from the dropdown menu. There is input validation for title and price fields, title must contain 3 to 60 characters and price input has to have only numbers with two decimals. Invalid input messages are displayed below the corresponding fields if user tries to add an item with wrong values.

### Authenticate -page
It has a toggleable form that user can either sign up or login with. The sign up form has input validation for email already in use and password length where error messages are displayed for invalid inputs. The login form displays error if the email and password do not match. The form also has a hyperlink, which leads the user to ForgotPassword -page incase they have forgotten their password.

### ForgotPassword -page
It has an input field where users can type their email to receive a link to reset their passwords. Displays an error message under the input field if entered email doesn't exist. If the request to reset password is successful it displays a message telling the user that the password reset link was sent to their email and that it expires in 5 minutes. I did not implement the sending an email part in the project, instead the link is obtainable in the DevTools console by expanding the response and copying the string contents of the "link" -key.

### ResetPassword -page
User gets here by using the link that they received from ForgotPassword -page. It has a form where user can type the new password twice, in a situation where the two passwords do not match an error message is displayed. Code of the page contains an useEffect -hook, which triggers if the data or status variables of the useQuery that controls the query function change. The useEffect -hook controls a state variable called "verified", which in turn is being used to determine if the page should display text "Link expired!" or the password reset form. The handler -function that gets executed on submit, calls useQuery's refetch method and verifies that the link is still valid before the mutation -function handling password's PUT request is being run. Both of the API requests used in this page require the use of user's id and token which the URL contains. I got access to these values with react-router-dom's useParams -hook.

## Challenges and how I overcame them
There were many minor challenges that I faced during this project, which aren't worth mentioning. I will list some of the major challenges below:  
- **Vite not allowing dots in URL**  
I faced this problem when I was creating the functionality for password reset. At first I didn't realize, that the password reset page getting 404 not found was caused by the dots, which the URL contained from the use of JWT as part of it. After figuring out the reason only solution to the problem I found was the use of a plug-in called "vite-plugin-rewrite-all".  
- **Issues with routing and env variables on Render**  
After the first deploy of the application to Render, I noticed that the env variables and redirects weren't working there. To fix the routing issue I created a rewrite rule for the static site, which routes requests to the sites /index.html. The problem with .env variables that I use in my Render backend web service was fixed simply by re-deploying. It was caused by the fact that I had added them after deploying, which lead to them being undefined. These variables were JWT_KEY and FRONTEND_URL that I use in some of the backend controllers.  
- **Reset password functionality**  
It took me a while to implement it, but I learned a lot while making it. Mainly the challenge was the need to use route parameters in the API endpoint as well as the frontend routes related to password reseting. Figuring out how to connect them to each other was challenging.  
- **TypeError: Failed to fetch in AddItem mutateFn on Render**  
The challenge in fixing this problem was figuring out what was causing it. I hadn't faced this error while running the application locally or in the integration tests that cover adding a new item. This error on Render was caused by having the command to redirect inside the same submit -handler that calls the mutate function, after calling the mutate function. I fixed it by making the redirect command trigger on the useMutation's onSuccess function instead. I had not realized that a long enough delay with queries would bring up problems with the earlier implementation.
