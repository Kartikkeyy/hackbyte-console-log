# RecruitIn 
### A Job Recruitment Platform

[![DEMO VIDEO](https://i3.ytimg.com/vi/LlyBh7tNswY/maxresdefault.jpg)](https://www.youtube.com/watch?v=LlyBh7tNswY&t=177s)


## Table of Contents

 - Problem <br>
 - Features<br>
 - Technologies Used<br>
 - Getting Started<br>

## Problem <a name = "problem"></a>
We've recognized inefficiencies in our current Training and Placement (TNP) cell procedures. The manual email dissemination of job opportunities, followed by individual applications, is labor-intensive and prone to delays.
To address this, we're exploring tech-driven solutions like a centralized online platform to streamline the process. This will reduce workload for students and staff, while offering real-time updates on application statuses and improving accessibility to job opportunities.
<br><br><br>

### Why RecruitIn ?

### Streamlined Application Process
With RecruitIn, we introduce a streamlined application process that eliminates the need for manual dissemination of job opportunities and tedious form submissions. Through our platform, students can effortlessly explore job listings tailored to their interests and qualifications, significantly reducing the administrative burden on both students and TNP personnel.

### Simplified Application Management
RecruitIn simplifies the application management process by offering a user-friendly interface for students to apply to job listings directly through the platform.By eliminating the need for external forms and paperwork, we reduce the administrative overhead associated with managing job applications, allowing TNP personnel to focus on more strategic initiatives.

### Enhancing Efficiency and Accessibility
By leveraging RecruitIn, educational institutions can enhance the efficiency and accessibility of their job placement processes. Our platform empowers students to proactively search for and apply to job opportunities, while providing TNP personnel with valuable insights and analytics to optimize the placement process.

### Empowering Success
RecruitIn represents a paradigm shift in the way job placements are managed within educational institutions. By harnessing the power of automation and user-centric design, we empower students to pursue their career goals with confidence, while enabling TNP personnel to effectively facilitate connections between students and prospective employers.
## Features <a name = "features"></a>

- **User Authentication**: Students, companies, and TNP members can register and log in securely to access their respective functionalities.

- **Student Dashboard**: Students can create profiles, upload resumes, and browse job listings tailored to their skills and interests.
- They can also track the status of their applications and receive notifications about upcoming interviews.

- **Company Dashboard**: Companies can create profiles, post job listings, and search for suitable candidates based on specific criteria.
- They can also review applications, schedule interviews, and communicate with students directly through the platform.

- **TNP Dashboard**: TNP members have administrative privileges to manage student and company accounts, review job postings, and facilitate communication between students and companies.
- They can also generate reports and analytics to track placement trends and outcomes.

## Technologies Used <a name = "technologies"></a>

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (React.js)
    
- Backend:
  - Node.js
  - Express.js
  - MongoDB 
  
- Authentication:
  - JSON Web Tokens (JWT)
  - bcrypt.js (for password hashing)
  
- Version Control:
  - Git
  - GitHub
  


## Getting Started <a name = "getting-start"></a>

To run this project locally, follow these steps:

1. Clone the repository to your local machine.<br>
2. Create a config folder inside server and create a config.env file inside it.<br>
3. Setup the following things inside your config.env:<br><br>
   `PORT`<br><br>
   `CLOUDINARY_CLIENT_NAME`<br><br>
   `CLOUDINARY_CLIENT_API`<br><br>
   `CLOUDINARY_CLIENT_SECRET`<br><br>
   `MONGO_URI`<br><br>
   `JWT_SECRET_KEY`<br><br>
   `FRONTEND_URL`<br><br>
   `COOKIE_EXPIRE`<br><br>
   `JWT_EXPIRE`<br><br>
4. Run the command `npm i` in server and client directory.<br>
5. Run the command `npm run dev` in server and client.<br>
6. Here you go !
