import Link from "next/link";

/** Static sign-in screen. Pure layout: no form logic, state or auth (out of scope). */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FBF4EC] lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left: gradient brand panel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F6A98E] via-[#F2937A] to-[#EC7E62] text-white flex flex-col justify-between gap-7 px-6 py-6 sm:px-10 lg:px-[60px] lg:py-14">
        {/* Decorative circles (scale down on small screens, never overflow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px] scale-75 sm:scale-90 lg:scale-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px] scale-75 sm:scale-90 lg:scale-100"
        />

        <div className="relative flex items-center gap-[13px]">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white/20">
            <SunIcon className="h-[26px] w-[26px]" />
          </div>
          <span className="font-fredoka font-semibold text-[21px] tracking-[0.5px]">
            OpenDayCare
          </span>
        </div>

        <div className="relative hidden lg:block">
          <h1 className="font-fredoka font-semibold text-[28px] leading-[1.12] sm:text-[34px] lg:text-[42px]">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="mt-[18px] max-w-[430px] text-[15px] leading-[1.6] text-white/90 sm:text-[16px] lg:text-[17px]">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>

        <p className="relative text-[13px] text-white/90 lg:text-[14px]">
          🌿 Guardería Sala Soles
        </p>
      </section>

      {/* Right: sign-in form */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-fredoka font-semibold text-[30px] text-[#3F362E]">
            Iniciar sesión
          </h2>
          <p className="mt-[6px] mb-[28px] text-[15px] text-[#94887B]">
            Ingresá para ver el día de hoy.
          </p>

          <label
            htmlFor="login-email"
            className="mb-[8px] block text-[12px] font-bold tracking-[0.7px] text-[#94887B]"
          >
            EMAIL
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-[#3F362E] placeholder-[#B6A99B]"
          />

          <label
            htmlFor="login-password"
            className="mb-[8px] block text-[12px] font-bold tracking-[0.7px] text-[#94887B]"
          >
            CONTRASEÑA
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="mb-[10px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-[#3F362E] placeholder-[#B6A99B]"
          />

          <div className="mb-[20px] text-right">
            <span className="cursor-pointer text-[13.5px] font-bold text-[#C5503A]">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <button
            type="button"
            className="block w-full rounded-[15px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]"
          >
            Iniciar sesión
          </button>

          <p className="mt-[24px] text-center text-[14.5px] text-[#94887B]">
            ¿Te invitó la guardería?{" "}
            <Link
              href="/activate-account"
              className="font-extrabold text-[#C5503A]"
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}