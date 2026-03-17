USE AdventureWorksLT2022

-- --
SELECT TOP (1000) [ProductID]
      ,[Name]
      ,[ProductNumber]
      ,[Color]
      ,[StandardCost]
      ,[ListPrice]
      ,[Size]
      ,[Weight]
      ,[ProductCategoryID]
      ,[ProductModelID]
      ,[SellStartDate]
      ,[SellEndDate]
      ,[DiscontinuedDate]
      ,[ThumbNailPhoto]
      ,[ThumbnailPhotoFileName]
      ,[rowguid]
      ,[ModifiedDate]
FROM [AdventureWorksLT2022].[SalesLT].[Product]

-- --
SELECT DISTINCT Color as producto_color
FROM SalesLT.Product
WHERE Color IS NOT NULL

-- --
DECLARE @PAGE_NUMBER INT = 1;
DECLARE @ROWS_PER_PAGE INT = 10;

SELECT * FROM SalesLT.ProductCategory
ORDER BY Name DESC
OFFSET (@PAGE_NUMBER - 1)*@ROWS_PER_PAGE ROWS
FETCH NEXT @ROWS_PER_PAGE ROWS ONLY

-- --
SELECT * FROM SalesLT.Customer
WHERE FirstName LIKE '%R%'

SELECT * FROM SalesLT.Customer
WHERE FirstName LIKE 'R%'

-- --
SELECT FirstName, LastName, ModifiedDate
FROM SalesLT.Customer
WHERE ModifiedDate BETWEEN '2006-01-01' AND '2007-01-01'

-- --
SELECT COUNT(*) AS total_costomers
FROM SalesLT.Customer

SELECT *
FROM SalesLT.SalesOrderHeader
  
SELECT COUNT(*)
FROM SalesLT.SalesOrderHeader

SELECT DISTINCT COUNT(*)
FROM SalesLT.SalesOrderHeader
  
SELECT *
FROM SalesLT.SalesOrderHeader
ORDER BY AccountNumber

SELECT SUM(TotalDue)
FROM SalesLT.SalesOrderHeader

-- --
SELECT ProductCategoryID AS category_id, COUNT(ProductCategoryID) AS total
FROM SalesLT.Product
GROUP BY ProductCategoryID
ORDER BY total DESC

-- --
SELECT *
FROM SalesLT.Product p
INNER JOIN SalesLT.ProductCategory pc
	ON p.ProductCategoryID = pc.ProductCategoryID

SELECT
	soh.SalesOrderID sales_order_id,
	c.FirstName customer_first_name
FROM SalesLT.SalesOrderHeader soh
INNER JOIN SalesLT.Customer c
	ON soh.CustomerID = c.CustomerID