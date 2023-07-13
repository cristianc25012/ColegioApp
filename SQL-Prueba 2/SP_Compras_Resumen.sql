ALTER PROCEDURE SP_Compras_Resumen
@user XML,
@purchases XML,
@itemsIva XML 
AS 
BEGIN
	SET NOCOUNT ON;
	
	CREATE TABLE #USERS (
	ID INT,
	UserName VARCHAR (20))

	CREATE TABLE #PURCHASES (
	UserID INT,
	ProductID VARCHAR (20),
	ProductValue FLOAT)

	CREATE TABLE #IVA (
	IVAProductID INT,
	PercentageIVA FLOAT)
	
	INSERT INTO #USERS (ID, UserName)
	SELECT  
		   Tbl.Col.value('Id[1]', 'smallint'),  
		   Tbl.Col.value('Nombre[1]', 'varchar(25)') 
	FROM   @user.nodes('//Data/Usuario') Tbl(Col)  

	INSERT INTO #PURCHASES (UserID, ProductID, ProductValue)
	SELECT  
		   Tbl.Col.value('Usuario[1]', 'smallint'),  
		   Tbl.Col.value('Producto[1]', 'smallint'), 
		   Tbl.Col.value('Valor[1]', 'Float') 
	FROM   @purchases.nodes('//Data/Item') Tbl(Col)  

	INSERT INTO #IVA (IVAProductID, PercentageIVA)
	SELECT  
		   Tbl.Col.value('IdProducto[1]', 'smallint'),  
		   Tbl.Col.value('Porcentaje[1]', 'Float') 
	FROM   @itemsIva.nodes('//Data/Producto') Tbl(Col) 

	--SELECT *, (PercentageIVA * ProductValue) AS IVAValue  FROM #USERS 
	
	SELECT U.ID, U.UserName, ISNULL(SUM (P.ProductValue),0)  AS ValorTotal, 
	ISNULL(SUM (I.PercentageIVA * P.ProductValue),0) AS IVAValue
	FROM #USERS AS U 
	LEFT JOIN #PURCHASES AS P ON U.ID= P.UserID 
	LEFT JOIN #IVA AS I ON P.ProductID=I.IVAProductID 
	GROUP BY U.ID, U.UserName ORDER BY U.ID

	DROP TABLE #USERS
	DROP TABLE #PURCHASES
	DROP TABLE #IVA

END

