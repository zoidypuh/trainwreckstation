import React, { useState, useEffect, useRef } from 'react';
import './EventsTable.css';

const EventsTable = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Real venues from popular DJ events around the world
  const events = [
    { date: '2025-03-15', venue: 'Petco Park', city: 'San Diego, CA' },
    { date: '2025-04-22', venue: 'Los Angeles Convention Center', city: 'Los Angeles, CA' },
    { date: '2025-05-08', venue: 'Paris Expo Porte de Versailles', city: 'Paris, France' },
    { date: '2025-06-17', venue: 'Las Vegas Motor Speedway', city: 'Las Vegas, NV' },
    { date: '2025-07-11', venue: 'Parco Dora', city: 'Turin, Italy' },
    { date: '2025-08-29', venue: 'Johan Cruijff ArenA', city: 'Amsterdam, Netherlands' },
    { date: '2025-09-13', venue: 'Tacoma Dome', city: 'Tacoma, WA' },
    { date: '2025-10-24', venue: 'Pennsylvania Convention Center', city: 'Philadelphia, PA' },
    { date: '2025-11-07', venue: 'Dallas Market Hall', city: 'Dallas, TX' },
    { date: '2025-12-31', venue: 'Colorado Convention Center', city: 'Denver, CO' },
    { date: '2026-01-16', venue: 'NOS Event Center', city: 'San Bernardino, CA' },
    { date: '2026-02-20', venue: 'Phoenix Raceway', city: 'Phoenix, AZ' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div ref={sectionRef} className={`events-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="events-title">NEXT EVENTS</h2>
        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Venue</th>
                <th>City</th>
                <th>Tickets</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="event-row" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="date-cell">{formatDate(event.date)}</td>
                  <td className="venue-cell">{event.venue}</td>
                  <td className="city-cell">{event.city}</td>
                  <td className="ticket-cell">
                    <a href="#" className="ticket-link" onClick={(e) => e.preventDefault()}>
                      Buy tickets here..
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsTable; 