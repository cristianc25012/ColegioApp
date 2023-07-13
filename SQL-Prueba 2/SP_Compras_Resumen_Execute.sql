DECLARE @xml_usuarios XML, @xml_compras XML, @xml_itemsIva 
XML SET @xml_usuarios = 
' <Data> 
<Usuario><Id>14</Id><Nombre>Juan</Nombre></Usuario>
<Usuario><Id>17</Id><Nombre>Maria</Nombre></Usuario>
<Usuario><Id>25</Id><Nombre>Carlos</Nombre></Usuario> 
<Usuario><Id>15</Id><Nombre>Fernanda</Nombre></Usuario> 
</Data>'
SET @xml_compras =
' <Data> 
<Item><Usuario>14</Usuario><Producto>78</Producto><Valor>300</Valor></Item> 
<Item><Usuario>17</Usuario><Producto>23</Producto><Valor>568</Valor></Item> 
<Item><Usuario>17</Usuario><Producto>99</Producto><Valor>350</Valor></Item> 
<Item><Usuario>14</Usuario><Producto>99</Producto><Valor>107</Valor></Item>
<Item><Usuario>25</Usuario><Producto>23</Producto><Valor>425</Valor></Item>
</Data>' 
SET @xml_itemsIva =
' <Data> 
<Producto><IdProducto>23</IdProducto><Porcentaje>0.16</Porcentaje></Producto> 
<Producto><IdProducto>99</IdProducto><Porcentaje>0.19</Porcentaje></Producto> 
</Data>'

EXECUTE SP_Compras_Resumen @xml_usuarios, @xml_compras, @xml_itemsIva