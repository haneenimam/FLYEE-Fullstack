'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';
import { bookingApi, CreateBookingData } from '../lib/api';
import { format } from 'date-fns';

interface BookingFormProps {
  onBookingCreated?: (booking: any) => void;
  onCancel?: () => void;
}

const services = [
  'Consultation',
  'Treatment',
  'Follow-up',
  'Emergency',
  'Other'
];

export default function BookingForm({ onBookingCreated, onCancel }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<CreateBookingData>();

  const watchedDate = watch('date');

  useEffect(() => {
    if (watchedDate) {
      fetchAvailability(watchedDate);
    }
  }, [watchedDate]);

  const fetchAvailability = async (date: string) => {
    try {
      setIsLoading(true);
      const availability = await bookingApi.getAvailability(date);
      setAvailableSlots(availability.availableSlots);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CreateBookingData) => {
    try {
      setIsSubmitting(true);
      const booking = await bookingApi.createBooking(data);
      setSuccess(true);
      reset();
      setSelectedDate('');
      setAvailableSlots([]);

      if (onBookingCreated) {
        onBookingCreated(booking);
      }
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      alert(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setValue('date', date);
    setValue('time', '');
  };

  if (success) {
    return (
      <div className="card p-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Created Successfully!</h3>
        <p className="text-gray-600 mb-4">Your booking has been submitted and is pending confirmation.</p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-primary"
        >
          Create Another Booking
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Create New Booking
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input-field"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            className="input-field"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="input-field"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Time *
            </label>
            <select
              {...register('time', { required: 'Time is required' })}
              className="input-field"
              disabled={!selectedDate || isLoading}
            >
              <option value="">Select a time slot</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {isLoading && (
              <p className="text-blue-500 text-sm mt-1">Loading available slots...</p>
            )}
            {selectedDate && !isLoading && availableSlots.length === 0 && (
              <p className="text-red-500 text-sm mt-1">No available slots for this date</p>
            )}
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service *
          </label>
          <select
            {...register('service', { required: 'Service is required' })}
            className="input-field"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Additional Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="input-field"
            placeholder="Any additional information or special requests..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Booking...
              </>
            ) : (
              'Create Booking'
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
