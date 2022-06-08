<?php

header('Content-Type: application/json; charset=utf-8');

function response($statusCode, $data) {
    http_response_code($statusCode);

    echo json_encode($data);

    return;
}