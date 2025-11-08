// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { authService } from '../../services/authService';
// import { Input } from '../../components/ui/Input';
// import { Select } from '../../components/ui/Select';
// import { Button } from '../../components/ui/Button';
// import { DEPARTMENTS, ORGANIZATIONS, GENDER_CHOICES } from '../../utils/constants';
// import toast from 'react-hot-toast';

// const registerSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   password1: z.string().min(8, 'Password confirmation is required'),
//   phone_number: z.string().min(1, 'Phone number is required'),
//   department: z.string().optional(),
//   organization: z.string().optional(),
//   gender: z.string().optional(),
//   student_id: z.string().optional(),
// }).refine((data) => data.password === data.password1, {
//   message: "Passwords don't match",
//   path: ["password1"],
// });

// type RegisterFormData = z.infer<typeof registerSchema>;

// export const RegisterPage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [profilePicture, setProfilePicture] = useState<File | null>(null);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     setIsLoading(true);
//     try {
//       await authService.register({
//         ...data,
//         profile_picture: profilePicture || undefined,
//       });
//       toast.success('Registration successful! Please login.');
//       navigate('/login');
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 
//                           Object.values(error.response?.data || {}).flat().join(', ') ||
//                           'Registration failed';
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full space-y-8">
//         <div className="text-center">
//           <div className="mx-auto w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
//             <span className="text-white font-bold text-2xl">E</span>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Join Eventify to discover and participate in events
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               label="Username"
//               {...register('username')}
//               error={errors.username?.message}
//               placeholder="Choose a username"
//             />

//             <Input
//               label="Email"
//               type="email"
//               {...register('email')}
//               error={errors.email?.message}
//               placeholder="your.email@example.com"
//             />

//             <Input
//               label="Password"
//               type="password"
//               {...register('password')}
//               error={errors.password?.message}
//               placeholder="Create a strong password"
//             />

//             <Input
//               label="Confirm Password"
//               type="password"
//               {...register('password1')}
//               error={errors.password1?.message}
//               placeholder="Confirm your password"
//             />

//             <Input
//               label="Phone Number"
//               {...register('phone_number')}
//               error={errors.phone_number?.message}
//               placeholder="Your phone number"
//             />

//             <Input
//               label="Student ID (Optional)"
//               {...register('student_id')}
//               error={errors.student_id?.message}
//               placeholder="Your student ID"
//             />

//             <Select
//               label="Department (Optional)"
//               {...register('department')}
//               options={DEPARTMENTS}
//               error={errors.department?.message}
//               placeholder="Select your department"
//             />

//             <Select
//               label="Organization (Optional)"
//               {...register('organization')}
//               options={ORGANIZATIONS}
//               error={errors.organization?.message}
//               placeholder="Select your organization"
//             />

//             <Select
//               label="Gender (Optional)"
//               {...register('gender')}
//               options={GENDER_CHOICES}
//               error={errors.gender?.message}
//               placeholder="Select your gender"
//             />

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Profile Picture (Optional)
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             loading={isLoading}
//             className="w-full"
//           >
//             Create Account
//           </Button>

//           <div className="text-center">
//             <span className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-primary-600 hover:text-primary-500"
//               >
//                  <b>Login</b>
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/authService';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { DEPARTMENTS, ORGANIZATIONS, GENDER_CHOICES } from '../../utils/constants';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password1: z.string().min(8, 'Password confirmation is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  department: z.string().optional(),
  organization: z.string().optional(),
  gender: z.string().optional(),
  student_id: z.string().optional(),
}).refine((data) => data.password === data.password1, {
  message: "Passwords don't match",
  path: ['password1'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authService.register({
        ...data,
        profile_picture: profilePicture || undefined,
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        Object.values(error.response?.data || {}).flat().join(', ') ||
        'Registration failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Utility classes that (safely) enforce readable text inside inputs/selects
  const readableField =
    'text-gray-900 dark:text-gray-100 placeholder:text-gray-500 ' +
    'caret-indigo-600'; // caret visible while typing

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 text-gray-900 dark:text-gray-100">
        <div className="text-center">
          <div className="mx-auto w-36 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">Eventify</span>
          </div>
          <h2 className="text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join Eventify to discover and participate in events
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <Input
              label="Username"
              {...register('username')}
              error={errors.username?.message}
              placeholder="Choose a username"
              className={readableField}
              autoComplete="username"
            /> */}

            <Input
            label="Username"
            {...register('username')}
            error={errors.username?.message}
            placeholder="Choose a username"
            className={readableField}
            autoComplete="username"
            pattern="^[A-Za-z][A-Za-z0-9_]*$"   // regex for username
            onInput={(e) => {
              // remove invalid characters live (anything not a-z, A-Z, 0-9, or _)
              e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z0-9_]/g, '');

              // if it starts with number/underscore, strip it
              if (/^[^A-Za-z]/.test(e.currentTarget.value)) {
                e.currentTarget.value = e.currentTarget.value.replace(/^[^A-Za-z]+/, '');
              }
            }}
          />

            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="your.email@example.com"
              className={readableField}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Create a strong password"
              className={readableField}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register('password1')}
              error={errors.password1?.message}
              placeholder="Confirm your password"
              className={readableField}
              autoComplete="new-password"
            />

            {/* <Input
              label="Phone Number"
              {...register('phone_number')}
              error={errors.phone_number?.message}
              placeholder="Your phone number"
              className={readableField}
              autoComplete="tel"
            /> */}


                  <Input
        label="Phone Number"
        {...register('phone_number')}
        error={errors.phone_number?.message}
        placeholder="98XXXXXXXX"
        className={readableField}
        autoComplete="tel"
        maxLength={10}                // 🚫 cannot type more than 10
        inputMode="numeric"           // 📱 mobile shows numeric keypad
        pattern="^(97|98)\d{8}$"      // 🚫 only numbers starting with 97/98
        onInput={(e) => {
          // remove any non-digit as user types
          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
        }}
      />
            {/* <Input
              label="Student ID (Optional)"
              {...register('student_id')}
              error={errors.student_id?.message}
              placeholder="Your student ID"
              className={readableField}
            /> */}


                  <Input
        label="Student ID (Optional)"
        {...register('student_id')}
        error={errors.student_id?.message}
        placeholder="Your student ID"
        className={readableField}
        inputMode="numeric"            // mobile shows number keypad
        maxLength={7}                  // 🚫 no more than 7 digits
        pattern="^\d{5,7}$"            // 5 to 7 digits only
        onInput={(e) => {
          // strip non-digits live
          e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
        }}
      />

            <Select
              label="Department "
              {...register('department')}
              options={DEPARTMENTS}
              error={errors.department?.message}
              placeholder="Select your department"
              className={readableField}
            />

            <Select
              label="Organization "
              {...register('organization')}
              options={ORGANIZATIONS}
              error={errors.organization?.message}
              placeholder="Select your organization"
              className={readableField}
            />

            <Select
              label="Gender"
              {...register('gender')}
              options={GENDER_CHOICES}
              error={errors.gender?.message}
              placeholder="Select your gender"
              className={readableField}
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Profile Picture (Optional)</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                className={
                  `block w-full text-sm ${readableField} ` +
                  'file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium ' +
                  'file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ' +
                  'dark:file:bg-neutral-800 dark:file:text-gray-100 dark:hover:file:bg-neutral-700'
                }
              />
            </div>
          </div>

          {/* Strong, visible primary button */}
          <Button
            type="submit"
            loading={isLoading}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                       dark:focus-visible:ring-offset-neutral-950 disabled:opacity-70"
          >
            Create Account
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};