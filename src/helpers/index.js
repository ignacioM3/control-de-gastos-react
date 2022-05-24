

export const generaId = () =>{
    const random = Math.random().toString(36).substring(1, 36)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatearFecha = fecha =>{
    const nuevaFecha = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}