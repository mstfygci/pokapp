import './progress-bar.css';

import type { ReactElement } from 'react';

type Variations = 'danger' | 'warning' | 'info' | 'success';

export default function ProgressBar({
  name,
  value,
  max = 100,
  variation,
}: {
  name: string;
  value: number;
  max?: number;
  variation: Variations;
}): ReactElement {
  const percentage = Math.round((value / max) * 100);

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
            style={{ width: `${percentage}%` }}
          />
          <div className="relative text-sm font-medium text-green-900">
            {value} / {max}
          </div>
        </div>
      </div>
    </div>
  );
}
