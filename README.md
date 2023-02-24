Ejemplo crear usuaio Post a localhost:3000/api/users

{
"firstname": "John",
"lastname": "Doe",
"email": "johndoe@example.com",
"mobile": "2711338357",
"password": "MyPassword123",
"role": "user",
"avatar": "binary data",
"tokens": [
{
"token": "mytoken123"
}
]
}

Ejemplo login post localhost:3000/api/users/login agregar Http Headers Content-Type y como valor application/json

{
"email": "johndoe@example.com",
"password": "MyPassword123"
}

Para logout hacer post localhost:3000/api/users/logout agregar Http Headers Authorization y como valor Bearer un espacio mas token se necesita estar logeado

Para logoutAll hacer post localhost:3000/api/users/logoutAll agregar Http Headers Authorization y como valor Bearer un espacio mas token se necesita estar logeado

Ejemplo para obtene usuario por id hacer get localhost:3000/api/users/id_del_usuario

Ejemplo para actualizar datos de un usuario se necesita estar logeado patch localhost:3000/api/users/id_del_usuario agregar los campos que quieras actualizar

{
"email": "johndoe@gmail.com",
"password": "MyPassword564"
}

Ejemplo para eliminar usuario primero se necesita estar logeado hacer un delete a localhost:3000/api/users/id_del_usuario

ejemplo para subir el avatar de un usuario primero se necesita estar logeado hacer un post a localhost:3000/api/users/me/avatar 