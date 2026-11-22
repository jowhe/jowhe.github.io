const Footer = () => {
  return (
    // Extra bottom padding below md keeps the text clear of the floating settings button.
    <footer className="flex flex-col items-center gap-1 px-4 pt-4 pb-20 text-center text-xs text-foreground/70 md:pb-8">
      <p>This page stores no cookies or analytics.</p>
      <p>Copyright &copy; 2026 Joe Howe</p>
    </footer>
  )
}

export default Footer
