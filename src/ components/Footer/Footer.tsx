export function Footer() {
  return (
    <footer className="site-footer">
      {" "}
      <p>
        {" "}
        © {new Date().getFullYear()} Vozes das Ruas. Todos os direitos
        reservados. <a href="/admin">Área do Administrador</a>
      </p>{" "}
    </footer>
  );
}
