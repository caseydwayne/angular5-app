# Angular5 App

### How To Launch

You will have to use `npm start` to launch the project. It relies on a (reverse) proxy in order to access the images...

Navigate to `http://localhost:4200/` and click away.

***IF AN IMAGE DOES NOT LOAD, THE SERVER RETURNED A BOGUS 401 OR 404 RESPONSE.***

My code works.

----

#### Notes

- The update (put) call to the API is currently disabled. UI/Setting mechanics still activate.
- The app only works on demo mode because I didn't feel like wiring everything back up.
- Only the 160 chars of the first 10 comments will be shown.
- Only the first 99 events will make additional requests to the api (for images/user status).