// // import React, { useEffect, useState } from 'react';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { authService } from '../../services/authService';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { Input } from '../../components/ui/Input';
// // import { Select } from '../../components/ui/Select';
// // import { Button } from '../../components/ui/Button';
// // import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// // import {
// //   DEPARTMENTS,
// //   ORGANIZATIONS,
// //   CLASS_CHOICES,
// //   YEAR_CHOICES,
// //   SEMESTER_CHOICES,
// // } from '../../utils/constants';
// // import { UserCircleIcon } from '@heroicons/react/24/outline';
// // import toast from 'react-hot-toast';

// // const profileSchema = z.object({
// //   first_name: z.string().min(1, 'First name is required'),
// //   last_name: z.string().min(1, 'Last name is required'),
// //   phone_number: z.string().optional(),
// //   email: z.string().email('Invalid email').optional(),
// //   department: z.string().optional(),
// //   organization: z.string().optional(),
// //   bio: z.string().optional(),
// //   class_name: z.string().optional(),
// //   year: z.string().optional(),
// //   semester: z.string().optional(),
// //   address: z.string().optional(),
// //   interests: z.array(z.string()).optional(),
// // });

// // type ProfileFormData = z.infer<typeof profileSchema>;

// // export const ProfilePage: React.FC = () => {
// //   const { user, updateUser } = useAuth();
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [hasProfile, setHasProfile] = useState(false);
// //   const [interestsInput, setInterestsInput] = useState('');

// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     formState: { errors },
// //   } = useForm<ProfileFormData>({
// //     resolver: zodResolver(profileSchema),
// //   });

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const profileData = await authService.getProfile(); // should return full User
// //         updateUser(profileData);

// //         setHasProfile(!!profileData.profile);

// //         setValue('first_name', profileData.first_name || '');
// //         setValue('last_name', profileData.last_name || '');
// //         setValue('phone_number', profileData.phone_number || '');
// //         setValue('email', profileData.email || '');
// //         setValue('department', profileData.department || '');
// //         setValue('organization', profileData.organization || '');

// //         if (profileData.profile) {
// //           setValue('bio', profileData.profile.bio || '');
// //           setValue('class_name', profileData.profile.class_name || '');
// //           setValue('year', profileData.profile.year || '');
// //           setValue('semester', profileData.profile.semester || '');
// //           setValue('address', profileData.profile.address || '');
// //           setInterestsInput(profileData.profile.interests?.join(', ') || '');
// //         }
// //       } catch (error) {
// //         console.error('Profile fetch error:', error);
// //         toast.error('Failed to load profile');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchProfile();
// //   }, [setValue, updateUser]);

// //   const onSubmit = async (data: ProfileFormData) => {
// //     setIsSaving(true);
// //     try {
// //       const interests = interestsInput
// //         .split(',')
// //         .map((i) => i.trim())
// //         .filter((i) => i.length > 0);

// //       const profilePayload = { ...data, interests };

// //       const res = hasProfile
// //         ? await authService.updateProfile(profilePayload)
// //         : await authService.createProfile(profilePayload);

// //       toast.success('Profile updated successfully!');

// //       const maybeUser = res && typeof res === 'object' ? res : null;
// //       const looksLikeUser =
// //         maybeUser && 'username' in maybeUser && 'id' in maybeUser;

// //       const freshUser = looksLikeUser ? maybeUser : await authService.getProfile();
// //       updateUser(freshUser);

// //       if (!hasProfile) setHasProfile(true);
// //     } catch (error: any) {
// //       const errorMessage =
// //         error?.response?.data?.error ||
// //         Object.values(error?.response?.data || {}).flat().join(', ') ||
// //         'Failed to update profile';
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-96">
// //         <LoadingSpinner size="lg" />
// //       </div>
// //     );
// //   }

// //   // Reusable field style for textareas and the raw "interests" input
// //   const fieldCls =
// //     'block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm ' +
// //     'text-gray-900 placeholder-gray-400 shadow-sm ' +
// //     'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
// //     'dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100';

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
// //         <p className="mt-2 text-base font-medium text-gray-700 dark:text-gray-200">
// //           Manage your personal information and preferences
// //         </p>
// //       </div>

// //       <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
// //         <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
// //           <div className="flex items-center space-x-4">
// //             <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
// //               {user?.profile_picture ? (
// //                 <img
// //                   src={user.profile_picture}
// //                   alt="Profile"
// //                   className="w-16 h-16 rounded-full object-cover"
// //                 />
// //               ) : (
// //                 <UserCircleIcon className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
// //               )}
// //             </div>
// //             <div>
// //               <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user?.username}</h2>
// //               <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <Input
// //               label="First Name"
// //               {...register('first_name')}
// //               error={errors.first_name?.message}
// //               placeholder="Your first name"
// //             />

// //             <Input
// //               label="Last Name"
// //               {...register('last_name')}
// //               error={errors.last_name?.message}
// //               placeholder="Your last name"
// //             />

// //             <Input
// //               label="Phone Number"
// //               {...register('phone_number')}
// //               error={errors.phone_number?.message}
// //               placeholder="Your phone number"
// //             />

// //             <Input
// //               label="Email"
// //               type="email"
// //               {...register('email')}
// //               error={errors.email?.message}
// //               placeholder="your.email@example.com"
// //             />

// //             <Select
// //               label="Department"
// //               {...register('department')}
// //               options={DEPARTMENTS}
// //               error={errors.department?.message}
// //               placeholder="Select your department"
// //             />

// //             <Select
// //               label="Organization"
// //               {...register('organization')}
// //               options={ORGANIZATIONS}
// //               error={errors.organization?.message}
// //               placeholder="Select your organization"
// //             />

// //             {user?.role === 'Student' && (
// //               <>
// //                 <Select
// //                   label="Class"
// //                   {...register('class_name')}
// //                   options={CLASS_CHOICES}
// //                   error={errors.class_name?.message}
// //                   placeholder="Select your class"
// //                 />

// //                 <Select
// //                   label="Year"
// //                   {...register('year')}
// //                   options={YEAR_CHOICES}
// //                   error={errors.year?.message}
// //                   placeholder="Select your year"
// //                 />

// //                 <Select
// //                   label="Semester"
// //                   {...register('semester')}
// //                   options={SEMESTER_CHOICES}
// //                   error={errors.semester?.message}
// //                   placeholder="Select your semester"
// //                 />
// //               </>
// //             )}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //               Bio
// //             </label>
// //             <textarea
// //               {...register('bio')}
// //               rows={3}
// //               className={fieldCls}
// //               placeholder="Tell us about yourself..."
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //               Address
// //             </label>
// //             <textarea
// //               {...register('address')}
// //               rows={2}
// //               className={fieldCls}
// //               placeholder="Your address..."
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
// //               Interests
// //             </label>
// //             <input
// //               type="text"
// //               value={interestsInput}
// //               onChange={(e) => setInterestsInput(e.target.value)}
// //               className={fieldCls}
// //               placeholder="Enter interests separated by commas (e.g., Programming, Music, Sports)"
// //             />
// //             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //               Separate multiple interests with commas
// //             </p>
// //           </div>

// //           <div className="flex justify-end">
// //             <Button type="submit" loading={isSaving}>
// //               {hasProfile ? 'Update Profile' : 'Create Profile'}
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };



// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { authService } from '../../services/authService';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Input } from '../../components/ui/Input';
// import { Select } from '../../components/ui/Select';
// import { Button } from '../../components/ui/Button';
// import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
// import {
//   DEPARTMENTS,
//   ORGANIZATIONS,
//   CLASS_CHOICES,
//   YEAR_CHOICES,
//   SEMESTER_CHOICES,
// } from '../../utils/constants';
// import { UserCircleIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';
// import type { User } from '../../types';

// /** Treat API payloads as partial user shapes */
// type ApiUser = Partial<User>;
// type SaveResponse =
//   | ApiUser
//   | { profile: ApiUser }
//   | { message?: string; profile: ApiUser };

// const profileSchema = z.object({
//   first_name: z.string().min(1, 'First name is required'),
//   last_name: z.string().min(1, 'Last name is required'),
//   phone_number: z.string().optional(),
//   email: z.string().email('Invalid email').optional(),
//   department: z.string().optional(),
//   organization: z.string().optional(),
//   bio: z.string().optional(),
//   class_name: z.string().optional(),
//   year: z.string().optional(),
//   semester: z.string().optional(),
//   address: z.string().optional(),
//   interests: z.array(z.string()).optional(),
// });
// type ProfileFormData = z.infer<typeof profileSchema>;

// export const ProfilePage: React.FC = () => {
//   const { user, updateUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [hasProfile, setHasProfile] = useState(false);
//   const [interestsInput, setInterestsInput] = useState('');

//   const { register, handleSubmit, setValue, formState: { errors } } =
//     useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) });

//   /** Merge any partial user from API into context */
//   const mergeIntoContext = (patch: ApiUser) => updateUser(patch);

//   useEffect(() => {
//     (async () => {
//       try {
//         const apiUser: ApiUser = await authService.getProfile();
//         mergeIntoContext(apiUser);
//         setHasProfile(!!apiUser.profile);

//         setValue('first_name', apiUser.first_name ?? '');
//         setValue('last_name',  apiUser.last_name  ?? '');
//         setValue('phone_number', apiUser.phone_number ?? '');
//         setValue('email', apiUser.email ?? '');
//         setValue('department', apiUser.department ?? '');
//         setValue('organization', apiUser.organization ?? '');

//         const p = apiUser.profile;
//         if (p) {
//           setValue('bio', p.bio ?? '');
//           setValue('class_name', p.class_name ?? '');
//           setValue('year', p.year ?? '');
//           setValue('semester', p.semester ?? '');
//           setValue('address', p.address ?? '');
//           setInterestsInput(Array.isArray(p.interests) ? p.interests.join(', ') : (p.interests ?? ''));
//         }
//       } catch (err) {
//         console.error('Profile fetch error:', err);
//         toast.error('Failed to load profile');
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onSubmit = async (data: ProfileFormData) => {
//     setIsSaving(true);
//     try {
//       const interests = interestsInput.split(',').map(s => s.trim()).filter(Boolean);
//       const payload: any = { ...data, interests };

//       // Don’t send academics for non-students (your backend ignores them anyway, but this keeps payload tidy)
//       if (user?.role !== 'Student') {
//         delete payload.class_name;
//         delete payload.year;
//         delete payload.semester;
//       }

//       const res: SaveResponse = hasProfile
//         ? await authService.updateProfile(payload)
//         : await authService.createProfile(payload);

//       toast.success('Profile updated successfully!');

//       if ('profile' in (res as any)) {
//         mergeIntoContext((res as { profile: ApiUser }).profile);
//       } else {
//         mergeIntoContext(res as ApiUser);
//       }

//       if (!hasProfile) setHasProfile(true);
//     } catch (error: any) {
//       const msg =
//         error?.response?.data?.error ||
//         Object.values(error?.response?.data || {}).flat().join(', ') ||
//         'Failed to update profile';
//       toast.error(msg);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   // Visible in light & dark
//   const fieldCls =
//     'block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm ' +
//     'text-gray-900 placeholder-gray-400 shadow-sm ' +
//     'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
//     'dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100';

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 white:text-gray-100">Profile</h1>
//         <p className="mt-2 text-base font-medium text-gray-700 white:text-gray-200">
//           Manage your personal information and preferences
//         </p>
//       </div>

//       <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
//               {user?.profile_picture ? (
//                 <img src={user.profile_picture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
//               ) : (
//                 <UserCircleIcon className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
//               )}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user?.username}</h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input label="First Name" {...register('first_name')} error={errors.first_name?.message} placeholder="Your first name" />
//             <Input label="Last Name"  {...register('last_name')}  error={errors.last_name?.message}  placeholder="Your last name" />
//             <Input label="Phone Number" {...register('phone_number')} error={errors.phone_number?.message} placeholder="Your phone number" />
//             <Input label="Email" type="email" {...register('email')} error={errors.email?.message} placeholder="your.email@example.com" />
//             <Select label="Department" {...register('department')} options={DEPARTMENTS} error={errors.department?.message} placeholder="Select your department" />
//             <Select label="Organization" {...register('organization')} options={ORGANIZATIONS} error={errors.organization?.message} placeholder="Select your organization" />

//             {user?.role === 'Student' && (
//               <>
//                 <Select label="Class" {...register('class_name')} options={CLASS_CHOICES} error={errors.class_name?.message} placeholder="Select your class" />
//                 <Select label="Year"  {...register('year')} options={YEAR_CHOICES} error={errors.year?.message} placeholder="Select your year" />
//                 <Select label="Semester" {...register('semester')} options={SEMESTER_CHOICES} error={errors.semester?.message} placeholder="Select your semester" />
//               </>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Bio</label>
//             <textarea {...register('bio')} rows={3} className={fieldCls} placeholder="Tell us about yourself..." />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
//             <textarea {...register('address')} rows={2} className={fieldCls} placeholder="Your address..." />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Interests</label>
//             <input
//               type="text"
//               value={interestsInput}
//               onChange={(e) => setInterestsInput(e.target.value)}
//               className={fieldCls}
//               placeholder="Enter interests separated by commas (e.g., Programming, Music, Sports)"
//             />
//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Separate multiple interests with commas</p>
//           </div>

//           <div className="flex justify-end">
//             <Button type="submit" loading={isSaving}>
//               {hasProfile ? 'Update Profile' : 'Create Profile'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  DEPARTMENTS,
  ORGANIZATIONS,
  CLASS_CHOICES,
  YEAR_CHOICES,
  SEMESTER_CHOICES,
} from '../../utils/constants';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import type { User } from '../../types';

/** Treat API payloads as partial user shapes */
type ApiUser = Partial<User>;
type SaveResponse =
  | ApiUser
  | { profile: ApiUser }
  | { message?: string; profile: ApiUser };

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  department: z.string().optional(),
  organization: z.string().optional(),
  bio: z.string().optional(),
  class_name: z.string().optional(),
  year: z.string().optional(),
  semester: z.string().optional(),
  address: z.string().optional(),
  interests: z.array(z.string()).optional(),
});
type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [interestsInput, setInterestsInput] = useState('');

  // 🔹 NEW: selected picture file
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } =
    useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) });

  /** Merge any partial user from API into context */
  const mergeIntoContext = (patch: ApiUser) => updateUser(patch);

  useEffect(() => {
    (async () => {
      try {
        const apiUser: ApiUser = await authService.getProfile();
        mergeIntoContext(apiUser);
        setHasProfile(!!apiUser.profile);

        setValue('first_name', apiUser.first_name ?? '');
        setValue('last_name',  apiUser.last_name  ?? '');
        setValue('phone_number', apiUser.phone_number ?? '');
        setValue('email', apiUser.email ?? '');
        setValue('department', apiUser.department ?? '');
        setValue('organization', apiUser.organization ?? '');

        const p = apiUser.profile;
        if (p) {
          setValue('bio', p.bio ?? '');
          setValue('class_name', p.class_name ?? '');
          setValue('year', p.year ?? '');
          setValue('semester', p.semester ?? '');
          setValue('address', p.address ?? '');
          setInterestsInput(Array.isArray(p.interests) ? p.interests.join(', ') : (p.interests ?? ''));
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 NEW: handle file selection
  const handlePictureChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    setPictureFile(file);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      const interests = interestsInput.split(',').map(s => s.trim()).filter(Boolean);
      const payload: any = { ...data, interests };

      // Don’t send academics for non-students (your backend ignores them anyway, but this keeps payload tidy)
      if (user?.role !== 'Student') {
        delete payload.class_name;
        delete payload.year;
        delete payload.semester;
      }

      // 🔹 If a new picture is selected, send multipart; else keep your existing JSON flow
      if (pictureFile) {
        const fd = new FormData();
        // append scalar fields
        Object.entries(payload).forEach(([k, v]) => {
          if (v === undefined) return;
          if (Array.isArray(v)) {
            fd.append(k, v.join(',')); // backend accepts comma-separated interests
          } else {
            fd.append(k, v === null ? '' : (v as any));
          }
        });
        // append file
        fd.append('profile_picture', pictureFile);

        const token = localStorage.getItem('token') || '';
        const endpoint = hasProfile ? '/api/v1/profile/update/' : '/api/v1/profile/';
        const method = hasProfile ? 'PUT' : 'POST';

        const resp = await fetch(endpoint, {
          method,
          headers: { Authorization: `Token ${token}` }, // let browser set Content-Type boundary
          body: fd,
        });
        const res = await resp.json();
        if (!resp.ok) throw { response: { data: res } };

        toast.success(hasProfile ? 'Profile updated successfully!' : 'Profile created successfully!');
        const patch = (res as any).profile ? (res as any).profile : res;
        mergeIntoContext(patch as ApiUser);
        if (!hasProfile) setHasProfile(true);
        setPictureFile(null); // reset after success
        return;
      }

      // ⬇️ Unchanged JSON path
      const res: SaveResponse = hasProfile
        ? await authService.updateProfile(payload)
        : await authService.createProfile(payload);

      toast.success('Profile updated successfully!');

      if ('profile' in (res as any)) {
        mergeIntoContext((res as { profile: ApiUser }).profile);
      } else {
        mergeIntoContext(res as ApiUser);
      }

      if (!hasProfile) setHasProfile(true);
    } catch (error: any) {
      const msg =
        error?.response?.data?.error ||
        Object.values(error?.response?.data || {}).flat().join(', ') ||
        'Failed to update profile';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Visible in light & dark
  const fieldCls =
    'block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-sm ' +
    'text-gray-900 placeholder-gray-400 shadow-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
    'dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 white:text-gray-100">Profile</h1>
        <p className="mt-2 text-base font-medium text-gray-700 white:text-gray-200">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              {user?.profile_picture ? (
                <img src={user.profile_picture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user?.username}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* 🔹 Add encType so the form can carry files when needed */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6" encType="multipart/form-data">
          {/* 🔹 NEW: simple file input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="block w-full text-sm text-gray-900 dark:text-gray-100
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-neutral-800 file:text-white
                         hover:file:bg-neutral-700"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose an image to upload. If you don’t pick one, the current picture stays unchanged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" {...register('first_name')} error={errors.first_name?.message} placeholder="Your first name" />
            <Input label="Last Name"  {...register('last_name')}  error={errors.last_name?.message}  placeholder="Your last name" />
            <Input label="Phone Number" {...register('phone_number')} error={errors.phone_number?.message} placeholder="Your phone number" />
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} placeholder="your.email@example.com" />
            <Select label="Department" {...register('department')} options={DEPARTMENTS} error={errors.department?.message} placeholder="Select your department" />
            <Select label="Organization" {...register('organization')} options={ORGANIZATIONS} error={errors.organization?.message} placeholder="Select your organization" />

            {user?.role === 'Student' && (
              <>
                <Select label="Class" {...register('class_name')} options={CLASS_CHOICES} error={errors.class_name?.message} placeholder="Select your class" />
                <Select label="Year"  {...register('year')} options={YEAR_CHOICES} error={errors.year?.message} placeholder="Select your year" />
                <Select label="Semester" {...register('semester')} options={SEMESTER_CHOICES} error={errors.semester?.message} placeholder="Select your semester" />
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Bio</label>
            <textarea {...register('bio')} rows={3} className={fieldCls} placeholder="Tell us about yourself..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
            <textarea {...register('address')} rows={2} className={fieldCls} placeholder="Your address..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Interests</label>
            <input
              type="text"
              value={interestsInput}
              onChange={(e) => setInterestsInput(e.target.value)}
              className={fieldCls}
              placeholder="Enter interests separated by commas (e.g., Programming, Music, Sports)"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Separate multiple interests with commas</p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={isSaving}>
              {hasProfile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};