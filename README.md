- [API de eCommerce](#api-de-ecommerce)
  - [Como obtener el proyecto](#como-obtener-el-proyecto)
  - [Construido con las tecnología:](#construido-con-las-tecnología)
  - [Autenticación](#autenticación)
  - [Usuarios](#usuarios)
    - [Crear usuario](#crear-usuario)
    - [Crear usuario admin](#crear-usuario-admin)
    - [Login de usuario](#login-de-usuario)
    - [Logout de usuario](#logout-de-usuario)
    - [Logout de usuario en todos los dispositivos](#logout-de-usuario-en-todos-los-dispositivos)
    - [Obtener todos los usuario](#obtener-todos-los-usuario)
    - [Obtener usuario por ID](#obtener-usuario-por-id)
    - [Actualizar datos de usuario](#actualizar-datos-de-usuario)
    - [Actualizar password de cuenta de usuario](#actualizar-password-de-cuenta-de-usuario)
    - [Generar un token de recuperación de contraseña](#generar-un-token-de-recuperación-de-contraseña)
    - [Restablecer la contraseña de un usuario usando el token de recuperacion](#restablecer-la-contraseña-de-un-usuario-usando-el-token-de-recuperacion)
    - [Eliminar usuario](#eliminar-usuario)
    - [Subir avatar de usuario](#subir-avatar-de-usuario)
    - [Bloquear a un usuario](#bloquear-a-un-usuario)
    - [Desbloquear a un usuario](#desbloquear-a-un-usuario)
  - [Direcciónes](#direcciónes)
    - [Agregar dirección a un usuario](#agregar-dirección-a-un-usuario)
    - [Establecer dirección por defecto a usuario por ID](#establecer-dirección-por-defecto-a-usuario-por-id)
    - [Obtener todas las direccións](#obtener-todas-las-direccións)
    - [Obtener dirección por ID](#obtener-dirección-por-id)
    - [Actualizar dirección de usuario por ID](#actualizar-dirección-de-usuario-por-id)
    - [Eliminar dirección de usuario por ID](#eliminar-dirección-de-usuario-por-id)
  - [Categorias](#categorias)
    - [Crear categoria](#crear-categoria)
    - [Obtener todas las categoria](#obtener-todas-las-categoria)
    - [Obtener categoria por ID](#obtener-categoria-por-id)
    - [Acrualizar categoria por ID](#acrualizar-categoria-por-id)
    - [Eliminar categoria por ID](#eliminar-categoria-por-id)
  - [Productos](#productos)
    - [Crear producto](#crear-producto)
    - [Actualizar producto por ID](#actualizar-producto-por-id)
    - [Eliminar producto por ID](#eliminar-producto-por-id)
    - [Obtener todos los productos](#obtener-todos-los-productos)
    - [Obtener producto por ID](#obtener-producto-por-id)
    - [Obtener todos los productos por ID de Categoria](#obtener-todos-los-productos-por-id-de-categoria)
    - [Obtener todos los productos por tag 🏷️](#obtener-todos-los-productos-por-tag-️)
    - [Obtener todos los productos por color 🎨](#obtener-todos-los-productos-por-color-)
    - [Obtener todos los productos por brand](#obtener-todos-los-productos-por-brand)
    - [Obtener todos los productos por rango de precios](#obtener-todos-los-productos-por-rango-de-precios)
    - [Obtener todos los productos por palabra clave](#obtener-todos-los-productos-por-palabra-clave)
  - [Calificacion](#calificacion)
    - [Calificar un producto](#calificar-un-producto)
    - [Eliminar calificacion de producto por ID](#eliminar-calificacion-de-producto-por-id)
    - [Actualizar calificar del producto](#actualizar-calificar-del-producto)
    - [Obtener calificacion por ID](#obtener-calificacion-por-id)
    - [Obtener calificaciones por ID de producto](#obtener-calificaciones-por-id-de-producto)
    - [Obtener calificaciones por ID de usuario](#obtener-calificaciones-por-id-de-usuario)
    - [Obtener todas calificaciones](#obtener-todas-calificaciones)
  - [Carrito de compras](#carrito-de-compras)
    - [Agregar productos al carrito por ID de producto y requiere color de producto](#agregar-productos-al-carrito-por-id-de-producto-y-requiere-color-de-producto)
    - [Quitar productos del carrito por ID de producto y requiere color de producto](#quitar-productos-del-carrito-por-id-de-producto-y-requiere-color-de-producto)
    - [Crear carrito](#crear-carrito)
    - [Actualizar carrito por ID](#actualizar-carrito-por-id)
    - [Eliminar carrito por ID](#eliminar-carrito-por-id)
    - [Obtener carrito por ID](#obtener-carrito-por-id)
    - [Obtener carritos](#obtener-carritos)
    - [Obtener productos del carritos](#obtener-productos-del-carritos)
  - [Pedidos](#pedidos)
    - [Crear pedido](#crear-pedido)
    - [Capturar pedido](#capturar-pedido)
    - [Cancelar pedido](#cancelar-pedido)
    - [Actualizar el estado del pedido](#actualizar-el-estado-del-pedido)
    - [Obtener pedidos por usuario](#obtener-pedidos-por-usuario)
    - [Obtener todos los pedidos](#obtener-todos-los-pedidos)

# API de eCommerce
Este proyecto consiste en una API para una tienda electrónica. Permite crear usuarios, autenticarlos y actualizar sus datos. También cuenta con endpoints para agregar, editar y eliminar direcciónes, categorias, productos, manejar el carrito de compras, los pedidos y realizar pagos atravez de Paypal.

## Como obtener el proyecto
1. Clone este repositorio en su maquina local
```
git clone https://github.com/jahazieljbh/eCommerce-API.git
```
2. Ejecute el comando `npm ci` para instalar las dependencias necesarias.
3. Ejecute el comando `npm run serve` para iniciar la aplicación.

## Construido con las tecnología:
<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" /> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/PayPal%20API-blue?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal API" />
    <img src="https://img.shields.io/badge/-MongoDB-%23Clojure?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" /> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github"/> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Visual Studio Code " /> &nbsp;&nbsp;
    <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" /> &nbsp;&nbsp;
</p>

## Autenticación
La autenticación se maneja a través de tokens JWT. Para obtener un token, el usuario debe hacer una petición POST al endpoint api/auth/login con su correo electrónico y contraseña. Si las credenciales son correctas, se generará un token que deberá ser incluido en el header de cada petición posterior con el formato Authorization: Bearer <token value>.

## Usuarios


### Crear usuario

**URL:** `POST /api/v1/user/signup`
<br/>
<br/>
**Example Value:**
```json
{
    "firstname": "Jahaziel",
    "lastname": "Basilio",
    "mobile": "2712318584",
    "email": "jahaziel.example@gmail.com",
    "password": "MyPassword123"
}
```

### Crear usuario admin

**URL:** `POST /api/v1/user/signup`
<br/>
<br/>
**Example Value:**
```json
{
    "firstname": "Jahaziel",
    "lastname": "Basilio",
    "mobile": "2712318584",
    "email": "jahaziel.example@gmail.com",
    "password": "MyPassword123",
    "role": "admin"
}
```

### Login de usuario

**URL:** `POST /api/v1/user/login`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Example Value:**
```json
{
    "email": "jahaziel.example@gmail.com",
    "password": "MyPassword123"
}
```

### Logout de usuario

**URL:** `POST /api/v1/user/logout`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Logout de usuario en todos los dispositivos

**URL:** `POST /api/v1/user/logout-all`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener todos los usuario

**URL:** `GET /api/v1/user/all-users`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener usuario por ID

**URL:** `GET /api/v1/user/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Actualizar datos de usuario

**URL:** `PATCH /api/v1/user/edit-user`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "firstname": "Jahaziel",
    "lastname": "Basilio",
    "mobile": "2711338357",
    "email": "jahaziel.example@gmail.com",
    "password": "MyPassword123456"
}
```

### Actualizar password de cuenta de usuario

**URL:** `PATCH /api/v1/user/password`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "newPassword": "MyPassword1234",
    "currentPassword": "MyPassword123"
}
```

### Generar un token de recuperación de contraseña

**URL:** `POST /api/v1/user/forgot-password-token`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Example Value:**
```json
{
    "email": "jahaziel.example@gmail.com"
}
```

### Restablecer la contraseña de un usuario usando el token de recuperacion

**URL:** `POST /api/v1/user/reset-password/<token>`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Example Value:**
```json
{
    "password": "Example Value123"
}
```

### Eliminar usuario

**URL:** `DELETE /api/v1/user/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Subir avatar de usuario

**URL:** `POST /api/v1/user/me/avatar`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Bloquear a un usuario

**URL:** `PATCH /api/v1/user/block/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Desbloquear a un usuario

**URL:** `PATCH /api/v1/user/unblock/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

## Direcciónes

### Agregar dirección a un usuario 

**URL:** `POST /api/v1/address/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "addressName": "Casa",
    "addressLine1": "Calle",
    "addressLine2": "Opcional",
    "city": "Mexico",
    "state": "Veracruz",
    "country": "Amatlan de los reyes",
    "zipcode": 94950
}
```

### Establecer dirección por defecto a usuario por ID

**URL:** `POST /api/v1/address/default/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener todas las direccións

**URL:** `GET /api/v1/address/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener dirección por ID

**URL:** `GET /api/v1/address/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Actualizar dirección de usuario por ID

**URL:** `PATCH /api/v1/address/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "addressName": "Casa #2",
    "addressLine1": "Calle",
    "addressLine2": "Avenida",
    "city": "Shibuya",
    "state": "Tokyo",
    "country": 15555,
    "zipcode": 150000
}
```

### Eliminar dirección de usuario por ID

**URL:** `DELETE /api/v1/address/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

## Categorias

### Crear categoria

**URL:** `POST /api/v1/category/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Ropa"
}
```

### Obtener todas las categoria

**URL:** `GET /api/v1/category/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

### Obtener categoria por ID

**URL:** `GET /api/v1/category/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

### Acrualizar categoria por ID

**URL:** `PATCH /api/v1/category/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Ropa"
}
```

### Eliminar categoria por ID

**URL:** `DELETE /api/v1/category/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

## Productos 

### Crear producto

**URL:** `POST /api/v1/product/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Zapatillas Adidas",
    "description": "Zapatillas deportivas para correr de Adidas",
    "price": 1299.00,
    "images": ["https://www.example.com/imagen3.jpg", "https://www.example.com/imagen4.jpg"],
    "colors": ["Negro", "Gris"],
    "tags": ["Deportivo", "Correr"],
    "category": "Calzado",
    "brand": "Adidas",
    "stock": 8
}
```

### Actualizar producto por ID

**URL:** `PATCH /api/v1/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Zapatillas Adidas #2",
    "description": "Zapatillas deportivas para correr de Adidas",
    "price": 950.00,
    "images": ["https://www.example.com/imagen3.jpg", "https://www.example.com/imagen4.jpg"],
    "colors": ["Negro"],
    "tags": ["Deportivo"],
    "brand": "Adidas",
    "stock": 10
}
```

### Eliminar producto por ID

**URL:** `DELETE /api/v1/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener todos los productos

**URL:** `GET /api/v1/product/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:  valor ejemplo:
filter      Nike
sort        -category
limit       5
fields      name,price,tags
pages       1
```

### Obtener producto por ID

**URL:** `GET /api/v1/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```


### Obtener todos los productos por ID de Categoria

**URL:** `GET /api/v1/product/category/:category`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:  valor ejemplo:
category    640b8c9db61a110f71507e65
```

### Obtener todos los productos por tag 🏷️

**URL:** `GET /api/v1/product/tag/:tag`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:  valor ejemplo:
tag         Deportivo
```

### Obtener todos los productos por color 🎨

**URL:** `GET /api/v1/product/color/:color`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:  valor ejemplo:
color       Plata
```

### Obtener todos los productos por brand

**URL:** `GET /api/v1/product/brand/:brand`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:  valor ejemplo:
brand       Nike
```

### Obtener todos los productos por rango de precios

**URL:** `GET /api/v1/product/price-range/:minPrice-:maxPrice`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:              valor ejemplo:
minPrice-maxPrice       600-5000
```

### Obtener todos los productos por palabra clave

**URL:** `GET /api/v1/product/keyword/:keyword`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
**Query Parameters:**
```
parametro:   valor ejemplo:
keyword      laptop
```

## Calificacion 

### Calificar un producto

**URL:** `POST /api/v1/rating/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "product": "6407bc830682dc34c647298f",
    "rating": 10, 
    "comment": "Excelente producto, lo recomiendo al 100%"
}
```

### Eliminar calificacion de producto por ID

**URL:** `DELETE /api/v1/rating/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Actualizar calificar del producto

**URL:** `PATCH /api/v1/rating/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "product": "6407bc830682dc34c647298f",
    "rating": 6,
    "comment": "Producto regular, no recomiendo"
}
```

### Obtener calificacion por ID

**URL:** `GET /api/v1/rating/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

### Obtener calificaciones por ID de producto

**URL:** `GET /api/v1/rating/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

### Obtener calificaciones por ID de usuario

**URL:** `GET /api/v1/rating/user/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

### Obtener todas calificaciones

**URL:** `GET /api/v1/rating/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```

## Carrito de compras 

### Agregar productos al carrito por ID de producto y requiere color de producto

**URL:** `POST /api/v1/cart/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "color": "Negro"
}
```

### Quitar productos del carrito por ID de producto y requiere color de producto

**URL:** `DELETE /api/v1/cart/product/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "color": "Negro"
}
```

### Crear carrito
Nota: opcional se crea el carrito automaticamente al agregar producto al carrito

**URL:** `POST /api/v1/cart/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Carrito de Jahaziel"
}
```

### Actualizar carrito por ID

**URL:** `PATCH /api/v1/cart/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Example Value:**
```json
{
    "name": "Carrito para ropa"
}
```

### Eliminar carrito por ID

**URL:** `DELETE /api/v1/cart/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener carrito por ID

**URL:** `GET /api/v1/cart/:id`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener carritos

**URL:** `GET /api/v1/cart/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener productos del carritos

**URL:** `GET /api/v1/cart/products`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

## Pedidos

### Crear pedido
Nota: Apartir del carrito de compras

**URL:** `POST /api/v1/order`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Capturar pedido
Nota: Obtener url apartir del la creacion del pedido y despes de haber accedido al url de approved y dar clic en cancelar - usar cuenta sandbox de paypal

**URL:** `POST /api/v1/order/capture?token=5W616668C45401223&PayerID=VVEU6SCZVU2V8`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Cancelar pedido
Nota: Obtener url apartir del la creacion del pedido y despes de haber accedido al url de approved - usar cuenta sandbox de paypal

**URL:** `POST /api/v1/order/cancel?token=5W616668C45401223`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Actualizar el estado del pedido
Nota: Obtener token a partir de paymentId propiedad de modelo o esquema order

**URL:** `PATCH /api/v1/order/640b8c5bb61a110f71507e5d?token=5W616668C45401223`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
**Query Parameters:**
```
parametro:  valor ejemplo:
token       5W616668C45401223
```

### Obtener pedidos por usuario

**URL:** `GET /api/v1/order/`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```

### Obtener todos los pedidos

**URL:** `GET /api/v1/order/all-orders`
<br/>
<br/>
**Resquest headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token value>
```
