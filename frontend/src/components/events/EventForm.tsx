// // // import React, { useState } from 'react';
// // // import { useForm } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';
// // // import { z } from 'zod';
// // // import { Input } from '../ui/Input';
// // // import { Select } from '../ui/Select';
// // // import { Button } from '../ui/Button';
// // // import { EVENT_TYPES, EVENT_LEVELS, CLASS_CHOICES, YEAR_CHOICES, SEMESTER_CHOICES } from '../../utils/constants';
// // // // import { useAuth } from '../../contexts/AuthContext';

// // // const eventSchema = z.object({
// // //   title: z.string().min(1, 'Title is required'),
// // //   description: z.string().min(1, 'Description is required'),
// // //   event_level: z.string().min(1, 'Event level is required'),
// // //   event_type: z.string().min(1, 'Event type is required'),
// // //   start_date: z.string().min(1, 'Start date is required'),
// // //   end_date: z.string().min(1, 'End date is required'),
// // //   venue: z.string().min(1, 'Venue is required'),
// // //   max_participants: z.number().min(1, 'Must have at least 1 participant'),
// // //   registration_deadline: z.string().min(1, 'Registration deadline is required'),
// // //   is_paid_event: z.boolean(),
// // //   registration_fee: z.number().min(0, 'Fee cannot be negative'),
// // //   class_name: z.string().optional(),
// // //   year: z.string().optional(),
// // //   semester: z.string().optional(),
// // // });

// // // type EventFormData = z.infer<typeof eventSchema>;

// // // interface EventFormProps {
// // //   onSubmit: (data: EventFormData & { poster?: File }) => Promise<void>;
// // //   initialData?: Partial<EventFormData>;
// // //   isLoading?: boolean;
// // // }

// // // export const EventForm: React.FC<EventFormProps> = ({
// // //   onSubmit,
// // //   initialData,
// // //   isLoading = false,
// // // }) => {
// // //   // const { user } = useAuth();
// // //   const [poster, setPoster] = useState<File | null>(null);
  
// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     watch,
// // //     formState: { errors },
// // //   } = useForm<EventFormData>({
// // //     resolver: zodResolver(eventSchema),
// // //     defaultValues: {
// // //       is_paid_event: false,
// // //       registration_fee: 0,
// // //       max_participants: 100,
// // //       ...initialData,
// // //     },
// // //   });

// // //   const eventLevel = watch('event_level');
// // //   const isPaidEvent = watch('is_paid_event');

// // //   const handleFormSubmit = async (data: EventFormData) => {
// // //     await onSubmit({ ...data, poster: poster || undefined });
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         <div className="md:col-span-2">
// // //           <Input
// // //             label="Event Title"
// // //             {...register('title')}
// // //             error={errors.title?.message}
// // //             placeholder="Enter event title"
// // //           />
// // //         </div>

// // //         <div className="md:col-span-2">
// // //           <label className="block text-sm font-medium text-gray-700 mb-1">
// // //             Description
// // //           </label>
// // //           <textarea
// // //             {...register('description')}
// // //             rows={4}
// // //             className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
// // //             placeholder="Describe your event..."
// // //           />
// // //           {errors.description && (
// // //             <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
// // //           )}
// // //         </div>

// // //         <Select
// // //           label="Event Level"
// // //           {...register('event_level')}
// // //           options={EVENT_LEVELS}
// // //           error={errors.event_level?.message}
// // //           placeholder="Select event level"
// // //         />

// // //         <Select
// // //           label="Event Type"
// // //           {...register('event_type')}
// // //           options={EVENT_TYPES}
// // //           error={errors.event_type?.message}
// // //           placeholder="Select event type"
// // //         />

// // //         {eventLevel === 'class' && (
// // //           <>
// // //             <Select
// // //               label="Class"
// // //               {...register('class_name')}
// // //               options={CLASS_CHOICES}
// // //               error={errors.class_name?.message}
// // //               placeholder="Select class"
// // //             />

// // //             <Select
// // //               label="Year"
// // //               {...register('year')}
// // //               options={YEAR_CHOICES}
// // //               error={errors.year?.message}
// // //               placeholder="Select year (optional)"
// // //             />

// // //             <Select
// // //               label="Semester"
// // //               {...register('semester')}
// // //               options={SEMESTER_CHOICES}
// // //               error={errors.semester?.message}
// // //               placeholder="Select semester (optional)"
// // //             />
// // //           </>
// // //         )}

// // //         <Input
// // //           label="Start Date & Time"
// // //           type="datetime-local"
// // //           {...register('start_date')}
// // //           error={errors.start_date?.message}
// // //         />

// // //         <Input
// // //           label="End Date & Time"
// // //           type="datetime-local"
// // //           {...register('end_date')}
// // //           error={errors.end_date?.message}
// // //         />

// // //         <Input
// // //           label="Venue"
// // //           {...register('venue')}
// // //           error={errors.venue?.message}
// // //           placeholder="Event venue"
// // //         />

// // //         <Input
// // //           label="Max Participants"
// // //           type="number"
// // //           {...register('max_participants', { valueAsNumber: true })}
// // //           error={errors.max_participants?.message}
// // //           min="1"
// // //         />

// // //         <Input
// // //           label="Registration Deadline"
// // //           type="datetime-local"
// // //           {...register('registration_deadline')}
// // //           error={errors.registration_deadline?.message}
// // //         />

// // //         <div className="flex items-center space-x-2">
// // //           <input
// // //             type="checkbox"
// // //             {...register('is_paid_event')}
// // //             className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
// // //           />
// // //           <label className="text-sm font-medium text-gray-700">
// // //             Paid Event
// // //           </label>
// // //         </div>

// // //         {isPaidEvent && (
// // //           <Input
// // //             label="Registration Fee (Rs.)"
// // //             type="number"
// // //             {...register('registration_fee', { valueAsNumber: true })}
// // //             error={errors.registration_fee?.message}
// // //             min="0"
// // //             step="0.01"
// // //           />
// // //         )}

// // //         <div className="md:col-span-2">
// // //           <label className="block text-sm font-medium text-black-700 mb-1">
// // //             Event Poster
// // //           </label>
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => setPoster(e.target.files?.[0] || null)}
// // //             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-end space-x-4">
// // //   <Button
// // //     type="submit"
// // //     loading={isLoading}
// // //     className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-600 rounded-lg py-2 px-4"
// // //   >
// // //     {initialData ? 'Update Event' : 'Create Event'}
// // //   </Button>
// // // </div>
// // //     </form>
// // //   );
// // // };

// // import React, { useState } from 'react';
// // // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { Input } from '../ui/Input';
// // import { Select } from '../ui/Select';
// // import { Button } from '../ui/Button';
// // import { EVENT_TYPES, EVENT_LEVELS, CLASS_CHOICES, YEAR_CHOICES, SEMESTER_CHOICES } from '../../utils/constants';
// // // import { useAuth } from '../../contexts/AuthContext';

// // const eventSchema = z.object({
// //   title: z.string().min(1, 'Title is required'),
// //   description: z.string().min(1, 'Description is required'),
// //   event_level: z.string().min(1, 'Event level is required'),
// //   event_type: z.string().min(1, 'Event type is required'),
// //   start_date: z.string().min(1, 'Start date is required'),
// //   end_date: z.string().min(1, 'End date is required'),
// //   venue: z.string().min(1, 'Venue is required'),
// //   max_participants: z.number().min(1, 'Must have at least 1 participant'),
// //   // Make registration_deadline optional - validation will be handled conditionally
// //   registration_deadline: z.string().optional(),
// //   is_paid_event: z.boolean(),
// //   registration_fee: z.number().min(0, 'Fee cannot be negative'),
// //   class_name: z.string().optional(),
// //   year: z.string().optional(),
// //   semester: z.string().optional(),
// // }).refine((data) => {
// //   // Only require registration_deadline for non-class level events
// //   if (data.event_level !== 'class' && (!data.registration_deadline || data.registration_deadline.trim() === '')) {
// //     return false;
// //   }
// //   return true;
// // }, {
// //   message: "Registration deadline is required for non class-level events",
// //   path: ["registration_deadline"],
// // });

// // type EventFormData = z.infer<typeof eventSchema>;

// // interface EventFormProps {
// //   onSubmit: (data: EventFormData & { poster?: File }) => Promise<void>;
// //   initialData?: Partial<EventFormData>;
// //   isLoading?: boolean;
// // }

// // export const EventForm: React.FC<EventFormProps> = ({
// //   onSubmit,
// //   initialData,
// //   isLoading = false,
// // }) => {
// //   // const { user } = useAuth();
// //   const [poster, setPoster] = useState<File | null>(null);
  
// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     formState: { errors },
// //   } = useForm<EventFormData>({
// //     resolver: zodResolver(eventSchema),
// //     defaultValues: {
// //       is_paid_event: false,
// //       registration_fee: 0,
// //       max_participants: 100,
// //       ...initialData,
// //     },
// //   });

// //   const eventLevel = watch('event_level');
// //   const isPaidEvent = watch('is_paid_event');

// //   const handleFormSubmit = async (data: EventFormData) => {
// //     await onSubmit({ ...data, poster: poster || undefined });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="md:col-span-2">
// //           <Input
// //             label="Event Title"
// //             {...register('title')}
// //             error={errors.title?.message}
// //             placeholder="Enter event title"
// //           />
// //         </div>

// //         <div className="md:col-span-2">
// //           <label className="block text-sm font-medium text-gray-700 mb-1">
// //             Description
// //           </label>
// //           <textarea
// //             {...register('description')}
// //             rows={4}
// //             className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
// //             placeholder="Describe your event..."
// //           />
// //           {errors.description && (
// //             <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
// //           )}
// //         </div>

// //         <Select
// //           label="Event Level"
// //           {...register('event_level')}
// //           options={EVENT_LEVELS}
// //           error={errors.event_level?.message}
// //           placeholder="Select event level"
// //         />

// //         <Select
// //           label="Event Type"
// //           {...register('event_type')}
// //           options={EVENT_TYPES}
// //           error={errors.event_type?.message}
// //           placeholder="Select event type"
// //         />

// //         {eventLevel === 'class' && (
// //           <>
// //             <Select
// //               label="Class"
// //               {...register('class_name')}
// //               options={CLASS_CHOICES}
// //               error={errors.class_name?.message}
// //               placeholder="Select class"
// //             />

// //             <Select
// //               label="Year"
// //               {...register('year')}
// //               options={YEAR_CHOICES}
// //               error={errors.year?.message}
// //               placeholder="Select year (optional)"
// //             />

// //             <Select
// //               label="Semester"
// //               {...register('semester')}
// //               options={SEMESTER_CHOICES}
// //               error={errors.semester?.message}
// //               placeholder="Select semester (optional)"
// //             />
// //           </>
// //         )}

// //         <Input
// //           label="Start Date & Time"
// //           type="datetime-local"
// //           {...register('start_date')}
// //           error={errors.start_date?.message}
// //         />

// //         <Input
// //           label="End Date & Time"
// //           type="datetime-local"
// //           {...register('end_date')}
// //           error={errors.end_date?.message}
// //         />

// //         <Input
// //           label="Venue"
// //           {...register('venue')}
// //           error={errors.venue?.message}
// //           placeholder="Event venue"
// //         />

// //         <Input
// //           label="Max Participants"
// //           type="number"
// //           {...register('max_participants', { valueAsNumber: true })}
// //           error={errors.max_participants?.message}
// //           min="1"
// //         />

// //         <Input
// //           label={eventLevel === 'class' ? 'Registration Deadline (Optional)' : 'Registration Deadline'}
// //           type="datetime-local"
// //           {...register('registration_deadline')}
// //           error={errors.registration_deadline?.message}
// //         />

// //         <div className="flex items-center space-x-2">
// //           <input
// //             type="checkbox"
// //             {...register('is_paid_event')}
// //             className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
// //           />
// //           <label className="text-sm font-medium text-gray-700">
// //             Paid Event
// //           </label>
// //         </div>

// //         {isPaidEvent && (
// //           <Input
// //             label="Registration Fee (Rs.)"
// //             type="number"
// //             {...register('registration_fee', { valueAsNumber: true })}
// //             error={errors.registration_fee?.message}
// //             min="0"
// //             step="0.01"
// //           />
// //         )}

// //         <div className="md:col-span-2">
// //           <label className="block text-sm font-medium text-black-700 mb-1">
// //             Event Poster
// //           </label>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => setPoster(e.target.files?.[0] || null)}
// //             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
// //           />
// //         </div>
// //       </div>

// //       <div className="flex justify-end space-x-4">
// //   <Button
// //     type="submit"
// //     loading={isLoading}
// //     className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-600 rounded-lg py-2 px-4"
// //   >
// //     {initialData ? 'Update Event' : 'Create Event'}
// //   </Button>
// // </div>
// //     </form>
// //   );
// // };

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form'; // must be a named import
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Input } from '../ui/Input';
// import { Select } from '../ui/Select';
// import { Button } from '../ui/Button';
// import { EVENT_TYPES, EVENT_LEVELS, CLASS_CHOICES, YEAR_CHOICES, SEMESTER_CHOICES } from '../../utils/constants';

// // ✅ Allow nulls from backend for optional fields
// const eventSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   event_level: z.string().min(1, 'Event level is required'),
//   event_type: z.string().min(1, 'Event type is required'),
//   start_date: z.string().min(1, 'Start date is required'),
//   end_date: z.string().min(1, 'End date is required'),
//   venue: z.string().min(1, 'Venue is required'),
//   max_participants: z.number().min(1, 'Must have at least 1 participant'),
//   registration_deadline: z.string().optional().nullable(),
//   is_paid_event: z.boolean(),
//   registration_fee: z.number().min(0, 'Fee cannot be negative'),
//   class_name: z.string().optional().nullable(),
//   year: z.string().optional().nullable(),
//   semester: z.string().optional().nullable(),
// }).refine((data) => {
//   const hasDeadline =
//     typeof data.registration_deadline === 'string' &&
//     data.registration_deadline.trim() !== '';
//   // Only require registration_deadline for non-class events
//   if (data.event_level !== 'class' && !hasDeadline) return false;
//   return true;
// }, {
//   message: 'Registration deadline is required for non class-level events',
//   path: ['registration_deadline'],
// });

// type EventFormData = z.infer<typeof eventSchema>;

// interface EventFormProps {
//   onSubmit: (data: EventFormData & { poster?: File }) => Promise<void>;
//   initialData?: Partial<EventFormData>;
//   isLoading?: boolean;
// }

// /** Robust normalizer for date values that may come as:
//  *  - "YYYY-MM-DDTHH:mm" (native datetime-local)  OR
//  *  - "MM/DD/YYYY HH:mm AM|PM" (formatted)
//  *  Returns ISO string (UTC) or undefined.
//  */
// const toISO = (raw?: string | null): string | undefined => {
//   const v = (raw ?? '').trim();
//   if (!v) return undefined;

//   // Try native parse first
//   const d1 = new Date(v);
//   if (!isNaN(d1.getTime())) return d1.toISOString();

//   // Try AM/PM: 09/10/2025 03:45 PM
//   const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
//   if (m) {
//     let [, mm, dd, yyyy, hh, min, ap] = m;
//     let H = parseInt(hh, 10);
//     const minute = parseInt(min, 10);
//     if (ap.toUpperCase() === 'PM' && H !== 12) H += 12;
//     if (ap.toUpperCase() === 'AM' && H === 12) H = 0;
//     const d2 = new Date(Number(yyyy), Number(mm) - 1, Number(dd), H, minute, 0, 0);
//     if (!isNaN(d2.getTime())) return d2.toISOString();
//   }
//   return undefined;
// };

// export const EventForm: React.FC<EventFormProps> = ({
//   onSubmit,
//   initialData,
//   isLoading = false,
// }) => {
//   const [poster, setPoster] = useState<File | null>(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<EventFormData>({
//     resolver: zodResolver(eventSchema),
//     defaultValues: {
//       is_paid_event: false,
//       registration_fee: 0,
//       max_participants: 100,
//       // initialData may include nulls from API; RHF is fine with that now that schema is nullable
//       ...initialData,
//     },
//   });

//   const eventLevel = watch('event_level');
//   const isPaidEvent = watch('is_paid_event');

//   // Normalize dates BEFORE delegating to parent submit
//   const handleFormSubmit = async (data: EventFormData) => {
//     await onSubmit({
//       ...data,
//       start_date: toISO(data.start_date) || (data.start_date ?? ''),
//       end_date: toISO(data.end_date) || (data.end_date ?? ''),
//       registration_deadline: data.registration_deadline
//         ? (toISO(data.registration_deadline) || data.registration_deadline)
//         : undefined,
//       ...(poster ? { poster } : {}),
//     });
//   };

//   // Log which field blocked submit if Zod prevents it
//   const handleInvalid = (formErrors: unknown) => {
//     console.error('Form validation failed:', formErrors);
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit, handleInvalid)} className="space-y-6" noValidate>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="md:col-span-2">
//           <Input
//             label="Event Title"
//             {...register('title')}
//             error={errors.title?.message}
//             placeholder="Enter event title"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             {...register('description')}
//             rows={4}
//             className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
//             placeholder="Describe your event..."
//           />
//           {errors.description && (
//             <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//           )}
//         </div>

//         <Select
//           label="Event Level"
//           {...register('event_level')}
//           options={EVENT_LEVELS}
//           error={errors.event_level?.message}
//           placeholder="Select event level"
//         />

//         <Select
//           label="Event Type"
//           {...register('event_type')}
//           options={EVENT_TYPES}
//           error={errors.event_type?.message}
//           placeholder="Select event type"
//         />

//         {eventLevel === 'class' && (
//           <>
//             <Select
//               label="Class"
//               {...register('class_name')}
//               options={CLASS_CHOICES}
//               error={errors.class_name?.message}
//               placeholder="Select class"
//             />

//             <Select
//               label="Year"
//               {...register('year')}
//               options={YEAR_CHOICES}
//               error={errors.year?.message}
//               placeholder="Select year (optional)"
//             />

//             <Select
//               label="Semester"
//               {...register('semester')}
//               options={SEMESTER_CHOICES}
//               error={errors.semester?.message}
//               placeholder="Select semester (optional)"
//             />
//           </>
//         )}

//         <Input
//           label="Start Date & Time"
//           type="datetime-local"
//           {...register('start_date')}
//           error={errors.start_date?.message}
//         />

//         <Input
//           label="End Date & Time"
//           type="datetime-local"
//           {...register('end_date')}
//           error={errors.end_date?.message}
//         />

//         <Input
//           label="Venue"
//           {...register('venue')}
//           error={errors.venue?.message}
//           placeholder="Event venue"
//         />

//         <Input
//           label="Max Participants"
//           type="number"
//           {...register('max_participants', { valueAsNumber: true })}
//           error={errors.max_participants?.message}
//           min="1"
//         />

//         <Input
//           label={eventLevel === 'class' ? 'Registration Deadline (Optional)' : 'Registration Deadline'}
//           type="datetime-local"
//           {...register('registration_deadline')}
//           error={errors.registration_deadline?.message}
//         />

//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             {...register('is_paid_event')}
//             className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//           />
//           <label className="text-sm font-medium text-gray-700">
//             Paid Event
//           </label>
//         </div>

//         {isPaidEvent && (
//           <Input
//             label="Registration Fee (Rs.)"
//             type="number"
//             {...register('registration_fee', { valueAsNumber: true })}
//             error={errors.registration_fee?.message}
//             min="0"
//             step="0.01"
//           />
//         )}

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-black-700 mb-1">
//             Event Poster
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setPoster(e.target.files?.[0] || null)}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end space-x-4">
//         <Button
//           type="submit"
//           loading={isLoading}
//           className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-600 rounded-lg py-2 px-4"
//         >
//           {initialData ? 'Update Event' : 'Create Event'}
//         </Button>
//       </div>
//     </form>
//   );
// };

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { EVENT_TYPES, EVENT_LEVELS, CLASS_CHOICES, YEAR_CHOICES, SEMESTER_CHOICES } from '../../utils/constants';

// --- Schema ---
// Allow nulls from backend, then enforce conditional requirements via superRefine
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  event_level: z.string().min(1, 'Event level is required'),
  event_type: z.string().min(1, 'Event type is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  venue: z.string().min(1, 'Venue is required'),
  max_participants: z.number().min(1, 'Must have at least 1 participant'),
  registration_deadline: z.string().optional().nullable(),
  is_paid_event: z.boolean(),
  registration_fee: z.number().min(0, 'Fee cannot be negative'),
  class_name: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  semester: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
  const isClass = data.event_level === 'class';
  const hasDeadline = typeof data.registration_deadline === 'string' && data.registration_deadline.trim() !== '';
  const hasClassName = typeof data.class_name === 'string' && data.class_name.trim() !== '';
  const hasYear = typeof data.year === 'string' && data.year.trim() !== '';
  const hasSemester = typeof data.semester === 'string' && data.semester.trim() !== '';

  if (isClass) {
    // class_name required
    if (!hasClassName) {
      ctx.addIssue({
        code: 'custom',
        path: ['class_name'],
        message: 'Class name is required for class-level events',
      });
    }
    // require either year or semester
    if (!hasYear && !hasSemester) {
      ctx.addIssue({
        code: 'custom',
        path: ['year'],
        message: 'Provide either year or semester for class-level events',
      });
    }
  } else {
    // Non-class must have registration_deadline
    if (!hasDeadline) {
      ctx.addIssue({
        code: 'custom',
        path: ['registration_deadline'],
        message: 'Registration deadline is required for non class-level events',
      });
    }
  }
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormData & { poster?: File }) => Promise<void>;
  initialData?: Partial<EventFormData>;
  isLoading?: boolean;
}

// Normalize date strings from either "YYYY-MM-DDTHH:mm" or "MM/DD/YYYY HH:mm AM|PM"
const toISO = (raw?: string | null): string | undefined => {
  const v = (raw ?? '').trim();
  if (!v) return undefined;

  const d1 = new Date(v);
  if (!isNaN(d1.getTime())) return d1.toISOString();

  const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m) {
    let [, mm, dd, yyyy, hh, min, ap] = m;
    let H = parseInt(hh, 10);
    const minute = parseInt(min, 10);
    if (ap.toUpperCase() === 'PM' && H !== 12) H += 12;
    if (ap.toUpperCase() === 'AM' && H === 12) H = 0;
    const d2 = new Date(Number(yyyy), Number(mm) - 1, Number(dd), H, minute, 0, 0);
    if (!isNaN(d2.getTime())) return d2.toISOString();
  }
  return undefined;
};

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [poster, setPoster] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      is_paid_event: false,
      registration_fee: 0,
      max_participants: 100,
      ...initialData,
    },
  });

  const eventLevel = watch('event_level');
  const isPaidEvent = watch('is_paid_event');

  const handleFormSubmit = async (data: EventFormData) => {
    await onSubmit({
      ...data,
      // convert dates to ISO
      start_date: toISO(data.start_date) || (data.start_date ?? ''),
      end_date: toISO(data.end_date) || (data.end_date ?? ''),
      registration_deadline: data.registration_deadline
        ? (toISO(data.registration_deadline) || data.registration_deadline)
        : undefined,
      // trim/omit optionals so backend doesn’t receive nulls/empty strings
      class_name: data.class_name?.trim() || undefined,
      year: data.year?.trim() || undefined,
      semester: data.semester?.trim() || undefined,
      ...(poster ? { poster } : {}),
    });
  };

  const handleInvalid = (errs: unknown) => {
    console.error('Form validation failed:', errs);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, handleInvalid)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Event Title *"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Enter event title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white-700 mb-1">Description *</label>
          <textarea
            {...register('description')}
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Describe your event..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <Select
          label="Event Level *"
          {...register('event_level')}
          options={EVENT_LEVELS}
          error={errors.event_level?.message}
          placeholder="Select event level"
        />

        <Select
          label="Event Type *"
          {...register('event_type')}
          options={EVENT_TYPES}
          error={errors.event_type?.message}
          placeholder="Select event type"
        />

        {eventLevel === 'class' && (
          <>
            <Select
              label="Class *"
              {...register('class_name')}
              options={CLASS_CHOICES}
              error={errors.class_name?.message}
              placeholder="Select class"
            />
            <Select
              label="Year"
              {...register('year')}
              options={YEAR_CHOICES}
              error={errors.year?.message}
              placeholder="Select year"
            />
            <Select
              label="Semester"
              {...register('semester')}
              options={SEMESTER_CHOICES}
              error={errors.semester?.message}
              placeholder="Select semester "
            />
          </>
        )}

        <Input
          label="Start Date & Time *"
          type="datetime-local"
          {...register('start_date')}
          error={errors.start_date?.message}
        />

        <Input
          label="End Date & Time *"
          type="datetime-local"
          {...register('end_date')}
          error={errors.end_date?.message}
        />

        <Input
          label="Venue *"
          {...register('venue')}
          error={errors.venue?.message}
          placeholder="Event venue"
        />

        <Input
          label="Max Participants"
          type="number"
          {...register('max_participants', { valueAsNumber: true })}
          error={errors.max_participants?.message}
          min="1"
        />

        <Input
          label={eventLevel === 'class' ? 'Registration Deadline (Optional)' : 'Registration Deadline'}
          type="datetime-local"
          {...register('registration_deadline')}
          error={errors.registration_deadline?.message}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('is_paid_event')}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="text-sm font-medium text-gray-700">Paid Event</label>
        </div>

        {isPaidEvent && (
          <Input
            label="Registration Fee (Rs.)"
            type="number"
            {...register('registration_fee', { valueAsNumber: true })}
            error={errors.registration_fee?.message}
            min="0"
            step="0.01"
          />
        )}

        {/* <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black-700 mb-1">Event Poster</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPoster(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />

        </div> */}

      <div className="md:col-span-2">
  <label
    htmlFor="eventPoster"
    className="block text-sm font-medium text-black-700 mb-1"
  >
    Event Poster
  </label>
  <input
    id="eventPoster"
    type="file"
    accept="image/*"
    onChange={(e) => setPoster(e.target.files?.[0] || null)}
    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
  />
</div>

      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          loading={isLoading}
          className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-600 rounded-lg py-2 px-4"
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};