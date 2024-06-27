export const formatDate = (date) => {
    const fechaCompleta = new Date(date);
    const year = fechaCompleta.getFullYear();
    const month = fechaCompleta.getMonth() + 1;
    const day = fechaCompleta.getDate();

    const fullDate = `${day}/${month}/${year}`
    return fullDate;
}