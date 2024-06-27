export const checkUserRol = (rol) => {

    switch (rol) {
        case 1:
            return "Admistrador"
            break;
        case 2:
            return "Repartidor"
            break;
        case 3:
            return "Estudiante"
            break;
    
        default:
            return "Rol no disponible"
            break;
    }

}