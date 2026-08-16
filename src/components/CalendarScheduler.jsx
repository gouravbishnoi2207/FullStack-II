import { memo, useCallback, useMemo, useState } from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const createCalendarDays = () => {
  const start = new Date();
  start.setDate(start.getDate() - 7);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
};

const samplePosts = [
  { id: 1, title: 'Launch Update', date: '2026-08-16', time: '10:00', platform: 'LinkedIn' },
  { id: 2, title: 'Product Sneak Peek', date: '2026-08-18', time: '14:30', platform: 'Instagram' },
  { id: 3, title: 'Weekly Summary', date: '2026-08-20', time: '09:00', platform: 'Twitter' },
];

const DayCell = memo(function DayCell({ date, isSelected, onSelect }) {
  const posts = useMemo(() => {
    const formatted = date.toISOString().split('T')[0];
    return samplePosts.filter((post) => post.date === formatted);
  }, [date]);

  return (
    <button
      type="button"
      className={`calendar-day ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <span className="calendar-date">{date.getDate()}</span>
      <div className="calendar-events">
        {posts.slice(0, 2).map((post) => (
          <span key={post.id} className="calendar-event">{post.title}</span>
        ))}
      </div>
    </button>
  );
});

function CalendarScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-08-16'));
  const calendarDays = useMemo(() => createCalendarDays(), []);

  const postsForSelectedDate = useMemo(() => {
    const formatted = selectedDate.toISOString().split('T')[0];
    return samplePosts.filter((post) => post.date === formatted);
  }, [selectedDate]);

  const handleSelectDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  return (
    <div className="calendar-card">
      <h3>Post Scheduler Calendar</h3>

      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}

        {calendarDays.map((date) => {
          const formatted = date.toISOString().split('T')[0];
          const isSelected = formatted === selectedDate.toISOString().split('T')[0];

          return (
            <DayCell
              key={formatted}
              date={date}
              isSelected={isSelected}
              onSelect={() => handleSelectDate(date)}
            />
          );
        })}
      </div>

      <div className="calendar-details">
        <h4>Scheduled Posts for {selectedDate.toDateString()}</h4>

        {postsForSelectedDate.length === 0 ? (
          <p>No posts scheduled for this date.</p>
        ) : (
          postsForSelectedDate.map((post) => (
            <div key={post.id} className="schedule-item">
              <strong>{post.title}</strong>
              <p>{post.platform}</p>
              <p>{post.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarScheduler;
