import Link from "next/link";

/** Static account-activation screen. Pure layout: no form logic or state (out of scope). */
export default function ActivateAccountPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF4EC] px-4 py-10 sm:px-6 lg:px-10">
      <div className="w-full max-w-[440px]">
        {/* Top icon: centered on mobile, left-aligned on desktop */}
        <div className="mx-auto mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)] lg:mx-0">
          <SunIcon className="h-[30px] w-[30px]" />
        </div>

        <h1 className="font-fredoka font-semibold text-[32px] leading-[1.15] text-[#3F362E]">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-[#94887B]">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar
          la cuenta.
        </p>

        {/* Invitation pill */}
        <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px]">
          <div className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-full bg-[#A9D9E8] font-fredoka text-[19px] font-semibold text-[#1F7A93]">
            M
          </div>
          <div>
            <div className="text-[13px] text-[#94887B]">Te invitaron a seguir a</div>
            <div className="font-fredoka text-[17px] font-semibold text-[#3F362E]">
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        <label
          htmlFor="invite-code"
          className="mb-[8px] block text-[12px] font-bold tracking-[0.7px] text-[#94887B]"
        >
          CÓDIGO DE INVITACIÓN
        </label>
        <input
          id="invite-code"
          name="code"
          readOnly
          defaultValue="7K4P9"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] font-fredoka text-[18px] font-bold tracking-[3px] text-[#3F362E]"
        />

        <label
          htmlFor="invite-email"
          className="mb-[8px] block text-[12px] font-bold tracking-[0.7px] text-[#94887B]"
        >
          EMAIL
        </label>
        <input
          id="invite-email"
          name="email"
          type="email"
          readOnly
          defaultValue="lucia.fernandez@gmail.com"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-[#3F362E]"
        />

        <label
          htmlFor="invite-password"
          className="mb-[8px] block text-[12px] font-bold tracking-[0.7px] text-[#94887B]"
        >
          CREAR CONTRASEÑA
        </label>
        <input
          id="invite-password"
          name="password"
          type="password"
          readOnly
          defaultValue="contraseña"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#F2A78E] bg-white px-4 py-[14px] text-[15px] text-[#3F362E]"
        />

        {/* Authorization pill */}
        <label className="mb-[24px] flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#FBF1D6] px-4 py-[14px]">
          <span className="mt-[1px] flex h-6 w-6 flex-none items-center justify-center rounded-[8px] bg-[#5FB97E]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[14px] leading-[1.45] text-[#8A7234]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de
            la app.
          </span>
        </label>

        <button
          type="button"
          className="block w-full rounded-[15px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)]"
        >
          Activar mi cuenta
        </button>

        <p className="mt-[22px] text-center text-[14.5px] text-[#94887B]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-extrabold text-[#C5503A]">
            Iniciar sesión
          </Link>
        </p>
      </div>
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