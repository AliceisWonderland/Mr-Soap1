function getItems() {
    return $.ajax({
        url: `${window.location.origin}/backend/php/get-items.php`,
        method: 'get',
        dataType:"JSON",
        success: function(response) {
            if (typeof response === 'object') {
                return response;
            } else {
                return JSON.parse(response);
            }
        }
    });
}