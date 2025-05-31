import React, { useState } from 'react';

import {ArrowRight} from 'lucide-react';
import styles from './Mangement.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { Sidebar } from 'lucide-react';
import SidebarComponent from '../SidebarComponent';

export default function FancyTimeManagement() {
  const [group, setGroup] = useState('');
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  const groups = ['Group A', 'Group B', 'Group C'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  function addSession() {
    setError('');

    if (!group) {
      setError('Please select a group.');
      return;
    }
    if (!startTime || !endTime) {
      setError('Please select start and end times.');
      return;
    }
    if (endTime <= startTime) {
      setError('End time must be after start time.');
      return;
    }

    setSessions([
      ...sessions,
      { id: Date.now(), group, day, startTime, endTime }
    ]);

    setStartTime('');
    setEndTime('');
  }

  const navigate = useNavigate();
    const goToDashboard = () => {
      navigate("/admin/dashboard");
    }
  

  return (
    <div>
        <Navbar />
        <SidebarComponent />
         <div className={styles.timeManagementContainer}>
      <h2 className={styles.dashboardTitle}>Time Management Board</h2>

      <div className={styles.formRow}>
        <select
          className={styles.selectInput}
          value={group}
          onChange={e => setGroup(e.target.value)}
        >
          <option value="">Select Group</option>
          {groups.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          className={styles.selectInput}
          value={day}
          onChange={e => setDay(e.target.value)}
        >
          {days.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <input
          className={styles.timeInput}
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          aria-label="Start Time"
        />

        <input
          className={styles.timeInput}
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          aria-label="End Time"
        />

        <button
          className={styles.btnPrimary}
          onClick={addSession}
          disabled={!group || !startTime || !endTime}
          aria-disabled={!group || !startTime || !endTime}
        >
          Add Session
        </button>
         <button
                onClick={() => {goToDashboard()}}
                className={styles.btnPrimary}
              >
                <ArrowRight size={20} />
                Retour
              </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <table className={styles.sessionsTable}>
        <thead>
          <tr>
            <th>Group</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id}>
              <td>{s.group}</td>
              <td>{s.day}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
            </tr>
          ))}
          {sessions.length === 0 && (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No sessions added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    </div>
   
  );
}
