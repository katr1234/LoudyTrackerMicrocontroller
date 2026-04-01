import "../App.css";
import logoIcon from "../logo.jpg";
import infoIcon from "./icons/info.svg";
import headPhonesIcon from "./icons/headphones.svg";
import constructionIcon from "./icons/construction.svg";
import mediaOutputOffIcon from "./icons/media_output_off.svg";
import flowChartIcon from "./icons/flowchart.svg";
import settingsIcon from "./icons/settings.svg";
import InfoBtnIcon from "./icons/infoBtn.svg";

export default function Info() {
  const rows = [
    { dB: 0, Beispiel: "unvorstellbar leise", Kategorie: "vollkommend ungefährlich" },
    { dB: 10, Beispiel: "Blätterrascheln", Kategorie: "vollkommend ungefährlich" },
    { dB: 20, Beispiel: "Ruhe im Radiostudio", Kategorie: "vollkommend ungefährlich" },
    { dB: 25, Beispiel: "Atemgeräusch", Kategorie: "vollkommend ungefährlich" },
    { dB: 30, Beispiel: "Flüstern", Kategorie: "vollkommend ungefährlich" },
    { dB: 35, Beispiel: "Zimmerventilator", Kategorie: "vollkommend ungefährlich" },

    { dB: 40, Beispiel: "Konzentrationsstörungsschwelle", Kategorie: "ungefährlich, aber kann Konzentrationsstörung bedeuten" },
    { dB: 45, Beispiel: "ruhige Wohnung", Kategorie: "ungefährlich, aber kann Konzentrationsstörung bedeuten" },
    { dB: 50, Beispiel: "leise Radiomusik, Vogelgezwitscher", Kategorie: "ungefährlich, aber kann Konzentrationsstörung bedeuten" },
    { dB: 55, Beispiel: "Radio/TV in Zimmerlautstärke", Kategorie: "ungefährlich, aber kann Konzentrationsstörung bedeuten" },
    { dB: 60, Beispiel: "normales Gespräch", Kategorie: "ungefährlich, aber kann Konzentrationsstörung bedeuten" },

    { dB: 65, Beispiel: "Risikoerhöhung Herz- & Kreislauferkrankung", Kategorie: "meist ungefährlich, aber Risikoerhöhung von Erkrankungen" },
    { dB: 70, Beispiel: "Staubsauger, Haartrockner", Kategorie: "meist ungefährlich, aber Risikoerhöhung von Erkrankungen" },
    { dB: 75, Beispiel: "PKW", Kategorie: "meist ungefährlich, aber Risikoerhöhung von Erkrankungen" },
    { dB: 80, Beispiel: "starker Verkehr, LKW, Bohrerei", Kategorie: "meist ungefährlich, aber Risikoerhöhung von Erkrankungen" },

    { dB: 85, Beispiel: "unangenehm, bei längerer Einwirkung Gehörschaden", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 90, Beispiel: "schweres KFZ, Handschleifgerät", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 95, Beispiel: "Musik (Kopfhörer)", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 100, Beispiel: "Kreissäge, Diskothek", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 105, Beispiel: "Formel 1-Wagen, Schlagschrauber", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 110, Beispiel: "Kettensäge, Rockkonzert", Kategorie: "gefährlich, bei längerer Einwirkung" },
    { dB: 115, Beispiel: "Bleche hämmern", Kategorie: "gefährlich, bei längerer Einwirkung" },

    { dB: 120, Beispiel: "Schmerzgrenze", Kategorie: "sehr gefährlich schon bei kurzer Einwirkung" },
    { dB: 130, Beispiel: "Niethammer", Kategorie: "sehr gefährlich schon bei kurzer Einwirkung" },
    { dB: 140, Beispiel: "Flugzeugstart", Kategorie: "sehr gefährlich schon bei kurzer Einwirkung" },
    { dB: 150, Beispiel: "Schmiedehammer", Kategorie: "sehr gefährlich schon bei kurzer Einwirkung" },
    { dB: 160, Beispiel: "Geschützknall, Schuss", Kategorie: "sehr gefährlich schon bei kurzer Einwirkung" }
  ];

  const categoryClass = (k) => {
    if (k === "vollkommend ungefährlich") return "rowSafe";
    if (k === "ungefährlich, aber kann Konzentrationsstörung bedeuten") return "rowAttention";
    if (k === "meist ungefährlich, aber Risikoerhöhung von Erkrankungen") return "rowRisk";
    if (k === "gefährlich, bei längerer Einwirkung") return "rowDanger";
    if (k === "sehr gefährlich schon bei kurzer Einwirkung") return "rowVeryDanger";
    return "";
  };

  const rowSpanByIndex = (() => {
    const map = new Map();
    let i = 0;
    while (i < rows.length) {
      const k = rows[i].Kategorie;
      let j = i + 1;
      while (j < rows.length && rows[j].Kategorie === k) j++;
      map.set(i, j - i);
      i = j;
    }
    return map;
  })();

  return (
    <div className="page">
    
      <main className="content">
        <section className="card">
          <div className="cardHeader">
            <h2 className="sectionTitle">Dezibel-Referenzwerte</h2>
          </div>

          <p className="hint">
            * Ungefähre Richtwerte, abhängig von der Entfernung der Schallquelle
          </p>

          <div className="tableWrap">
            <table className="table" aria-label="DezibelTable">
              <thead>
                <tr>
                  <th>dB-Wert*</th>
                  <th>Beispiel</th>
                  <th>Kategorie</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.dB} className={categoryClass(r.Kategorie)}>
                    <td className="dbCell">{r.dB} dB</td>
                    <td>{r.Beispiel}</td>

                    {rowSpanByIndex.has(idx) ? (
                      <td className="kategorie" rowSpan={rowSpanByIndex.get(idx)}>
                        {r.Kategorie}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Maßnahmen zur Lärmreduktion</h2>
          </div>

          <div className="grid">
            <div className="box boxBlue">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={constructionIcon} alt="Bauliche und raumakustische Maßnahmen" /></span>
                <h3 className="boxTitle">Bauliche und raumakustische Maßnahmen</h3>
              </div>
              <ul className="list">
                <li>Einsatz von schallabsorbierenden Materialien (Akustikdecken, Wandpaneele, Teppiche)</li>
                <li>Einbau von Schallschutzfenstern und -türen</li>
                <li>Trennung lauter und leiser Arbeitsbereiche</li>
                <li>Raumteiler oder mobile Akustikwände</li>
                <li>Schalldämmende Bodenbeläge</li>
              </ul>
            </div>

            <div className="box boxGreen">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={mediaOutputOffIcon} alt="Maßnahmen an der Quelle" /></span>
                <h3 className="boxTitle">Maßnahmen an der Quelle</h3>
              </div>
              <ul className="list">
                <li>Austausch von lauten Gegenständen durch leisere Alternativen</li>
                <li>Vermeidung von unnötigen Geräuschen</li>
              </ul>
            </div>

            <div className="box boxPurple">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={flowChartIcon} alt="Maßnahmen betreffend Arbeitsmittel und Arbeitsvorgänge" /></span>
                <h3 className="boxTitle">Maßnahmen betreffend Arbeitsmittel und Arbeitsvorgänge</h3>
              </div>
              <ul className="list">
                <li>Optimierung der Arbeitsabläufe, um Lärmspitzen zu vermeiden</li>
                <li>Einsatz von Dämpfungselementen (Gummimatten, Schalldämmung)</li>
                <li>Schulung der Mitarbeitenden im Umgang mit Lärm</li>
              </ul>
            </div>

            <div className="box boxOrange">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={settingsIcon} alt="Technische und organisatorische Maßnahmen" /></span>
                <h3 className="boxTitle">Technische und organisatorische Maßnahmen</h3>
              </div>
              <ul className="list">
                <li>Einrichtung von Ruhe- oder Rückzugsräumen</li>
                <li>Lärmmessungen und regelmäßige Überprüfung der Belastung</li>
                <li>Einführung von Lärmschutzrichtlinien und Verhaltensregeln</li>
                <li>Lärmintensive Tätigkeiten zeitlich verlagern</li>
              </ul>
            </div>

            <div className="box boxRed">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={headPhonesIcon} alt="Auswahl von geeignetem Zubehör" /></span>
                <h3 className="boxTitle">Auswahl von geeignetem Zubehör</h3>
              </div>
              <ul className="list">
                <li>Persönliche Schutzausrüstung passend zur Tätigkeit auswählen</li>
                <li>Verwendung von Kopfhörern oder Ohrenstöpseln</li>
              </ul>
            </div>

            <div className="box boxInfo boxSpan2">
              <div className="boxTitleRow">
                <span className="boxIcon" aria-hidden="true"><img src={infoIcon} alt="Info" /></span>
                <h3 className="boxTitle">Wichtiger Gesundheitshinweis</h3>
              </div>
              <p className="infoText">
                Dauerhafter Lärm kann ernsthafte gesundheitliche Folgen haben, darunter Gehörschäden, Stress,
                Schlafstörungen und ein erhöhtes Risiko für Herz-Kreislauf-Erkrankungen. Nutzen Sie die empfohlenen
                Schutzmaßnahmen und achten Sie auf regelmäßige Pausen in ruhigen Bereichen. Bei anhaltender
                Lärmbelastung über 85 dB ist das Tragen von Gehörschutz unbedingt erforderlich.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">© Loudy Tracker Team 2026</footer>
    </div>
  );
}