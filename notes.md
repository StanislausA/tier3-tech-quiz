## Scenarios
If you do any data fixes to the application data, make sure to update the `db/users.csv` and/or `db/orders.csv`.

### Issue 1
Login fails for user dkmyp@example.com even though they claim their password “s0persekret” is correct

Hints: 
- Verify their claim by trying their credentials to see if you can login
    - If the credentials do not work, use the Rails console to reset the user's password
    - In Rails console, use the <u>ActiveRecord</u> user model to find the user by username
    - Reset the password using this code (this code snippet assumes the user you retrieved earlier through pry is stored in a variable named “user”)
    - Verify that login works using the new password you created

```
user = User.find_by(username: "dkmyp@example.com")
user.update(password: "new password here")
```

Fix:
- verified issue
- updated user's password
- user able to login
- updated csv


### Issue 2
A hacker got into the system and injected some javascript that is showing a pop up dialog every time a page is loaded 

Hints:
- Use the developer tools in your browser to help you

```
check view template `application.html.erb`, has the script (was expecting a remote script)
LOOK: return to this issue
```
Fix:
- browser alert on page load
- network shows script in assets
- debugger shows the script code
- checked templates for parent loading this script
- `application` template loads in the script
- removed the js tag
- issue no longer persists


### Issue 3
The SRE team reported that metric collection system is reporting a javascript error that is occurring every 10 seconds

Hints:
- Use the developer tools in your browser to help you

Fix:
- `oopsie` function called in loop
- error: logger method not found
- debugger script from `assets/custom.js` (symlinked)
- method sig error, changed logger to info
- script runs without error


### Issue 4
When a user logs out they are still able to access `/users` and `/orders` as themselves

Hints:
- Verify the issue by logging in, navigating to `/users` and `/orders`, then logging out and attempting to navigate to again
- The code has text comments “# Login” and “# Logout” above the Ruby on Rails methods!

Fix:
- issue verified
- reviewed session controller, user session saved to "user_id"
- typo on session destroy "user_iid"


### Issue 5
The Users page is missing a user - admin3@example.com is not listed

Hints:
- Verify the issue by logging in as one of the Admin users
- Verify if the user is visible in other areas, such as the Orders page
- Review user data for any anomalies
- Review application code for insight

WIP:
- verified issue (admin3 not present in users list)
- created order as admin3 (present in orders list)
- seed data looks fine (note: user dkmyp, admin2 and admin3 have same address)
- checked index and users template, all good
- users controller, "admin3" was explicitly removed from render `@users = User.where("username <> 'admin3@example.com'").all`
- enabled admins to retrieve all users without constraint


### Issue 6
When customer soandso@example.com logs in they only see 3 out of 4 of their orders

Hints:
- Verify the issue by logging in as the user
- Verify the issue by logging in as an Admin
- Review order data for any anomalies
- Review application code for insight

Fix:
- logged in as soandso (3 orders rendered)
- referenced seed data (4 orders under this user)
- in admin view, only 3 orders show
- missing order: Ball point pens,100,90.00,2025-01-02T03:30
- reviewed index and order templates (seems fine)
- orders controller renders past orders (missing order is a future order)
- left as is for now, could be intended
- added a 2 new orders to verify
- LAI, issue area `orders_controller / line 9`
- having a separate table for future orders could reduce cognitive load

### Closing
- attempting to run tests
- found tests were failing on reset, LAI
