export default function FormLayout({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-6">{children}</div>
      <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1588771930293-0f5b1f948224?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center" />
    </div>
  );
}
