# HNBGU Hostel Management Portal
[Github Link](https://github.com/VisheshVGR/hnbgu_hostel_management_portal) | [See live](https://hnbgu-hostel-management-portal.vercel.app/)
```
Admin account details -
Email : visheshguptavgr10@gmail.com
Password : password
```
## Table of Contents 📕
* [About the Challenge](#coderelay-2022)
* [Tools And Technology](#tools-and-technology)
* [Features](#features)
    * [Special Features](#special-features)
    * [Data Table Used](#data-table-used)
    * [Student Dashboard](#student-dashboard)
    * [Officer Dashboard](#officer-dashboard)
    * [Admin Dashboard](#admin-dashboard)
    * [All Complaints](#all-complaints)
    * [Miscellaneous Pages](#miscellaneous-pages)
        * [Home Page](#home-page)
        * [Hostels](#hostels)
        * [Contact Us](#contact-us)
* [Future Work](#future-work)
* [Gallery](#gallery)
* [Database Schema](#database-schema)
# CodeRelay-2022
* The Challenge
	* Build a Hostel Management Portal.
	* Essential features which were expected-
	    * For Student-
	        1.  Login Screen: You can either use Google authentication or just a normal email ID password.
	        2. The page after the login screen will be a Welcome Page, with a profile button and an option to raise a complaint. 
	        3. Raise Complaint Page: This page will contain a submission form with categories like Name Of Hostel, Category Of The Issue (cleanliness, electricity, etc.), Name Of The Person, Availability (Time), Room Number, Phone Number, and Description Of Issue.
	    * For Administration
	        1. The website will have the same interface with the only difference being for the complaint section. 
            2. The admin can see the complaints lodged by students.
	* Detailed View of all the Problem Statement can be found [here](https://drive.google.com/file/d/1HLIcM1jE_TwxM7tiwRn-yQ41rGXy6Q3K/view?usp=sharing)

# Tools and Technology
* The Front-end is created in **React.js** and **Material UI**. 
* For creating Back-end, we used **Firebase**. For the database, we used Google Firestore. We created a very flexible and versatile foundation for our codebase, so that in future its functionality could be easily extended and new agents could be easily added into it.
* For hosting we used **Vercel** which is a cloud platform that enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision.

# Features

## Special Features
* All Data is live fetched and updated improving user experience.
* This is a single-page website with no refresh on page change enhancing page load speed.
* Personalized background UI of student's respective hostel on Signup, Student Dashboard and Profile page implementing personalization.
* Strict security rules with proper feedback messages using react-toastify.
* Responsive website with accessibility features.
* Implement chat with HNBGU - Helpdesk for any queries
* If officers 1 and 2 are not able to resolve this within 7 days, the complaint request will be promoted automatically to the next officer.
* Officer can send out new Notification / Circullars which is shown on Home Page.

## Data Table Used
* It is used to display data in the form of table.
* Easily sort your rows based on one or several criteria.
* Easily filter your rows based on one or several criteria using Search Field.
* Easily paginate your rows and only fetch what you need.
* Easily export the rows in various file formats such as CSV, Excel, or PDF.
* Quick peek of issue without have to open info dialog box.

## Student Dashboard
* Student can Raise a New Complaing by entering 'Complaint Type' (electricity, cleanliness, mess, etc) and 'Complaint Description'.
* Student can see 'My Complaints' section with all complain lodged by him/her in Data Table.
* Info icon open dialog box for additional information like Issued To, Remarks etc.

## Officer Dashboard
* Features same UI for three different officer - Caretaker, Warden, Chied Warden.
* Data Table contains complaints issue to them only.
* Info icon open dialog box including following features-
    * Officer can set status of complaint as - Resolved, Pending, Declined.
    * Caretaker can esclate complaint to Warden and Warden can esclate complaint to Chief Warden.
    * Officer can add remarks for each complaints with additional information.
* Officer can add / delete Notification / Circulars from dashboard which is shown at Home Page. 

## Admin Dashboard
* Admin Data Table features all account details.
* Admin can change any account type to - Student, Caretaker, Warden, Chief Warden, Admin.

## All Complaints
* Every visitor is able to see all complaints.
* User can filter complains accordint to Resolved, Pending, Declined.
* All Data Talbe features available.
* Info icon open dialog box for additional information with remarks from Officer.

## Miscellaneous Pages

### Home Page
* It is the home page of our website with basic information.
* It features Notification / Circulars section with latest updates from Officers.

### Hostels
* It has information about various hostel available at HNBGU.
* Visitor can click on particular hostel to get details about it.

### Contact Us
* It contains information regarding contacts of HNBGU Hostels Officers.


# Future Work
* New Notice / Circullars section posted by Officers can be displayed at home page.
* Hostel admission process can be implemented.
* We can add feature to allocate room using website and verify students along with their documents using it.
* Fee Payment geteway can be implemented.
* Email verification, only particular college email id allowed security can be added.
* Website can be extended with new images, more hostels and more features.


# Gallery

|||
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Homepage-1.png">  Home Page |  <img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Homepage-2.png"> Home Page |
|<img width="1604" alt="Hostel Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Hostel.png"> Hostel Page|<img width="1604" alt="Single Hostel Info" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Hostel-single.png"> Single Hostel Info |
 <img width="1604" alt="Contact Us" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Contactus.png">Contact Us|<img width="1604" alt="All Complaints" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/AllComplaints.png"> All Complaints |
|<img width="1604" alt="All Complainta (info dialog box)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/AllComplaints-info.png"> All Complaints (info dialog box) |  <img width="1604" alt="Signin Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Signin.png"> Signin Page|
<img width="1604" alt="Signup Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Signup.png"> Signup Page| <img width="1604" alt="Profile Page" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Profile.png"> Profile Page |
<img width="1604" alt="Student Dashboard (Register Complaint)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Student-1.png"> Student Dashboard (Register Complaint) | <img width="1604" alt="Student Dashboard (My Complaints)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Student-2.png"> Student Dashboard (My Complaints)|
<img width="1604" alt="Student Dashboard (info dialog box)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Student-info.png"> Student Dashboard (info dialog box) | <img width="1604" alt="Officer Dashboard" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Officer.png"> Officer Dashboard |
<img width="1604" alt="Officer Dashboard (info dialog box)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Officer-info.png"> Officer Dashboard (info dialog box)|<img width="1604" alt="Officer Dashboard Notification Panel" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Officer-notification.png"> Officer Dashboard Notification Panel | 
<img width="1604" alt="Admin Dashboard" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Admin.png"> Admin Dashboard | <img width="1604" alt="Admin Dashboard (info dialog box)" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/Admin-info.png"> Admin Dashboard (info dialog box) |


# Database Schema
* Users Schema
<img height="500px" alt="Users Schema" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/db-users.png"> 

* Complaints Schema
<img width="1604" alt="Complaints Schema" src="https://raw.githubusercontent.com/VisheshVGR/hnbgu_hostel_management_portal/main/Gallery/db-complaints.png">
