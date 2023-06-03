





# Minimal Google_Docs_Clone

The project includes an autosave functionality that automatically saves the title and content in real-time as you type.


## used to devlop

 - Backend :- Nodejs
 - Frontend :- Reactjs
 - Database :- MongoDB
## Time for Autosaving Data

| AutoSave           | Time                                                                |
| ----------------- | ------------------------------------------------------------------ |
|  Localstorage| 2sec |
| Database | 30sec|


## How it works

To set up the project in VS Code, follow these steps:

1.Open the project in VS Code.

2.In the backend folder, run the command `npm i` in the terminal to to install nodemodules.

3.After initialization, execute `npm start`  to start the backend server.

4.Similarly, navigate to the frontend folder and run the same commands  to start the React app.

5.By running both folders simultaneously, you will launch the React app and be able to access it.


In the React app, you will find a signup and signin functionality. Upon signing up with your name, email, and password, you can proceed to sign in and be redirected to the home page. On the home page, there is a button to create a new document, allowing you to input a custom title and content. The document is automatically saved in your database. Additionally, you have the option to delete this document as well.

