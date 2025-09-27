export default async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        const productosFormateados = data.map((prod) => ({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            descripction: prod.description,
            category: prod.category,
            image: prod.image
        }));
        return productosFormateados// actualiza el estado con los productos formateados
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}