import React from 'react';

export default function Button({
  page,
  isActive,
}: {
  page: number;
  isActive: boolean;
}) {
  const activeClass =
    'bg-gray-900 text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none';
  const passiveClass =
    'text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20';
  const buttonClass = `relative size-10 max-h-[40px] max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${isActive ? activeClass : passiveClass}`;
  return (
    <button className={buttonClass} type="button">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {page}
      </span>
    </button>
  );
}
