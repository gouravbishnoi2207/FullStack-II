import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarScheduler from './CalendarScheduler';

describe('CalendarScheduler', () => {
  it('renders the calendar title', () => {
    render(<CalendarScheduler />);

    expect(screen.getByText('Post Scheduler Calendar')).toBeInTheDocument();
  });

  it('shows scheduled posts for the selected date', () => {
    render(<CalendarScheduler />);

    const selectedDateButton = screen.getByRole('button', { name: /16/i });
    fireEvent.click(selectedDateButton);

    expect(screen.getAllByText('Launch Update').length).toBeGreaterThan(0);
  });
});
