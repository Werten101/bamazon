CREATE DATABASE Bamazon;
USE Bamazon;


CREATE TABLE products(
  item_id integer(11) auto_increment NOT NULL,
    product_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    primary key (item_id)
);

select *
from products