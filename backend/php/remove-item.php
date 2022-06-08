<?php

require_once('base/response.php');
require_once('base/helper.php');

$item_id = key_exists('item_id', $_POST) && $_POST['item_id'] ? $_POST['item_id'] : null;
$errors = [];

if (is_null($item_id) === true) {
    $errors[] = 'The `item_id` parameter is missing';
}

if (count($errors) > 0) {
    response(400, ['errors' => $errors]);
}

if (removeItem($item_id) === true) {
    response(200, ['status' => 'successfully']);
} else {
    response(400, ['errors' => 'Items not removed']);
}