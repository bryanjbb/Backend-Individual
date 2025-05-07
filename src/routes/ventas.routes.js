import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta, registrarVenta, actualizarVenta} from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todos los datos de Ventas
router.get('/ventas', obtenerVentasConDetalles);
router.get('/obtenerventas', obtenerVentas);
router.delete('/eliminarventa/:id_venta', eliminarVenta);
router.post('/registrarventa', registrarVenta)
router.patch('/actualizarventa/:id_venta', actualizarVenta);
export default router;