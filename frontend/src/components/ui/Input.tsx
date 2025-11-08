// import { forwardRef, type InputHTMLAttributes } from 'react';
// import { cn } from '../../utils/helpers';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
//   helperText?: string;
// }

// export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
//   { className, label, error, helperText, ...props },
//   ref
// ) {
//   return (
//     <div className="space-y-1">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700">
//           {label}
//         </label>
//       )}

//       <input
//         className={cn(
//           'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
//           error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
//           className
//         )}
//         ref={ref}
//         {...props}
//       />

//       {error ? (
//         <p className="text-sm text-red-600">{error}</p>
//       ) : (
//         helperText && <p className="text-sm text-gray-500">{helperText}</p>
//       )}
//     </div>
//   );
// });

// Input.displayName = 'Input';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, helperText, ...props },
  ref
) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
        </label>
      )}

      <input
        ref={ref}
        {...props}
        aria-invalid={!!error}
        className={cn(
          // base
          'block w-full rounded-lg border px-3 py-2 text-sm',
          // text + bg (readable in both themes)
          'text-gray-900 placeholder:text-gray-500 bg-white',
          'dark:text-gray-100 dark:placeholder:text-gray-400 dark:bg-neutral-800',
          // border + focus
          'border-gray-300 dark:border-neutral-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          // disabled
          'disabled:opacity-60',
          // error state
          error && 'border-red-300 dark:border-red-500 focus:ring-red-500',
          className
        )}
      />

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        helperText && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )
      )}
    </div>
  );
});

Input.displayName = 'Input';