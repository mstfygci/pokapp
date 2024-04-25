'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
import Button from './button';

export default function Pagination({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const prevPage = () => {
    const params = new URLSearchParams({});
    params.set('page', `${page - 1}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextPage = () => {
    const params = new URLSearchParams({});
    params.set('page', `${page + 1}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <button
        disabled={page <= 1}
        className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => prevPage()}
      >
        <Image className="size-4" src={leftArrow} alt="Left Arrow" />
        Previous
      </button>
      <div className="flex items-center gap-2">
        {page - 2 > 0 && <Button page={page - 2} isActive={false} />}
        {page - 1 > 0 && <Button page={page - 1} isActive={false} />}
        <Button page={page} isActive />
        {page < pageCount && <Button page={page + 1} isActive={false} />}
        {page + 1 < pageCount && <Button page={page + 2} isActive={false} />}
      </div>
      <button
        disabled={page === pageCount}
        className="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => nextPage()}
      >
        Next
        <Image className="size-4" src={rightArrow} alt="Right Arrow" />
      </button>
    </>
  );
}
