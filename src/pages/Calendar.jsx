import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    color: '#3b82f6'
  });
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents).map(event => ({
          ...event,
          date: format(new Date(event.date), 'yyyy-MM-dd')
        })));
      } catch (error) {
        console.error('Failed to parse saved events', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleAddEvent = () => {
    if (newEvent.title.trim()) {
      setEvents([...events, {
        id: Date.now(),
        ...newEvent,
        date: format(new Date(newEvent.date), 'yyyy-MM-dd')
      }]);
      setNewEvent({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        color: '#3b82f6'
      });
      setShowModal(false);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleClearAllEvents = () => {
    if (window.confirm('Are you sure you want to delete all events?')) {
      setEvents([]);
    }
  };

  const getEventsForDay = (day) => {
    const dayEvents = events.filter(event =>
      isSameDay(new Date(event.date), day)
    );
    return filterText.trim()
      ? dayEvents.filter(e => e.title.toLowerCase().includes(filterText.toLowerCase()))
      : dayEvents;
  };

  const getAllFilteredEvents = () => {
    return filterText.trim()
      ? events.filter(e => e.title.toLowerCase().includes(filterText.toLowerCase()))
      : events;
  };

  return (
    <div className="p-2 md:p-4 max-w-6xl mx-auto mt-15">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold mb-2">Calendar</h1>

        <div className="flex flex-col md:flex-row w-full md:w-auto gap-2">
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm md:text-base dark:text-black"
            >
              ←
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm md:text-base dark:text-black"
            >
              →
            </button>
          </div>

<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter..."
              className="border p-1 md:p-2 rounded w-full md:w-48 text-sm md:text-base dark:bg-white dark:text-black"
            />
            {events.length > 0 && (
              <button
                onClick={handleClearAllEvents}
                className="px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm md:text-base whitespace-nowrap"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base whitespace-nowrap"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-3 md:mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

<div className="grid grid-cols-7 gap-[1px] sm:gap-1 text-xs sm:text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
  <div key={i} className="text-center font-semibold py-1 sm:py-2 text-[10px] sm:text-xs md:text-sm">
    {isMobile ? day.charAt(0) : day}
  </div>
))}

        {daysInMonth.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={i}
className={`min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 border rounded-lg text-[11px] sm:text-sm dark:text-black dark:bg-white 
                 ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start">
                <span className={`${isToday ? 'font-bold text-blue-500' : ''}`}>
                  {format(day, 'd')}
                </span>
                {isCurrentMonth && (
                  <button
                    onClick={() => {
                      setNewEvent(prev => ({ ...prev, date: format(day, 'yyyy-MM-dd') }));
                      setShowModal(true);
                    }}
                    className="text-gray-500 hover:text-blue-500 text-xs"
                  >
                    +
                  </button>
                )}
              </div>
              <div className="mt-0.5 space-y-0.5 overflow-y-auto max-h-10 md:max-h-20">
                {dayEvents.slice(0, isMobile ? 1 : 3).map(event => (
                  <div
                    key={event.id}
                    className="p-0.5 rounded truncate"
                    style={{ backgroundColor: event.color + '20', borderLeft: `2px solid ${event.color}` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{isMobile ? '' : event.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                {dayEvents.length > (isMobile ? 1 : 3) && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - (isMobile ? 1 : 3)} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(!isMobile || !filterText.trim()) && (
        <div className="mt-4 md:mt-8">
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <h3 className="text-base md:text-lg font-semibold">
              {filterText.trim() ? 'Filtered Events' : 'All Events'}
            </h3>
            <div className="text-xs md:text-sm text-gray-500">
              {events.length} event{events.length !== 1 ? 's' : ''}
            </div>
          </div>
          {getAllFilteredEvents().length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base">
              {filterText.trim() ? 'No matches' : 'No events'}
            </p>
          ) : (
            <ul className="space-y-1 md:space-y-2">
              {getAllFilteredEvents().map(event => (
                <li
                  key={event.id}
                  className="p-2 md:p-3 border rounded-lg flex justify-between items-center"
                  style={{ borderLeft: `3px solid ${event.color}` }}
                >
                  <div className="truncate">
                    <div className="font-medium text-sm md:text-base">{event.title}</div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700 text-sm md:text-base"
                  >
                    {isMobile ? '×' : 'Delete'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Add New Event</h3>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full border p-2 rounded text-sm md:text-base"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full border p-2 rounded text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Color</label>
                  <div className="flex space-x-2">
                    {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(color => (
                      <div
                        key={color}
                        onClick={() => setNewEvent({ ...newEvent, color })}
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full cursor-pointer ${newEvent.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 md:space-x-3 mt-4 md:mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 md:px-4 md:py-2 border rounded-lg hover:bg-gray-100 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;