import { Router } from 'express';
import {  obtenerProductos, registrarProducto, actualizarProducto, eliminarProducto} from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID

router.post('/registrarproducto', registrarProducto);
// Ruta pra actualizar un producto por su ID
router.patch('/actualizarproducto/:id', actualizarProducto);
// Ruta para eliminar un producto por su ID
router.delete('/eliminarproducto/:id', eliminarProducto);

export default router;