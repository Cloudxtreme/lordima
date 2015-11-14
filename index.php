<?php
session_start();
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
include("config.php");
$_SESSION['userID'] = 1;

$app->get('/', function () use ($app) {
  $app->render('farm.php');
});

//json outputs
$app->get('/get/farm/:id', function ($farmID) use ($app) {
  global $db;
  $userID = $_SESSION['userID'];
  $result = $db->query("SELECT * FROM farm WHERE userID=$userID AND farmID=$farmID");
  $output = array();
  while ($row = $result->fetch_assoc()) {
      $output[] = $row;
  }
  $app->response->headers->set('Content-Type', 'application/json');
  print_r(json_encode($output));
});

$app->get('/populate_farm', function () use ($app) {
  global $db;
  for($i=1;$i<=100;$i++){
    $db->query("INSERT INTO `farm` (`userID`, `farmID`, `cellID`, `cellType`) VALUES ('1', '1', '$i', 1);");
  }
});

$app->run();
