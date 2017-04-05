# Academia Net
 Academia Net is a review network sponsored by the University of Ontario Institute of Technology on Oshawa, Ontario, Canada for members of the academic community to come together and write their reviews of various conferences being held and journals that have been published in the academic community, or add their own if it is not in the database. Using the Ionic Framework hosted on Google Cloud as a frontend, and Firebase as a backend, we have been able to create a unique and reliable software that allows members of the global academic community to come together to share their experiences with their contemporaries.
 
 ## Licensing
 
Copyright 2017 Dominick Mancini, Scott McLean, and Alexander Wheadon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 ## Migration Instructions
 
*NOTE*: This software is written using Typescript and Angular 2, under the Ionic v2 Framework. As such, it is highly recommended that you familiarize yourself with these frameworks and languages if are not already.

This software, in its current state, is designed to work with a now-defunct Firebase backend that maintains control over the data flow. This means, that should any individuals wish to make use of the software, they will need to modify the code pointing to Firebase in one location, and establish their own backend with support for federated login services (i.e., Facebook, Twitter, Google, GitHub), or remove the federated login functionality altogether. This section will cover the steps necessary to migrate the Academia Net frontned to a new Firebase backend.

### Firebase Configuration

2. Populate the database with the data.json file that is located at the root of this repository.

3. Set the realtime database rules as follows:

```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      },
    },
    "conferences": {
      ".read": "auth != null",
    	".write": "auth != null"
    },
    "usernames": {
      ".read": "auth != null",
    	".write": "auth != null"
    }
  }
}
```

4. You may delete all user accounts currently in the usernames and users sections of the database EXCEPT for the user account with name "Anonymous" and User ID "o0UxaIlJqWSYnXtibzG7x6nbOBr2". This is the guest account, and must always exist in order for the application to work properly. (Unless, of course, you wish to modify this component of the application)

5. If you wish to use the federated login services (i.e., Facebook, Twitter, etc.), please use the Firebase documentation to configure these services. All code in the application is already set up, meaning only configuration on the Firebase side is required. Such a task should take less than an hour at the absolute longest.

### Change Firebase Account

1. Retrieve the information from your Firebase project to connect to a web application. You should only need the JSON object; ignore the script tags and CDN, etc.

2. Open the AcademiaNetSrc/src/providers/data-service.ts Typescript file, and change the code beginning at line 30 to match the information you retrieved from firebase. The code you are looking for should resemble this:

```
const firebaseConfig = {
   apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",
   authDomain: "sofe-4870-project.firebaseapp.com",
   databaseURL: "https://sofe-4870-project.firebaseio.com",
   storageBucket: "sofe-4870-project.appspot.com",
   messagingSenderId: "114732260320"
};
```

3. Once this code has been modified, you can recompile the project. Since the project is written in Typescript, it must be transpiled into JavaScript in order to be interpreted by a web browser, which means that any and all changes made to the SCSS, Typescript, and HTML require recompilation to run again.

### Compiling Code

1. The code provided here is the source, and you must install required Dependencies and transpile the Typescript in order to serve the application.

2. Ensure you have Node.js installed.

3. Run `sudo npm install -g ionic` if on macOS/Linux or `npm install -g ionic` in an elevated command prompt if on Windows

4. In the AcademiaNetSrc directory, run `npm install`. This will install the dependencies required to run the program

5. Once this is complete, run `ionic serve`. This will transpile the Typescript and host the application on http://localhost:8100/

6. Hosting this way automatically re-transpiles the source every time a change is saved. The compiled application will be located under AcademiaNetSrc/www

# Contact

If, for any reason, you have any questions or concerns about this project, please contact Dominick Mancini at dominick.mancini@outlook.com.
