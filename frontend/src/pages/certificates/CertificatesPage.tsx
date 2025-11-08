
import React, { useEffect, useState } from 'react';
import { certificateService } from '../../services/certificateService';
import type { Certificate } from '../../types';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils/helpers';
import { AcademicCapIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await certificateService.getMyCertificates();
        setCertificates(data);
      } catch (error) {
        console.error('Certificates fetch error:', error);
        toast.error('Failed to load certificates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = (certificate: Certificate) => {
    if (certificate.certificate_url) {
      window.open(certificate.certificate_url, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 white:text-gray-100">
          My Certificates
        </h1>
        <p className="mt-2 text-gray-600 white:text-gray-400">
          Download and view your earned certificates
        </p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="rounded-xl border p-6 shadow-sm transition-shadow duration-200
                         bg-white border-gray-200 hover:shadow-md
                         dark:bg-neutral-900 dark:border-neutral-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-lg
                               bg-yellow-100 dark:bg-yellow-500/15"
                  >
                    <AcademicCapIcon
                      className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {certificate.event_title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Workshop Certificate
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Issued:</span>{' '}
                  {formatDate(certificate.issued_at)}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Student:</span>{' '}
                  {certificate.student_name}
                </div>
              </div>

              <Button
                onClick={() => handleDownload(certificate)}
                className="w-full flex items-center justify-center gap-2"
                disabled={!certificate.certificate_url}
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download Certificate</span>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div
            className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full
                       bg-gray-100 dark:bg-neutral-800"
          >
            <AcademicCapIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No certificates yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Complete workshop events to earn certificates
          </p>
        </div>
      )}
    </div>
  );
};