import React, { useState } from 'react';
import axios from 'axios';

function MonitorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/stats');
      setStats(res.data);
    } catch (err) {
      alert('שגיאה בטעינת הנתונים');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>מוניטור חווית לקוח</h2>
      <button onClick={fetchStats} disabled={loading} style={{marginBottom: 16}}>
        {loading ? 'טוען...' : 'רענן'}
      </button>
      {stats && (
        <>
          <div>סה\"כ כניסות: {stats.totalVisits}</div>
          <div>סה\"כ הרשמות: {stats.users.length}</div>
          <h3>משתמשים מובילים (שיתופים):</h3>
          <table>
            <thead>
              <tr>
                <th>שם</th>
                <th>מייל</th>
                <th>מס' שיתופים</th>
                <th>כניסות מהלינק</th>
              </tr>
            </thead>
            <tbody>
              {stats.users
                .sort((a, b) => b.referrals.length - a.referrals.length)
                .map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.referrals.length}</td>
                  <td>{user.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default MonitorDashboard;