<?php

require_once('base/response.php');
require_once('base/helper.php');

$name = key_exists('name', $_POST) && $_POST['name'] ? $_POST['name'] : null;
$phone = key_exists('phone', $_POST) && $_POST['phone'] ? $_POST['phone'] : null;
$email = key_exists('email', $_POST) && $_POST['email'] ? $_POST['email'] : null;
$items = key_exists('items', $_POST) && $_POST['items'] ? $_POST['items'] : null;
$total = key_exists('total', $_POST) && $_POST['total'] ? $_POST['total'] : null;

$errors = [];

if (is_null($name) === true) {
    $errors[] = 'The `name` parameter is missing';
}

if (is_null($phone) === true) {
    $errors[] = 'The `phone` parameter is missing';
}

if (is_null($email) === true) {
    $errors[] = 'The `email` parameter is missing';
}

if (is_null($items) === true) {
    $errors[] = 'The `items` parameter is missing';
}

if (is_null($total) === true) {
    $errors[] = 'The `total` parameter is missing';
}

if (count($errors) > 0) {
    response(400, ['errors' => $errors]);
    return;
}

if (setOrder($name, $phone, $email, $items, $total) === true) {
    response(200, ['status' => 'successfully']);
} else {
    response(400, ['errors' => 'Items not added']);
}