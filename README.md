# Blog API - The Odin Project

A simple backend only API made for the odin project. Made using express, passport and mongoDB.

Password hashing with bcrypt, user auth with jwt, mongodb database, express server, vite react frontend for admin, next js frontend for user

try out shadcui
add some tailwind and typescript

[Live Link]()

Api Routes:

### /auth

/log-in POST taking username and password strings
/log-out GET
/sign-up POST taking username, password, confirmPassword, email strings
/session GET taking JWT in Authorization Header
