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
La autenticación se maneja a través de tokens JWT. Para obtener un token, el usuario debe hacer una petición POST al endpoint api/auth/login con su correo electrónico y contraseña. Si las credenciales son correctas, se generará un token que deberá ser incluido en el header de cada petición posterior con el formato Authorization: Bearer <token>.

## Usuarios

### Crear usuario

**URL:** `POST /api/v1/user/signup`
<br/>
<br/>
**Payload:**
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
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Logout de usuario en todos los dispositivos

**URL:** `POST /api/v1/user/logout-all`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener todos los usuario

**URL:** `GET /api/v1/user/all-users`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener usuario por ID

**URL:** `GET /api/v1/user/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Actualizar datos de usuario

**URL:** `PATCH /api/v1/user/edit-user`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
**Payload:**
```json
{
    "email": "jahaziel.example@gmail.com"
}
```

### Restablecer la contraseña de un usuario usando el token de recuperacion

**URL:** `POST /api/v1/user/reset-password/<token>`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
**Payload:**
```json
{
    "password": "Example123"
}
```

### Eliminar usuario

**URL:** `DELETE /api/v1/user/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Subir avatar de usuario

**URL:** `POST /api/v1/user/me/avatar`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Bloquear a un usuario

**URL:** `PATCH /api/v1/user/block/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Desbloquear a un usuario

**URL:** `PATCH /api/v1/user/unblock/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

## Direcciónes

### Agregar dirección a un usuario 

**URL:** `POST /api/v1/address/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener todas las direccións

**URL:** `GET /api/v1/address/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener dirección por ID

**URL:** `GET /api/v1/address/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Actualizar dirección de usuario por ID

**URL:** `PATCH /api/v1/address/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

## Categorias

### Crear categoria

**URL:** `POST /api/v1/category/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
```json
{
    "name": "Ropa"
}
```

### Obtener todas las categoria

**URL:** `GET /api/v1/category/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```

### Obtener categoria por ID

**URL:** `GET /api/v1/category/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```

### Acrualizar categoria por ID

**URL:** `PATCH /api/v1/category/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
```json
{
    "name": "Ropa"
}
```

### Eliminar categoria por ID

**URL:** `DELETE /api/v1/category/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

## Productos 

### Crear producto

**URL:** `POST /api/v1/product/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
    "stock": 8,
}
```

### Actualizar producto por ID

**URL:** `PATCH /api/v1/product/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener todos los productos

**URL:** `GET /api/v1/product/`
<br/>
<br/>
**Headers:**
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
**Headers:**
```
Content-Type: application/json
```


### Obtener todos los productos por ID de Categoria

**URL:** `GET /api/v1/product/category/:category`
<br/>
<br/>
**Headers:**
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
**Headers:**
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
**Headers:**
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
**Headers:**
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
**Headers:**
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
**Headers:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Actualizar calificar del producto

**URL:** `PATCH /api/v1/rating/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```

### Obtener calificaciones por ID de producto

**URL:** `GET /api/v1/rating/product/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```

### Obtener calificaciones por ID de usuario

**URL:** `GET /api/v1/rating/user/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```

### Obtener todas calificaciones

**URL:** `GET /api/v1/rating/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```

## Carrito de compras 

### Agregar productos al carrito por ID de producto y requiere color de producto

**URL:** `POST /api/v1/cart/product/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
```json
{
    "color": "Negro"
}
```

### Quitar productos del carrito por ID de producto y requiere color de producto

**URL:** `DELETE /api/v1/cart/product/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
```json
{
    "name": "Carrito de Jahaziel"
}
```

### Actualizar carrito por ID

**URL:** `PATCH /api/v1/cart/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
**Payload:**
```json
{
    "name": "Carrito para ropa"
}
```

### Eliminar carrito por ID

**URL:** `DELETE /api/v1/cart/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener carrito por ID

**URL:** `GET /api/v1/cart/:id`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener carritos

**URL:** `GET /api/v1/cart/`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener productos del carritos

**URL:** `GET /api/v1/cart/products`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

## Pedidos

### Crear pedido
Nota: Apartir del carrito de compras

**URL:** `POST /api/v1/order`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Capturar pedido
Nota: Obtener url apartir del la creacion del pedido y despes de haber accedido al url de approved y dar clic en cancelar - usar cuenta sandbox de paypal

**URL:** `POST /api/v1/order/capture?token=5W616668C45401223&PayerID=VVEU6SCZVU2V8`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Cancelar pedido
Nota: Obtener url apartir del la creacion del pedido y despes de haber accedido al url de approved - usar cuenta sandbox de paypal

**URL:** `POST /api/v1/order/cancel?token=5W616668C45401223`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Actualizar el estado del pedido
Nota: Obtener token a partir de paymentId propiedad de modelo o esquema order

**URL:** `PATCH /api/v1/order/640b8c5bb61a110f71507e5d?token=5W616668C45401223`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
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
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```

### Obtener todos los pedidos

**URL:** `GET /api/v1/order/all-orders`
<br/>
<br/>
**Headers:**
```
Content-Type: application/json
```
```
Authorization: Bearer <token>
```
