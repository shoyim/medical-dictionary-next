import Link from 'next/link';

interface LogoProps {
  lang?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

function LogoIcon({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 30, md: 36, lg: 44 };
  const d = dims[size];
  const rx = size === 'lg' ? 11 : size === 'md' ? 9 : 7;

  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="flex-shrink-0 drop-shadow-sm"
    >
      <rect width="36" height="36" rx={rx} fill="#2563eb" />
      {/* Horizontal bar */}
      <rect x="7" y="14.5" width="22" height="7" rx="2.5" fill="white" />
      {/* Vertical bar */}
      <rect x="14.5" y="7" width="7" height="22" rx="2.5" fill="white" />
    </svg>
  );
}

export function Logo({ lang = 'uz', size = 'md', asLink = true }: LogoProps) {
  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  const dotSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const content = (
    <>
      <LogoIcon size={size} />
      <div className="flex flex-col leading-tight">
        <span className={`font-black tracking-tight text-slate-900 dark:text-white uppercase ${textSizes[size]}`}>
          Medical Science
        </span>
        <span className={`font-black tracking-tight text-blue-600 dark:text-blue-400 uppercase ${dotSizes[size]}`}>
          Dictionary
        </span>
      </div>
    </>
  );

  if (!asLink) {
    return (
      <div className="flex items-center gap-2.5">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/${lang}`}
      className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
    >
      {content}
    </Link>
  );
}
