# Resort-System

Issues:

Admin

1. User table should only show isAdmin:false (in table buttons are hidden when you are the admin instead theres a string showing that youre the admin (fixed))
2. Reservation table color Status
3. dont allow the user to go back to login page or home page when logged out
4. View Page should have list of transaction that associated with their ID
5. User Status
6. You have to put a sign where you can see "You have to put Rooms to associate your servicses"
7. create room serviceId from http://localhost:5000/rooms/serviceid is undefined
8. Update Service
9. view service and room

Client

1. navigation after login (block the please reserve here if not logged in (fixed))
2. change entrance rate to services rate then put their prices (fixed for now)
3. subscribe to the email and definition (this is fixed for now)
4. react scroll (fixed)
5. integrate time (not necessary) remove codes regarding time (fixed)
6. wrap other endpoints with loading (fixed)
7. Logout button when on different page (fixed)

thinking to become permanent

1. remove profile in sidebar

Few things to note:

1. it is impossible to save from state when you forcibly reload the page otherwise you have to save it in backend(database).

Changes when in local and development (deployed)

1. cors url
2. package.json in clientUser (from "private": true to "homepage":".") remove "proxy": "http://localhost:5000/"
3. add .env PORT = 3000, REACT_APP_API_URL = "http://185.201.8.202/"
4. setup const axiosInstance = axios.create({ baseURL: process.env.REAC_APP_URL, });
