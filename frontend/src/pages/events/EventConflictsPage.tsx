import React, { useEffect, useState } from 'react';
import { eventService } from '../../services/eventService';
import type { EventConflictRow } from '../../services/eventService';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const EventConflictsPage: React.FC = () => {
  const [rows, setRows] = useState<EventConflictRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await eventService.getConflicts();
        setRows(data);
      } catch (e) {
        toast.error('Failed to load conflicts');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ExclamationTriangleIcon className="w-7 h-7 text-amber-500" />
        <h1 className="text-3xl font-bold text-gray-900">Conflict Events</h1>
      </div>
      <p className="text-gray-600">Detected scheduling overlaps that need attention.</p>

      {rows.length === 0 ? (
        <div className="text-sm text-gray-500">No conflict event right now.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left">Event 1</th>
                <th className="px-4 py-2 text-left">Event 2</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Detected at</th>
                <th className="px-4 py-2 text-left">Resolved at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-sm">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2">{r.event1_title}</td>
                  <td className="px-4 py-2">{r.event2_title}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.status === 'detected'
                          ? 'bg-amber-100 text-amber-800'
                          : r.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(r.detected_at).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    {r.resolved_at ? new Date(r.resolved_at).toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};