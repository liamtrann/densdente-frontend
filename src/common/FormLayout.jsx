// src/frontend/common/FormLayout.jsx
const DEFAULT_IMG = `${process.env.PUBLIC_URL || ""}/img/login-side.png`;

export default function FormLayout({
  children,
  sideImage = DEFAULT_IMG, // you can override from pages if you want
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* Left: form */}
      <div className="flex items-center justify-center p-6">{children}</div>

      {/* Right: decorative image */}
      <div className="hidden md:block relative overflow-hidden rounded-bl-[140px]">
        <img
          src={sideImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  );
}
