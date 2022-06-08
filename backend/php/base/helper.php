<?php

function setItem($name, $price, $path) {
    $db = getConnection();

    $query = $db->prepare("INSERT INTO `items` (`id`, `name`, `price`, `image`) VALUES (NULL, :name, :price, :image)");

    $query->execute([
        'name' => $name,
        'price' => $price,
        'image' => $path
    ]);

    $info = $query->errorInfo();

    if ($info[0] === '00000') {
        return true;
    } else {
        return false;
    }
}

function removeItem($id) {
    $db = getConnection();

    $query = $db->prepare("DELETE FROM `items` WHERE `items`.`id` = :id");

    $query->execute([
        'id' => $id
    ]);

    $info = $query->errorInfo();

    if ($info[0] === '00000') {
        return true;
    } else {
        return false;
    }
}

function getItem($id) {
    $db = getConnection();

    $query = $db->prepare("SELECT * FROM `items` WHERE `id` = :id");
    $query->execute([
        'id' => $id
    ]);

    return $query->fetch(PDO::FETCH_ASSOC);
}

function getItems() {
    $db = getConnection();

    $query = $db->prepare("SELECT * FROM `items`");
    $query->execute();

    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function getOrders() {
    $db = getConnection();

    $query = $db->prepare("SELECT * FROM `orders`");
    $query->execute();

    return $query->fetchAll(PDO::FETCH_ASSOC);
}

function setOrder($name, $phone, $email, $items, $total) {
    $db = getConnection();

    $query = $db->prepare("INSERT INTO `orders` (`id`, `name`, `phone`, `email`, `items`, `total`) VALUES (NULL, :name, :phone, :email, :items, :total)");

    $query->execute([
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'items' => json_encode($items),
        'total' => $total
    ]);

    $info = $query->errorInfo();

    if ($info[0] === '00000') {
        return true;
    } else {
        return false;
    }
}

function getUrl() {
    $url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
    $url = explode('?', $url);
    $url = $url[0];
    
    return $url;
}

function getConnection() {
    return new PDO('mysql:dbname=a0672698_soap;host=localhost', 'a0672698_soap', 'BHYjcC24', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
}