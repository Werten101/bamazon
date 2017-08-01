var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Bamazon'
});
var amount;
var userId;
var price;
var sql = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

connection.connect();

connection.query('SELECT * FROM products', function(error, results, fields) {
    if (error) throw error;
    console.log("\nitem_id | product_name | department_name | price | stock_quantity");
    for (var i = 0; i < results.length; i++) {
        console.log(
            results[i].item_id + " | " +
            results[i].product_name + " | " +
            results[i].department_name + " | " +
            results[i].price + " | " +
            results[i].stock_quantity + " | "
        )
    };
});


var runSearch = function(answer) {
    inquirer.prompt({
        name: "productId",
        message: "Enter the ID of the product you would like to purchase."
    }).then(function(answer) {
        var userId = answer.productId;
        connection.query("select * from products where item_id = '" + answer.productId + "'", function(err, res) {
            if (err) throw err;
            amount = res[0].stock_quantity;
            price = res[0].price;
            productSearch();
        })
        var productSearch = function() {
            inquirer.prompt({
                name: "amountOfProduct",
                message: "How many would you like to buy?"
            }).then(function(answer) {
                var customerPurchase = answer.amountOfProduct;
                var amountToUpdate = amount - customerPurchase;
                if (customerPurchase > amount) {
                    console.log("Insufficient quantity!");
                }else{
                    console.log("Your invoice amount will be $" + customerPurchase * price); 
                    connection.query(sql, [amountToUpdate, userId]); 
                        
                }
                connection.end();
            });
        };
    });
};

runSearch();