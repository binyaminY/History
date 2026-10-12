import { useState } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { buildQuiz } from "../quiz/buildQuiz";
import Btn from "../components/Btn";
import LoadingCard from "../components/LoadingCard";
import SectionLabel from "../components/SectionLabel";

const POINTS = 2;

// A quiz made from the topic's own data: instant, works offline, and uses no AI.
export default function QuizScreen({ lang, events, onOpenEvent }) {
  const isHe = lang === "he";
  const tx = TX[lang];

  const [phase, setPhase] = useState("start");
  const [eventId, setEventId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qNum, setQNum] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const total = questions.length;
  const score = answers.filter(a => a.right).length * POINTS;
  const maxScore = total * POINTS;

  const startQuiz = async (id) => {
    setEventId(id); setPhase("loading");
    const mod = await import("../constants/faq/index.js");
    const event = events.find(x => x.id === id);
    const qs = buildQuiz({ lang, event, events, topicQuestions: (topic) => mod.topicQuestions(topic, lang) });
    setQuestions(qs); setQNum(0); setChosen(null); setAnswers([]); setShowReview(false);
    setPhase("active");
  };

  const q = questions[qNum];

  const selectOption = (idx) => {
    if (!q || chosen !== null) return;
    setChosen(idx);
    setAnswers(a => [...a, { question: q.question, options: q.options, correctIdx: q.correct, chosenIdx: idx, right: idx === q.correct, explanation: q.explanation }]);
  };

  const next = () => {
    if (qNum + 1 >= total) { setPhase("results"); return; }
    setQNum(qNum + 1); setChosen(null);
  };

  const reset = () => { setPhase("start"); setEventId(null); setQuestions([]); setQNum(0); setChosen(null); setAnswers([]); setShowReview(false); };

  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const emoji = pct >= 85 ? "🏆" : pct >= 65 ? "🎯" : pct >= 45 ? "📚" : "💡";
  const resultLabel = tx.quizResultLabels[pct >= 85 ? 3 : pct >= 65 ? 2 : pct >= 45 ? 1 : 0];
  const letters = isHe ? ["א", "ב", "ג", "ד"] : ["A", "B", "C", "D"];
  const wrong = answers.map((a, i) => ({ ...a, num: i + 1 })).filter(a => !a.right);
  const e = events.find(x => x.id === eventId);

  if (phase === "start") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <SectionLabel>{isHe ? "חידון" : "Quiz"}</SectionLabel>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.7rem", marginBottom:8 }}>{tx.quizTitle}</h2>
        <p style={{ color:T.textDim, fontSize:".88rem", lineHeight:1.7, marginBottom:24 }}>{tx.quizIntro}</p>
        <SectionLabel>{tx.quizPickLabel}</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10 }}>
          {events.map(ev => (
            <button key={ev.id} onClick={() => startQuiz(ev.id)} style={{
              background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
              padding:"14px 16px", cursor:"pointer", textAlign: isHe?"right":"left", fontFamily:"inherit", transition:"all .2s",
            }}>
              <div style={{ fontSize:".88rem", fontWeight:700, color:T.text, marginBottom:4 }}>{ev.name}</div>
              <div style={{ fontSize:".72rem", color:T.goldDim }}>📅 {ev.year}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (phase === "loading") return (
    <div style={{ flex:1, padding:"24px 28px" }}><div style={{ maxWidth:700, margin:"0 auto" }}><LoadingCard text={tx.quizLoadingText} /></div></div>
  );

  if (phase === "results") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:18, padding:"32px 28px", textAlign:"center" }}>
          <div style={{ fontSize:"3rem", marginBottom:12 }}>{emoji}</div>
          <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.4rem", marginBottom:8 }}>{resultLabel}</h2>
          <div style={{ fontSize:"2.5rem", fontWeight:900, color:T.gold, marginBottom:16 }}>{score}/{maxScore} · {pct}%</div>
          <p style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.8, textAlign: isHe?"right":"left" }}>{tx.quizSummary(answers.filter(a => a.right).length, total, e?.name)}</p>
          {wrong.length > 0 && (
            <Btn onClick={() => setShowReview(v => !v)} variant="secondary" style={{ marginTop:20, width:"100%" }}>
              {showReview ? tx.quizReviewHide : tx.quizReview}
            </Btn>
          )}
          {onOpenEvent && <Btn onClick={() => onOpenEvent(eventId)} variant="secondary" style={{ marginTop:12, width:"100%" }}>{tx.quizReadTopic}</Btn>}
          <Btn onClick={() => startQuiz(eventId)} variant="generate" style={{ marginTop:12 }}>{tx.quizAgain}</Btn>
          <Btn onClick={reset} variant="secondary" style={{ marginTop:12, width:"100%" }}>{tx.quizPickOther}</Btn>
        </div>
        {showReview && wrong.map((a, i) => (
          <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", marginTop:14, textAlign: isHe?"right":"left" }}>
            <div style={{ fontSize:".7rem", color:T.goldDim, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>{tx.quizQuestion} {a.num}</div>
            <div style={{ fontSize:".95rem", fontWeight:700, color:T.text, lineHeight:1.6, marginBottom:14 }}>{a.question}</div>
            <div style={{ fontSize:".7rem", color:T.textMuted, fontWeight:700, marginBottom:4 }}>{tx.quizYourAnswer}</div>
            <div style={{ fontSize:".88rem", color:T.textDim, lineHeight:1.7, background:T.surface2, borderRadius:10, padding:"10px 12px", marginBottom:12 }}>{a.options[a.chosenIdx]}</div>
            <div style={{ fontSize:".7rem", color:"#16a34a", fontWeight:700, marginBottom:4 }}>{tx.quizIdealAnswer}</div>
            <div style={{ fontSize:".88rem", color:T.text, lineHeight:1.7, background:"rgba(22,163,74,.08)", border:"1px solid rgba(22,163,74,.25)", borderRadius:10, padding:"10px 12px" }}>{a.options[a.correctIdx]}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const isLastQ = qNum + 1 >= total;
  const answered = chosen !== null;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <button onClick={reset} style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", fontSize:".78rem", color:T.textDim, cursor:"pointer", fontFamily:"inherit" }}>{tx.quizBack}</button>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4, minWidth:100 }}>
            <div style={{ height:6, background:T.surface3, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${((qNum + (answered ? 1 : 0)) / total) * 100}%`, background:`linear-gradient(90deg,${T.goldDim},${T.gold})`, borderRadius:3, transition:"width .4s ease" }} />
            </div>
            <div style={{ fontSize:".68rem", color:T.textMuted }}>{tx.quizQuestion} {qNum + 1} {tx.quizOf} {total}</div>
          </div>
          <div style={{ background:"rgba(37,99,235,.15)", border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"4px 12px", fontSize:".8rem", color:T.gold, fontWeight:700, whiteSpace:"nowrap" }}>{score}/{maxScore}</div>
        </div>

        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.1rem", color:T.gold, marginBottom:18, fontWeight:700 }}>{tx.quizOn}{e?.name}</div>

        <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"22px 24px", marginBottom:18 }}>
          <div style={{ fontSize:".72rem", color:T.goldDim, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>{tx.quizQuestion} {qNum + 1}</div>
          <div style={{ fontSize:"1rem", lineHeight:1.65, color:T.text, fontWeight:600 }}>{q.question}</div>
        </div>

        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correct;
          const isChosen = idx === chosen;
          const wrongChosen = answered && isChosen && !isCorrect;
          const showRight = answered && isCorrect;
          return (
            <button key={idx} onClick={() => selectOption(idx)} disabled={answered} style={{
              width:"100%", background: showRight ? "rgba(76,168,106,.1)" : wrongChosen ? "rgba(201,76,76,.1)" : T.surface,
              border:`1px solid ${showRight ? "#4ca86a" : wrongChosen ? T.red : T.border}`,
              borderRadius:11, padding:"14px 18px", cursor: answered ? "default" : "pointer",
              fontSize:".88rem", color: showRight ? "#4ca86a" : wrongChosen ? T.red : T.text, textAlign: isHe?"right":"left",
              fontFamily:"inherit", lineHeight:1.5, display:"flex", alignItems:"center", gap:12, marginBottom:10, transition:"all .2s",
            }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background: showRight ? "#4ca86a" : wrongChosen ? T.red : T.surface3, border:`1px solid ${T.border}`, fontSize:".75rem", fontWeight:700, display:"grid", placeItems:"center", flexShrink:0, color: (showRight||wrongChosen) ? "#fff" : T.textMuted }}>{letters[idx]}</div>
              <span>{opt}</span>
            </button>
          );
        })}

        {answered && (
          <>
            <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"20px 22px", marginTop:8 }}>
              <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{chosen === q.correct ? "✅" : "❌"}</div>
              <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, color: chosen === q.correct ? "#4ca86a" : T.red }}>{chosen === q.correct ? tx.quizCorrect : tx.quizWrong}</div>
              <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.75 }}>{q.explanation}</div>
            </div>
            <Btn onClick={next} variant="generate" style={{ marginTop:16 }}>{isLastQ ? tx.quizFinish : tx.quizNext}</Btn>
          </>
        )}
      </div>
    </div>
  );
}
