<?php
$app->config('debug', true);
$db = new mysqli('localhost', 'root', 'password', 'lordima');
$app->view->setData('title', 'Lordima');
?>
