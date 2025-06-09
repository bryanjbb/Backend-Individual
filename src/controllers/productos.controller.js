import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        p.id_producto,
        p.nombre_producto,
        p.descripcion_producto,
        p.id_categoria,
        c.nombre_categoria AS nombre_categoria,
        p.precio_unitario,
        p.stock,
        p.imagen
      FROM productos p
      JOIN categorias c ON p.id_categoria = c.id_categoria
    `);

    //  enviá los datos 
    res.json(result);

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error.message // mostrar solo el mensaje para claridad
    });
  }
};

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { 
      nombre_producto, 
      descripcion_producto, 
      id_categoria, 
      precio_unitario, 
      stock, 
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [
        nombre_producto,
        descripcion_producto || null, // Puede ser opcional
        id_categoria,
        precio_unitario,
        stock,
        imagen || null // Puede ser opcional
      ]
    );

    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};

// Actualizar un producto por su ID (parcial o completa)
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE productos SET ? WHERE id_producto = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El producto con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el producto.',
      error: error,
    });
  }
};

// Eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error(error);  // Imprime el error en consola
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error.message  // Mensaje del error
    });
  }
  
  };