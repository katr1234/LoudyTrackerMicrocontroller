import { useEffect, useMemo, useState } from "react";
import "../App.css";
import chartIcon from "./icons/chart.svg";
import emergencyIcon from "./icons/emergency.svg";
import avgIcon from "./icons/avg_time.svg";
import scoreIcon from "./icons/score.svg";

// Test-API-Endpunkt muss später durch echten Endpunkt ersetzt werden
const API_URL = "/sensordata/hour_mock";

function getStatus(value) {
  if (value <= 60) return { label: "Normalbereich", level: "green" };
  if (value <= 80) return { label: "kritischer Bereich", level: "yellow" };
  return { label: "Risikoerhöhung", level: "red" };
}

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (!cancelled) setData(Array.isArray(json) ? json : []);
      } catch (e) {
        if (!cancelled) setError(String(e?.message || e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    const id = setInterval(load, 5000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const stats = useMemo(() => {
    if (!data.length) {
      return {
        latestValue: null,
        latestTimestamp: null,
        status: { label: "—", level: "neutral" },
        avg1h: null,
        max1h: null,
        count1h: 0,
      };
    }

    const latest = data.reduce((acc, cur) =>
      cur.timestamp > acc.timestamp ? cur : acc
    );

    const latestValue = Number(latest.value);
    const status = Number.isFinite(latestValue)
      ? getStatus(latestValue)
      : { label: "—", level: "neutral" };

    const nowSec = Math.floor(Date.now() / 1000);
    const oneHourAgo = nowSec - 60 * 60;

    const last1h = data
      .filter((p) => typeof p.timestamp === "number" && p.timestamp >= oneHourAgo && p.timestamp <= nowSec)
      .map((p) => Number(p.value))
      .filter((v) => Number.isFinite(v));

    const count1h = last1h.length;
    const avg1h = count1h ? last1h.reduce((s, v) => s + v, 0) / count1h : null;
    const max1h = count1h ? Math.max(...last1h) : null;

    return {
      latestValue,
      latestTimestamp: latest.timestamp,
      status,
      avg1h,
      max1h,
      count1h,
    };
  }, [data]);

  const formatDb = (v) => (v == null ? "—" : `${v.toFixed(1)} dB`);
  const formatDbInt = (v) => (v == null ? "—" : `${Math.round(v)} dB`);

  const statusClass =
    stats.status.level === "green"
      ? "statusGreen"
      : stats.status.level === "yellow"
      ? "statusYellow"
      : stats.status.level === "red"
      ? "statusRed"
      : "statusNeutral";

  return (
    <div className="page">
      <main className="content">
        {error && <div className="errorBox">Fehler: {error}</div>}
        {loading && !data.length && <div>Lade Daten…</div>}

        <div className="grid">
          <div className="box boxInfo">
            <div className="boxTitleRow">
              <div className="boxIcon" aria-hidden="true">
                <img src={chartIcon} alt="Chart Icon" />
              </div>
              <h3 className="boxTitle">Zuletzt gemessener Pegel</h3>
            </div>
            <div className="dbCell">{formatDbInt(stats.latestValue)}</div>
          </div>

          <div className="box">
            <div className="boxTitleRow">
              <div className="boxIcon" aria-hidden="true">
                <img src={emergencyIcon} alt="Emergency Icon" />
              </div>
              <h3 className="boxTitle">Status</h3>
            </div>
            <div className={`dbCell ${statusClass}`}>{stats.status.label}</div>
          </div>

          <div className="box">
            <div className="boxTitleRow">
              <div className="boxIcon" aria-hidden="true">
                <img src={avgIcon} alt="Average Time Icon" />
              </div>
              <h3 className="boxTitle">Durchschnitt (1h)</h3>
            </div>
            <div className="dbCell">{formatDb(stats.avg1h)}</div>
          </div>

          <div className="box">
            <div className="boxTitleRow">
              <div className="boxIcon" aria-hidden="true">
                <img src={scoreIcon} alt="Score Icon" />
              </div>
              <h3 className="boxTitle">Maximum (1h)</h3>
            </div>
            <div className="dbCell">{formatDb(stats.max1h)}</div>
          </div>
        </div>
      </main>

      <footer className="footer">© Loudy Tracker Team 2026</footer>
    </div>
  );
}