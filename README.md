# messanger
Simple messanger written in pure Php using MVC pattern.

##### Stack: Php7, Jquery, Bootstrap, Mysql.

App provides following functionality:
* Admin
    * CRUD for users
* User
    * Edit profile
    * Send messages to other users in realtime
    * See quantity of new messages per dialog
    
App's installation:
   * Set db config in config/dp.php
   * Change error handling if needed in config/error.php
   * In config/app.php you shall set own salt for password hashing
   * Run migrations script migrations.php
