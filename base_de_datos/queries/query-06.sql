USE AdventureWorksLT2022;
-- Utilizar variables
-- Utilizar alias
-- Utilizar solo las variables necesarias

-- Todos los Clientes
SELECT COUNT(CustomerID) AS total_clientes
FROM SalesLT.Customer;

-- Todas las Ventas de un mes
DECLARE @FechaInicio DATETIME2 = '2008-06-01';
DECLARE @FechaFin DATETIME2 = '2008-06-30';

SELECT COUNT(*) AS total_ventas_mes
FROM SalesLT.SalesOrderHeader
WHERE OrderDate BETWEEN @FechaInicio AND @FechaFin

-- Ordenar las Categorías por nombre
SELECT DISTINCT Name 
FROM SalesLT.ProductCategory
ORDER BY Name ASC;

-- Relacionar Cabecera y Detalle de una Factura
SELECT
	soh.SalesOrderID AS Cabecera,
	sod.SalesOrderID As Detalles
FROM SalesLT.SalesOrderHeader soh
INNER JOIN SalesLT.SalesOrderDetail sod
	ON soh.SalesOrderID = sod.SalesOrderID

-- Implementación de Paginación
DECLARE @PaginaActual INT = 1;
DECLARE @ItemsPorPagina INT = 3;

SELECT SalesOrderID, PurchaseOrderNumber FROM SalesLT.SalesOrderHeader
ORDER BY SalesOrderID
OFFSET (@PaginaActual - 1)*@ItemsPorPagina ROWS
FETCH NEXT @ItemsPorPagina ROWS ONLY


-- Uso de DISTINCT
SELECT DISTINCT SalesOrderID
FROM SalesLT.SalesOrderDetail;

-- Uso de TOP
SELECT TOP 10 ProductID, Name
FROM SalesLT.Product;