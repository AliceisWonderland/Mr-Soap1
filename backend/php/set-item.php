<?php

require_once('base/response.php');
require_once('base/helper.php');

$name = key_exists('name', $_POST) && $_POST['name'] ? $_POST['name'] : null;
$price = key_exists('price', $_POST) && $_POST['price'] ? $_POST['price'] : null;
$file = key_exists('file', $_FILES) && $_FILES['file'] ? $_FILES['file'] : null;

$errors = [];

if (is_null($name) === true) {
    $errors[] = 'The `name` parameter is missing';
}

if (is_null($price) === true) {
    $errors[] = 'The `price` parameter is missing';
}

if (is_null($file) === true) {
    $errors[] = 'The `file` parameter is missing';
} else {
    if (!file_exists($_FILES['file']['tmp_name']) || !is_uploaded_file($_FILES['file']['tmp_name']))  {
        $errors[] = 'The file was not uploaded';
    }
}

$fileName = $_FILES['file']['name'];
$fileSize = $_FILES['file']['size'];
$fileTmpName = $_FILES['file']['tmp_name'];
$fileType = $_FILES['file']['type'];
$fileExtension = explode('.', $fileName);
$fileExtension = strtolower(end($fileExtension));
$fileExtensionsAllowed = ['jpeg','jpg','png', 'webp'];

if (in_array($fileExtension, $fileExtensionsAllowed) === false) {
    $errors[] = "This file extension is not allowed. Please upload a JPEG, JPG, PNG or WEBP file";
}

if (count($errors) > 0) {
    response(400, ['errors' => $errors]);
}

$currentDirectory = substr_replace(getcwd(), "", -4);
$uploadDirectory = "/files/";
$uploadPath = $currentDirectory . $uploadDirectory . basename($fileName);
$didUpload = move_uploaded_file($fileTmpName, $uploadPath);
$path = getUrl() . '/backend/files/' . basename($fileName);

if (setItem($name, $price, $path) === true) {
    response(200, ['status' => 'successfully']);
} else {
    response(400, ['errors' => 'Items not added']);
}




