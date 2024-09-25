# **Money Lending Application**
### Introduction
This Money Lending Application allows users to sign up, log in, fetch user data, and borrow money. It demonstrates a basic flow of user authentication and authorization, along with loan management.


**OverView of this project ->** 1st i had create a database name money-landing, then i had created a mongoose schema for my project, **which contains :**    


    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    purchasePower: { type: Number, required: true },
    loans: [
        {
            amount: { type: Number, required: true },
            tenure: { type: Number, required: true },
            monthlyRepayment: { type: Number, required: true }
        }
    ],
    dateOfRegistration: { type: Date, default: Date.now }

**Features :-** 1.User Registration, 2.User Login, 3.Fetching User Information. 4.Borrowing Money, 5.JWT Authentication

**Technologies Used :-**

Frontend: HTML, CSS, JavaScript


Backend: Node.js, Express.js


Database: MongoDB


Authentication: JWT (JSON Web Token)

---
### 1st install (npm install) in termainal of this github clone,.then RUN program, using (nodemon server.js)

**From here API call is starting..**

API Endpoints


## **1st i will do user registeration** 

Use POSTMAN, and follow the following screeshot, how im calling API call for signup new registraion..

URL: /api/signup

Method: POST
![image](https://github.com/user-attachments/assets/05c511c6-664f-4c18-86af-2bc49bfd6325)
- This registraion is basically with two validation, if user age is greater then 20, and second is user salary is greater than 25k.

![image](https://github.com/user-attachments/assets/afaf34b7-5e24-4ac3-b04b-b33596bd036b)


-> here you can check as user tried to enter salary less than 25k , its giving warning..

->Now i will do registartion with valid data


![image](https://github.com/user-attachments/assets/4d70d9bf-2a09-418c-a9d7-b604986b08c8)


                                       ------------
![image](https://github.com/user-attachments/assets/f63b5b91-1997-4654-97c3-b0337843fbdf)
->here u can check, status 201, User Registration successfull.

---
## **2nd i will do user login** 
URL: /api/login

Method: POST

**Functionality:** 


● Allow user to login using email and password.


● Use JWT for authentication.   -> for this i used  **const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });**
Generally this will  Generate a JWT token for the authenticated user, this will create a token for particular user that will valid for 1 hour, and on the basis of this i will fetch user information


**Working of this api**

Here on the basis of email and password, will verify whether user exist or not,.then **Token** will generate


-> let suppose if user password is wrong
![image](https://github.com/user-attachments/assets/dfb75222-5b51-4178-8f6d-4a6a00e50345)

Then it will generate 400 bad request, and saying invalid email or password
![image](https://github.com/user-attachments/assets/95110ac4-7e85-422b-86d6-03d8272ff8cb)


Now will give correct email and password, and here you can see, **token** came from backend...now on the basis of this a user can fetch ther details
![image](https://github.com/user-attachments/assets/29a743f7-f1b1-4e2b-b152-3007bbf9602f)


___

## **3rd Show User Data**

URL: /api/user

Method: GET

--then goto **Authorization** then in **bearere token** in the **POSTMAN**, paste **jwt token**

-->if you paste the correct token , then you can see user details, that you can see in below image

![image](https://github.com/user-attachments/assets/cfddfea8-8463-4e72-94da-dfe9ce20f820)


---

## **4th Borrow Money using API**

URL: /api/borrow

Method: POST


#### **Functionality:**


● Allow the user to borrow money from the application.


● Update the Purchase Power amount.


● Calculate the tenure of repayments and the monthly repayments with an interest rate of 8%.


● Return the updated Purchase Power amount and the monthly repayment amount.


Soltn ->


#### On the basis of **token** user authentication can be done, and then only user can borrow..


**-->** here if user **purchasePower** > **loan amount** , then only user can borrow amount..


let's understand using example..


1st i will borrow 3000 as shown in below image..


![image](https://github.com/user-attachments/assets/c5665f92-dc74-4585-8002-759e3b77abd2)


**-->** here as you can see, user borrowed 3000, and then rest 96000 left as purchase power,  and also showing how much **monthly repayment** he need to do..


### 2nd i will borrow amount which will be greater than purchase amount...


![image](https://github.com/user-attachments/assets/f1afbc45-f8b6-4cab-b7d5-e42a25694476)


In above image you can see since loan amount is greater than purcghase amount so, user can't borrow.











