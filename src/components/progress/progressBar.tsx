import './progressBar.css';

import type { ReactElement } from 'react';

type Variations = 'danger' | 'warning' | 'info' | 'success';

export default function ProgressBar({
  name,
  percent,
  variation,
}: {
  name: string;
  percent: number;
  variation: Variations;
}): ReactElement {
  let colorClass: string = '';
  switch (variation) {
    case 'danger':
      colorClass = 'bg-red-200';
      break;
    case 'warning':
      colorClass = 'bg-orange-200';
      break;
    case 'info':
      colorClass = 'bg-blue-200';
      break;
    default:
      colorClass = 'bg-green-200';
  }
  return (
    <div className="mt-3 text-right">
      {name}
      <div className="overflow-hidden rounded-xl bg-white p-1 shadow-sm">
        <div className="relative flex h-3 items-center justify-center">
          <div
            className={`absolute inset-y-0 left-0 rounded-lg ${colorClass}`}
            style={{ width: `${percent}%` }}
          />
          <div className="relative text-sm font-medium text-green-900">
            {percent} %
          </div>
        </div>
      </div>
    </div>
  );
}
