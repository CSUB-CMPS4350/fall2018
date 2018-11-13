<?php  
session_start(['cookie_lifetime' => 86400,]);
include("db.php"); //file for data base

// ---------- PHP SECTION ---------- //



// Check if submit button has been clicked, along with validation of forms
if (isset($_POST['dbinsert'])) //name for submit button = 'dbinsert'
{
	$query = "INSERT INTO client (fname,lname,address,city,state,zip,phone,business_name,fax,email) VALUES (
		'$_POST[fname]',
		'$_POST[lname]', 
		'$_POST[email]')";
	pg_query($query) or die('Query failed : ' . pg_last_error());

	$somevalue = "SELECT * FROM client";
	$result = pg_query($somevalue) or die('Query failed : ' . pg_last_error());
	$c = pg_num_rows($result); 
	
        // make client_id for foreign key constraints for problem
	$probandcat = "INSERT INTO problem (client_id, category, description) VALUES ('$c','$_POST[category]','$_POST[problem]')"; 
	pg_query($probandcat) or die('Query failed : ' . pg_last_error());

        $problem = "SELECT max(problem_id) from problem"; 
	$pr = pg_query($problem) or die('Query failed : ' . pg_last_error());
        $probid = pg_fetch_result($pr,0,0);

        $clientHasAProb = "INSERT INTO client_hasa_problem (client_id,problem_id,s_date,e_date) VALUES ('$c','$probid',CURRENT_DATE, NULL)";
	pg_query($clientHasAProb) or die('Query failed : ' . pg_last_error());

	// Make problem status for problem, set solved to null
        $ps = "INSERT INTO problem_status (solved) VALUES (NULL)";
	pg_query($ps) or die('Query failed : ' . pg_last_error());
	
        // Load page for client that has been made!
	header("Location: clientmade.php?cid=$c");

	// exit current page
	exit;
}

/*if(isset($_POST['login']))
{

$email = "select client_id from client c where c.email = '$_POST[uname]'";
$emailres = pg_query($email) or die('Query failed: ');
$c = pg_fetch_result($emailres, 0);

header("Location: clientmade.php?cid=" . $c);


}*/

?>

<! DOCTYPE html>
<html lang = "en">
<head>
<!-----------JAVASCRIPT-------------->
<script>
</script>

<link rel = "icon" type = "type/x-icon" href = "ITStartUp.png">
<title> IT Support Start-Up</title>
<meta charset = "utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">


<!-- main css properties from Bootstrap -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">

<!-- css from Jose -->
<link rel="stylesheet" href="/~dirk/itsupport/css/table.css">

<!-- my own css -->
<link rel="stylesheet" href="/~dirk/itsupport/css/custom.css">

<!-- personally made icon -->
<link rel = "icon" type = "type/x-icon" href = "ITStartUp.png">

<!-- two fonts that work well together, from google -->
<link href="http://fonts.googleapis.com/css?family=Meta Sans:bold" rel="stylesheet" type="text/css">
<link href="http://fonts.googleapis.com/css?family=Skolar" rel="stylesheet" type="text/css">


<!-- top Navbar/header of page -->
<nav class="navbar navbar-custom navbar-expand-md fixed-top">
<img src = "ITStartUp.png" alt = "logo" width = 50px height = 50px style = "padding-right: 10px;">
<a class="navbar-brand" href="client.php">IT Support Start-Up</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarsExampleDefault">
<ul class="navbar-nav ml-auto">
<li class="nav-item active">
<a class="nav-link" href = "client.php">Home <span class="sr-only">(current)</span></a>
</li>
<li class="nav-item">
<a class="nav-link" href = "clientservices.php">Services</a>
</li>
<li class="nav-item">
<a class="nav-link" href = "clientmade.php">My Account</a>
</li>
<li class="nav-item">
<a class="nav-link" href = "clientcontact.php">Contact Us</a>
</li>
</ul>
</div>
</nav> 

</head>


<body>
<!-- The Modal -->
<div id="id01" class="modal">
  <span onclick="document.getElementById('id01').style.display='none'"
class="close" title="Close Modal">&times;</span>

  <!-- Modal Content -->
  <form class="modal-content animate" method = "post">
    <div class="imgcontainer">
      <img src="user-avatar2.png" alt="Avatar" class="avatar">
    </div>

    <div class="container">
      <label><b>Email</b></label>
      <input type="text" class = "form-control" placeholder="me@email.com" name="uname" id = "unameAndpass" required>

      <label><b>Password</b></label>
      <input type="password" class = "form-control" placeholder="Enter Password" name="psw" id = "unameAndpass">
       

      <button type = "submit" class = "btn btn-primary" name = "login">Login</button>
      <label>
        <input type="checkbox" checked="checked"> Remember me
      </label>
    </div>

    <div class="container" style="background-color:#002a80">
      <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
      <span class="psw" style = "color: white;">Forgot <a href="#" style = "color: cyan;" >password?</a></span>
    </div>
  </form>
</div>

<div id ="img_container">
<img id = login-img src = "Internet-Technician3.jpeg" alt = "Skyscrapers" width = 100% height = 80%>
<div class ="greeting"> <h3><b>Welcome to IT Support Start-Up!</b></h3>
<br><br><br><br><br>
<h4>Login to view your account and problems, or create an account to submit an issue.</h4>
</div>
<button id = "login" class = "btn btn-primary" onclick= "document.getElementById('id01').style.display = 'block'"><b>Login</b></button>
<!-- Below is button and associated code to scroll to account creation part of home page here -->
<button id = "account" class = "btn btn-primary" onClick = "document.getElementById('create').scrollIntoView();"><b>Create Account</b></button>
</div>

<div id ="img_container">
<img id = login-img src = "Internet-Technician5.png" alt = "Servers" width = 100% height = 80%>
<div class = "secImg">
<h3> All your IT needs, in one spot.</h3>
</div>
</div>

<div class="main-container">
<main role="main" class="container">

<!-- div id given here for "create account" button at top of page -->
<div id = "create">
<form method = "post">
<div class="form-row">
<div class="form-group col-md-6">
<label for="inputFirstname4">First Name</label>
<input type="text" class="form-control" id="inputFirstname4" name = "fname" pattern = "[A-Za-z]{1,15}" placeholder="First name" required>
</div>
<div class="form-group col-md-6">
<label for="inputLastname4">Last Name</label>
<input type="text" class="form-control" id="inputLastname4" name = "lname" pattern = "[A-Za-z]{1,15}" placeholder="Last name" required>
</div>
</div>
<div class="form-group">
<label for="inputAddress">Address</label>
<input type="text" class="form-control" id="inputAddress" name = "address" pattern = "[A-Za-z0-9'\.\-\s\,]{1,30}" placeholder="1234 Main St" required>
</div>
<div class="form-row">
<div class="form-group col-md-6">
<label for="inputCity">City</label>
<input type="text" class="form-control" id="inputCity" name = "city" pattern = "[A-Za-z0-9\s]{1,20}" required>
</div>
<div class="form-group col-md-4">
<label for="inputState">State</label>
<select class="form-control" id = "inputState" name = "state" required>
<option selected></option>
<option value="AL">AL</option>
<option value="AK">AK</option>
<option value="AZ">AZ</option>
<option value="AR">AR</option>
<option value="CA">CA</option>
<option value="CO">CO</option>
<option value="CT">CT</option>
<option value="DE">DE</option>
<option value="FL">FL</option>
<option value="GA">GA</option>
<option value="HI">HI</option>
<option value="ID">ID</option>
<option value="IL">IL</option>
<option value="IN">IN</option>
<option value="IA">IA</option>
<option value="KS">KS</option>
<option value="KY">KY</option>
<option value="LA">LA</option>
<option value="ME">ME</option>
<option value="MD">MD</option>
<option value="MA">MA</option>
<option value="MI">MI</option>
<option value="MN">MN</option>
<option value="MS">MS</option>
<option value="MO">MO</option>
<option value="MT">MT</option>
<option value="NE">NE</option>
<option value="NV">NV</option>
<option value="NH">NH</option>
<option value="NJ">NJ</option>
<option value="NM">NM</option>
<option value="NY">NY</option>
<option value="NC">NC</option>
<option value="ND">ND</option>
<option value="OH">OH</option>
<option value="OK">OK</option>
<option value="OR">OR</option>
<option value="PA">PA</option>
<option value="RI">RI</option>
<option value="SC">SC</option>
<option value="SD">SD</option>
<option value="TN">TN</option>
<option value="TX">TX</option>
<option value="UT">UT</option>
<option value="VT">VT</option>
<option value="VA">VA</option>
<option value="WA">WA</option>
<option value="WV">WV</option>
<option value="WI">WI</option>
<option value="WY">WY</option>
</select>
</div>
<div class="form-group col-md-2">
<label for="inputZip">Zip</label>
<input type="text" class="form-control" id="inputZip" name = "zip" maxlength = 5 pattern = "[0-9]{5}" required>
</div>
</div>

<div class="form-row">
<div class="form-group col-md-4">
<label for="inputPhone">Phone</label>
<input type="tel" class="form-control" id="inputPhone" placeholder = "123-456-7890" name = "phone" maxlength = 12 pattern = "\d{3}-\d{3}-\d{4}$" required>
</div>
<div class="form-group col-md-8">
<label for="inputEmail">Email</label>
<input type="email" class="form-control" id="inputEmail" placeholder = "me@email.com" name = "email" pattern = "[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*" required>
</div>
</div>

<div class="form-row">
<div class="form-group col-md-4">
<label for="inputFax">Fax*</label>
<input type="text" class="form-control" id="inputFax" placeholder = "1-987-6543210" name = "fax" maxlength = 13 pattern = "\d{1}-\d{3}-\d{7}">
</div>
<div class="form-group col-md-8">
<label for="inputBusiness">Business*</label>
<input type="text" class="form-control" id="inputBusiness" name = "business_name">
</div>
</div>

<div class="form-row">
<div class="form-group col-md-4">
<label for="inputProblemCat">Problem Category</label>
<select id="inputState" class="form-control" name = "category" required>
<option selected></option>
<option value="Hardware">Hardware</option>
<option value="Software">Software</option>
<option value="Security">Security</option>
<option value="Network">Network</option>
</select>
</div>

<div class="form-group col-md-3">
<label for="optional" id = "optional">* means optional</label>
</div>
</div>


<div class="form-row">
<div class="form-group">
<label for="inputProblemDes">Problem Description</label>
<textarea class = "form-control" rows = "5" maxlength = 150 id="inputProblemDes" placeholder = "Summarize your issues here..." name = "problem" required></textarea>
</div>
</div>





<input type ="submit" class = "btn btn-primary" name = "dbinsert" value = "Create Account and Submit Problem">
</form>
</div>

<!-----------JAVASCRIPT-------------->
<script>
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<?php 	
// Close connection to databse
pg_close($db_connection);
?>

</body>
</html>
