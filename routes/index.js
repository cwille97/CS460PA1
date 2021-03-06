const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// database connection
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});


//Routing below:

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/query', function(req, res, next) {
  res.render('query');
});

router.get('/businesses/insert', function(req, res, next) {
  res.render('businsert');
});

router.get('/businesses/update', function(req, res, next) {
  res.render('busupdate');
});

router.get('/businesses/delete', function(req, res, next) {
  res.render('busdelete');
});

router.get('/users/insert', function(req, res, next) {
  res.render('usinsert');
});

router.get('/users/update', function(req, res, next) {
  res.render('usupdate');
});

router.get('/users/delete', function(req, res, next) {
  res.render('usdelete');
});

router.get('/reviews/insert', function(req, res, next) {
  res.render('revinsert');
});

router.get('/reviews/update', function(req, res, next) {
  res.render('revupdate');
});

router.get('/reviews/delete', function(req, res, next) {
  res.render('revdelete');
});

router.get('/checkin/insert', function(req, res, next) {
  res.render('chinsert');
});

router.get('/checkin/delete', function(req, res, next) {
  res.render('chdelete');
});

router.get('/preselected', function(req, res, next) {
  res.render('preselected');
});

router.route('/businsert').post(function (req, res, next) {
  console.log("Inserted a business");
  const name = req.body.name;
  const id = req.body.id;
  const stars = req.body.stars;
  const status = req.body.status;
  console.log(name + id + stars + status);
  const sql = "INSERT INTO CS460.Businesses VALUES ('" + id + "',' " + status + "',' " + name + "',' " + stars + "');";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(fields));
  });
  res.render('businsert', {response: "executed the following query: " + sql});
  // res.redirect('/'); // go home
});

router.route('/busupdate').post(function (req, res, next) {
  let updateCounter = 0; // a counter to keep track of how many commas we need in the query (and where to add them)
  const id = req.body.id;
  const name = req.body.name;
  const stars = req.body.stars;
  const status = req.body.status;
  let sql = "UPDATE CS460.Businesses SET "
  if (id == "") {
    // some alert to tell the user the ID is required
  }
  if (name != "") { // if a parameter is not empty, the user wants to update it
    updateCounter++;
  }
  if (stars != "") {
    updateCounter++;
  }
  if (status != "") {
    updateCounter++;
  }
  if (name != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "business_name='" + name + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "business_name='" + name + "', ";
      updateCounter--;
    }
  }
  if (stars != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "stars='" + stars + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "stars='" + stars + "', ";
      updateCounter--;
    }
  }
  if (status != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "active='" + status + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "active='" + status + "', ";
      updateCounter--;
    }
  }
  sql += "WHERE business_id='" + id +"';"
  // console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Updated the business with id " + id);
  });
  res.render('busupdate', {response: "executed the following query: " + sql});
});


router.route('/busdelete').post(function (req, res, next) {
  const id = req.body.id;
  const sql = "DELETE FROM CS460.Businesses WHERE business_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Deleted the business with id " + id);
  });
  res.render('busdelete', {response: "executed the following query: " + sql});
});

router.route('/query').post(function (req, res, next) { // arbitrary sql query
  console.log("custom SQL query");
  con.query(req.body.cusquery, function (err, result, fields) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.render('query', {results: JSON.stringify(result)});
  });
});

router.route('/usinsert').post(function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const count = req.body.revCount;
  let sql = "INSERT INTO CS460.users VALUES ('" + id + "', '" + name + "', '" + count + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
  });
  res.render('usinsert', {response: "executed the following query: " + sql});
});

router.route('/usupdate').post(function (req, res, next) {
  let updateCounter = 0;
  const id = req.body.id;
  const name = req.body.name;
  const count = req.body.revCount;
  let sql = "UPDATE CS460.users SET ";

  if (id == "") {
    // some alert to tell the user the ID is required
  }
  if (name != "") { // if a parameter is not empty, the user wants to update it
    updateCounter++;
  }
  if (count != "") {
    updateCounter++;
  }
  if (name != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "name='" + name + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "name='" + name + "', ";
      updateCounter--;
    }
  }
  if (count != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "review_count='" + count + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "review_count='" + count + "', ";
      updateCounter--;
    }
  }
  sql += "WHERE user_id='" + id +"';"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Updated the user with id " + id);
  });
  res.render('usupdate', {response: "executed the following query: " + sql});

});

router.route('/usdelete').post(function (req, res, next) {
  const id = req.body.id;
  const sql = "DELETE FROM CS460.users WHERE user_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Deleted the user with id " + id);
  });
  res.render('usdelete', {response: "executed the following query: " + sql});
});

router.route('/revinsert').post(function (req, res, next) {
  const id = req.body.id;
  const stars = req.body.stars;
  const text = req.body.text;
  let sql = "INSERT INTO CS460.reviews VALUES ('" + id + "', '" + stars + "', '" + text + "');";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
  });
  res.render('revinsert', {response: "executed the following query: " + sql});
});

router.route('/revupdate').post(function (req, res, next) {
  let updateCounter = 0;
  const id = req.body.id;
  const stars = req.body.stars;
  const text = req.body.text;
  let sql = "UPDATE CS460.reviews SET ";

  if (id == "") {
    // some alert to tell the user the ID is required
  }
  if (stars != "") { // if a parameter is not empty, the user wants to update it
    updateCounter++;
  }
  if (text != "") {
    updateCounter++;
  }
  if (stars != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "stars='" + stars + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "stars='" + stars + "', ";
      updateCounter--;
    }
  }
  if (text != "") {
    if (updateCounter == 1) { // if this is the only one that needs to be updated there's no need to add a comma after
      sql+= "review_text='" + text + "' ";
      updateCounter--;
    }
    else { // other values need to be added to the sql query so add a comma
      sql+= "review_text='" + text + "', ";
      updateCounter--;
    }
  }
  sql += "WHERE review_id='" + id +"';"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Updated the review with id " + id);
  });
  res.render('revupdate', {response: "executed the following query: " + sql});
});

router.route('/revdelete').post(function (req, res, next) {
  const id = req.body.id;
  const sql = "DELETE FROM CS460.reviews WHERE review_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Deleted the review with id " + id);
  });
  res.render('revdelete', {response: "executed the following query: " + sql});
});

router.route('/chinsert').post(function (req, res, next) {
  const id = req.body.id;
  const sunday = req.body.sunday;
  const monday = req.body.monday;
  const tuesday = req.body.tuesday;
  const wednesday = req.body.wednesday;
  const thursday = req.body.thursday;
  const friday = req.body.friday;
  const saturday = req.body.saturday;

  // uncomment once checkins are set up in the database
  let sql = "INSERT INTO CS460.checkins VALUES ('" + id + "', '" + sunday + "', '" + monday + "', '" +  tuesday + "', '" + wednesday + "', '" + thursday + "', '" + friday + "', '" + saturday + "');";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
  });
  res.render('chinsert', {response: "executed the following query: " + sql});
});

router.route('/chdelete').post(function (req, res, next) {
  const id = req.body.id;
  const sql = "DELETE FROM CS460.checkins WHERE business_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Deleted the checkin with id " + id);
  });
  res.render('chdelete', {response: "executed the following query: " + sql});
});

router.get('/query1', function(req, res, next) {
  sql = "SELECT * FROM CS460.Users WHERE review_count >= 1;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query2', function(req, res, next) {
  sql = "SELECT name FROM CS460.Users WHERE review_count <= 2;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query3', function(req, res, next) {
  sql = "SELECT * FROM CS460.Businesses WHERE active = 'false';";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query4', function(req, res, next) {
  sql = "SELECT B.business_name FROM CS460.Businesses B WHERE stars > 4 AND B.business_name LIKE '%Pizza%';";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query5', function(req, res, next) {
  sql = "SELECT COUNT(*) FROM CS460.Businesses B, CS460.Checkins C WHERE B.business_id = C.business_id AND C.friday > 0;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query6', function(req, res, next) {
  sql = "SELECT R.review_text FROM CS460.reviews R, CS460.Businesses B WHERE B.business_id = R.business_id AND B.business_name = 'Arcadia Tavern';";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query7', function(req, res, next) {
  sql = "SELECT B.business_name FROM CS460.Businesses B, CS460.Reviews R WHERE (R.stars = 1 OR R.stars = 2) AND R.business_id = B.business_id;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query8', function(req, res, next) {
  sql = "SELECT SUM(B.review_count), AVG(B.stars) FROM CS460.Businesses B WHERE B.business_name LIKE 'KFC';";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});

router.get('/query9', function(req, res, next) {
  sql = "SELECT B.business_id FROM CS460.Businesses B ORDER BY review_count DESC LIMIT 10;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});



router.get('/query10', function(req, res, next) {
  sql = "SELECT U.name FROM CS460.Users U ORDER BY review_count DESC LIMIT 1;";
  let ret = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("The following query has gone through: " + sql);
    ret = JSON.stringify(result);
    res.render('preselectedresponse', {val: ret});
  });
});


module.exports = router;
