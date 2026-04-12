import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function CareerEvents() {
  const { studentProfile, careerEvents, registerForEvent, addNotification } = useCareerService();

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (studentProfile) {
      registerForEvent(eventId, studentProfile.id);
      addNotification({
        id: crypto.randomUUID(),
        userId: studentProfile.id,
        type: 'event_announcement',
        title: 'Event Registration Confirmed',
        message: `You've successfully registered for ${eventTitle}`,
        date: new Date().toISOString(),
        read: false,
      });
    }
  };

  const approvedEvents = careerEvents.filter(e => e.status === 'approved');
  const registeredEvents = approvedEvents.filter(e => 
    studentProfile && e.registeredStudents.includes(studentProfile.id)
  );
  const availableEvents = approvedEvents.filter(e => 
    !studentProfile || !e.registeredStudents.includes(studentProfile.id)
  );

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'job_fair': return 'bg-blue-100 text-blue-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'networking': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEventType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Career Events & Workshops</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!studentProfile && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              Please <Link to="/student/profile" className="underline font-medium">complete your profile</Link> to register for events.
            </p>
          </div>
        )}

        {/* Registered Events */}
        {registeredEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">My Registered Events</h2>
            <div className="grid gap-4">
              {registeredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                          {formatEventType(event.type)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{event.registeredStudents.length} / {event.capacity} registered</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle className="w-5 h-5" />
                      <span>Registered</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Organizer:</span> {event.organizer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Events */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {registeredEvents.length > 0 ? 'Other Available Events' : 'Upcoming Events'}
          </h2>
          {availableEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming events available</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {availableEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                          {formatEventType(event.type)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{event.registeredStudents.length} / {event.capacity} registered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Organizer:</span> {event.organizer}
                    </p>
                    {studentProfile && (
                      <button
                        onClick={() => handleRegister(event.id, event.title)}
                        disabled={event.registeredStudents.length >= event.capacity}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          event.registeredStudents.length >= event.capacity
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {event.registeredStudents.length >= event.capacity ? 'Event Full' : 'Register Now'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
