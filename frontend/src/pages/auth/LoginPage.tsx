


// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { authService } from '../../services/authService';
// import { useAuth } from '../../contexts/AuthContext';
// import { Input } from '../../components/ui/Input';
// import { Button } from '../../components/ui/Button';
// import toast from 'react-hot-toast';

// const loginSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(1, 'Password is required'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export const LoginPage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/dashboard';

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     try {
//       const { user, token } = await authService.login(data);
//       login(user, token);
//       toast.success('Login successful!');
//       navigate(from, { replace: true });
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
//         <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">Eventify</span>
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
//         <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 text-center">Sign in to your Eventify account</p>

//         <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
//           <Input
//             label="Username"
//             {...register('username')}
//             error={errors.username?.message}
//             placeholder="Enter your username"
//             autoComplete="username"
//             className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
//           />
//           <Input
//             label="Password"
//             type="password"
//             {...register('password')}
//             error={errors.password?.message}
//             placeholder="Enter your password"
//             autoComplete="current-password"
//             className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
//           />
//           <div className="flex items-center justify-between">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
//             >
//               Forgot your password?
//             </Link>
//           </div>
//           <Button
//             type="submit"
//             loading={isLoading}
//             className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
//           >
//             Sign in
//           </Button>
//           <div className="text-center">
//             <span className="text-sm text-gray-600 dark:text-gray-300">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="font-medium text-green-600 dark:text-green-400 hover:underline"
//               >
//                 Register here
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };




import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.login(data);
      login(user, token);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls =
    "block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm " +
    "placeholder-gray-400 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 " +
    "dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-100";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/5 dark:bg-neutral-900">
        {/* Brand */}
        <div className="mb-6 text-center">
          {/* <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-indigo-600 text-white grid place-items-center">
            <span className="font-bold">E</span>
          </div> */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your Eventify account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-200">
              Username
            </label>
            <input
              {...register("username")}
              autoComplete="username"
              placeholder="Enter your username"
              className={inputCls}
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={inputCls}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};