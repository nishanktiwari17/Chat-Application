require("dotenv").config();
import session from "passport-session"
import passport from "passport"
import express from "express"
import Google from 'passport-google-oauth20'
import {Messages, Login} from "./dbmessages"
import findOrCreate from "mongooose-findorcreate"

const app = express();
const GoogleStrategy = Google().Strategy;

//cookie session
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    console.log("session created");
    done(null, user.id);

});
passport.deserializeUser(function(id, done){
    console.log("session");
    Login.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(Login.createStrategy());

passport.use(
    new GoogleStrategy
    ({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/messages/new",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
function(accessToken, refreshToken, profile, done) {
    Login.findOrCreate({ googleId: profile.id , name: profile.displayName}, function (err, user) {
        done(null, user);
    });
}
));