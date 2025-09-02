export default function Contacto() {
    return (
        <div>
            <h2>Contacto</h2>
            <form className="contact-form">
                <label>
                    Nombre:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Mensaje:
                    <textarea name="message" required></textarea>
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}