export const formatDate = (date) => {
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    
    return formatter.format(date).replace(/^\w/, (c) => c.toUpperCase());
};