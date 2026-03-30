import { useState } from "react";
import T from "../constants/theme";
import TX from "../constants/translations";
import { callClaude } from "../api/claude";
import Btn from "../components/Btn";
import LoadingCard from "../components/LoadingCard";
import SectionLabel from "../components/SectionLabel";

export default function QuizScreen({ lang, events, level }) {
  const isHe = lang === "he";
  const tx = TX[lang];
  const TOTAL_Q = 6;
  const Q_TYPES = ["mc","mc","mc","mc","open","open"];

  const [phase, setPhase] = useState("start");
  const [eventId, setEventId] = useState(null);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qPhase, setQPhase] = useState("loading");
  const [feedback, setFeedback] = useState(null);
  const [openInput, setOpenInput] = useState("");
  const [resultAnalysis, setResultAnalysis] = useState("");

  const levelInstr = {
    beginner: isHe ? "Respond ONLY in Hebrew. Simple language for a 14-year-old." : "Respond in English. Simple language for a 14-year-old.",
    intermediate: isHe ? "Respond ONLY in Hebrew. High school level." : "Respond in English. High school level.",
    advanced: isHe ? "Respond ONLY in Hebrew. Academic level." : "Respond in English. Academic level.",
  }[level] || "";

  const startQuiz = (id) => {
    setEventId(id); setQNum(0); setScore(0); setMaxScore(0);
    setAnswers([]); setPhase("active"); setQPhase("loading");
    loadQuestion(id, 0, []);
  };

  const loadQuestion = async (eid, num, prevAnswers) => {
    setQPhase("loading"); setCurrentQ(null); setFeedback(null); setOpenInput("");
    const e = events.find(x => x.id === eid);
    const qtype = Q_TYPES[num];
    const prevQs = prevAnswers.map(a => a.question).join(" | ");

    const noQuotes = "IMPORTANT: Do NOT use double-quote characters inside any text values.";
    const systemPrompt = qtype === "open"
      ? `You are a history quiz generator. ${levelInstr} ${noQuotes} Generate ONE open-ended question. Return ONLY valid JSON with no extra text: {"question":"...","ideal_answer":"...","key_points":["...","...","..."]}`
      : `You are a history quiz generator. ${levelInstr} ${noQuotes} Generate ONE multiple-choice question. Return ONLY valid JSON with no extra text: {"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explanation":"2-3 sentences."} Don't repeat: ${prevQs||"none"}`;

    try {
      const raw = await callClaude(
        systemPrompt,
        `Question ${num+1} of ${TOTAL_Q} about: ${e?.name} (${e?.year}). Context: ${e?.desc}`,
        600
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setCurrentQ({ ...parsed, type: qtype });
      setQPhase("question");
    } catch {
      setCurrentQ({ question: tx.quizError, type: qtype, options:[], correct:0, explanation:"" });
      setQPhase("question");
    }
  };

  const selectOption = (idx) => {
    if (!currentQ) return;
    const isRight = idx === currentQ.correct;
    const gained = isRight ? 2 : 0;
    setScore(s => s + gained); setMaxScore(s => s + 2);
    setAnswers(a => [...a, { question:currentQ.question, type:"mc", correct:isRight }]);
    setFeedback({ isRight, explanation: currentQ.explanation, correctIdx: currentQ.correct, chosen: idx });
    setQPhase("feedback");
  };

  const submitOpen = async () => {
    if (!openInput.trim() || !currentQ) return;
    setQPhase("grading");
    try {
      const raw = await callClaude(
        `You are a history teacher grading an open answer. ${levelInstr} Return ONLY valid JSON: {"score":0,"max":3,"feedback":"2-3 sentences of specific encouraging feedback."}  Score: 3=excellent, 2=good, 1=partial, 0=off-topic.`,
        `Question: ${currentQ.question}\nKey points: ${(currentQ.key_points||[]).join(", ")}\nStudent: ${openInput}`,
        400
      );
      const graded = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setScore(s => s + graded.score); setMaxScore(s => s + (graded.max||3));
      setAnswers(a => [...a, { question:currentQ.question, type:"open", score:graded.score, max:graded.max||3 }]);
      setFeedback({ open:true, score:graded.score, max:graded.max||3, feedbackText:graded.feedback });
      setQPhase("feedback");
    } catch {
      setMaxScore(s => s + 3);
      setAnswers(a => [...a, { question:currentQ.question, type:"open", score:0, max:3 }]);
      setQPhase("feedback");
      setFeedback({ open:true, score:0, max:3, feedbackText: tx.error });
    }
  };

  const nextQuestion = () => {
    const next = qNum + 1;
    if (next >= TOTAL_Q) { finishQuiz(); return; }
    setQNum(next);
    loadQuestion(eventId, next, answers);
  };

  const finishQuiz = async () => {
    setPhase("results"); setResultAnalysis("");
    const e = events.find(x => x.id === eventId);
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const sum = answers.map((a,i) => a.type==="mc" ? `Q${i+1}(MC):${a.correct?"ok":"wrong"}` : `Q${i+1}(Open):${a.score}/${a.max}`).join(", ");
    try {
      const fb = await callClaude(
        `You are a history teacher giving final quiz feedback. ${levelInstr} Be encouraging, mention 1-2 strengths and 1 area to study. 3-4 sentences max.`,
        `Student took quiz on: ${e?.name}. Score: ${score}/${maxScore} (${pct}%). Results: ${sum}`,
        400
      );
      setResultAnalysis(fb);
    } catch {
      setResultAnalysis(tx.error);
    }
  };

  const reset = () => { setPhase("start"); setEventId(null); setQNum(0); setScore(0); setMaxScore(0); setAnswers([]); setCurrentQ(null); setFeedback(null); setResultAnalysis(""); };

  const pct = maxScore > 0 ? Math.round((score/maxScore)*100) : 0;
  const emoji = pct>=85?"🏆":pct>=65?"🎯":pct>=45?"📚":"💡";
  const resultLabel = tx.quizResultLabels[pct>=85?3:pct>=65?2:pct>=45?1:0];
  const letters = isHe ? ["א","ב","ג","ד"] : ["A","B","C","D"];

  if (phase === "start") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <SectionLabel>{isHe ? "מערכת שאלונים AI" : "AI Quiz System"}</SectionLabel>
        <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.7rem", marginBottom:8 }}>{tx.quizTitle}</h2>
        <p style={{ color:T.textDim, fontSize:".88rem", lineHeight:1.7, marginBottom:24 }}>{tx.quizIntro}</p>
        <SectionLabel>{tx.quizPickLabel}</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10 }}>
          {events.map(e => (
            <button key={e.id} onClick={() => startQuiz(e.id)} style={{
              background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
              padding:"14px 16px", cursor:"pointer", textAlign: isHe?"right":"left", fontFamily:"inherit", transition:"all .2s",
            }}>
              <div style={{ fontSize:".88rem", fontWeight:700, color:T.text, marginBottom:4 }}>{e.name}</div>
              <div style={{ fontSize:".72rem", color:T.goldDim }}>📅 {e.year}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (phase === "results") return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:18, padding:"32px 28px", textAlign:"center" }}>
          <div style={{ fontSize:"3rem", marginBottom:12 }}>{emoji}</div>
          <h2 style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.4rem", marginBottom:8 }}>{resultLabel}</h2>
          <div style={{ fontSize:"2.5rem", fontWeight:900, color:T.gold, marginBottom:16 }}>{score}/{maxScore} · {pct}%</div>
          {resultAnalysis
            ? <p style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.8, textAlign: isHe?"right":"left" }}>{resultAnalysis}</p>
            : <LoadingCard text={tx.quizAnalyzing} />
          }
          <Btn onClick={reset} variant="generate" style={{ marginTop:20 }}>{tx.quizAgain}</Btn>
        </div>
      </div>
    </div>
  );

  const e = events.find(x => x.id === eventId);
  const qtype = Q_TYPES[qNum];
  const isLastQ = qNum + 1 >= TOTAL_Q;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <button onClick={reset} style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", fontSize:".78rem", color:T.textDim, cursor:"pointer", fontFamily:"inherit" }}>{tx.quizBack}</button>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4, minWidth:100 }}>
            <div style={{ height:6, background:T.surface3, borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(qNum/TOTAL_Q)*100}%`, background:`linear-gradient(90deg,${T.goldDim},${T.gold})`, borderRadius:3, transition:"width .5s ease" }} />
            </div>
            <div style={{ fontSize:".68rem", color:T.textMuted }}>{tx.quizQuestion} {qNum+1} {tx.quizOf} {TOTAL_Q} · {qtype==="open" ? tx.quizOpen : tx.quizMC}</div>
          </div>
          <div style={{ background:"rgba(201,168,76,.15)", border:`1px solid ${T.borderStrong}`, borderRadius:20, padding:"4px 12px", fontSize:".8rem", color:T.gold, fontWeight:700, whiteSpace:"nowrap" }}>{score}/{maxScore}</div>
        </div>

        <div style={{ fontFamily:"'Comfortaa',sans-serif", fontSize:"1.1rem", color:T.gold, marginBottom:18, fontWeight:700 }}>{tx.quizOn}{e?.name}</div>

        {qPhase === "loading" && <LoadingCard text={tx.quizLoadingText} sub={qtype==="open" ? tx.quizLoadingSubOpen : tx.quizLoadingSubMC} />}

        {(qPhase === "question" || qPhase === "feedback" || qPhase === "grading") && currentQ && (
          <>
            <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"22px 24px", marginBottom:18 }}>
              <div style={{ fontSize:".72rem", color:T.goldDim, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>{tx.quizQuestion} {qNum+1}</div>
              <div style={{ fontSize:"1rem", lineHeight:1.65, color:T.text, fontWeight:600 }}>{currentQ.question}</div>
            </div>

            {currentQ.type === "open" ? (
              qPhase === "question" ? (
                <>
                  <textarea
                    value={openInput} onChange={e => setOpenInput(e.target.value)}
                    rows={4} placeholder={tx.quizOpenPlaceholder}
                    style={{ width:"100%", background:T.surface2, border:`1px solid ${T.borderStrong}`, borderRadius:12, padding:"14px 16px", color:T.text, fontFamily:"inherit", fontSize:"16px", lineHeight:1.7, resize:"vertical", minHeight:100, outline:"none", textAlign: isHe?"right":"left" }}
                  />
                  <Btn onClick={submitOpen} variant="generate" style={{ marginTop:12 }}>{tx.quizSubmit}</Btn>
                </>
              ) : qPhase === "grading" ? (
                <LoadingCard text={tx.quizGrading} />
              ) : null
            ) : (
              qPhase === "question" && (currentQ.options||[]).map((opt, idx) => (
                <button key={idx} onClick={() => selectOption(idx)} style={{
                  width:"100%", background:T.surface, border:`1px solid ${T.border}`,
                  borderRadius:11, padding:"14px 18px", cursor:"pointer",
                  fontSize:".88rem", color:T.text, textAlign: isHe?"right":"left",
                  fontFamily:"inherit", lineHeight:1.5, display:"flex", alignItems:"center", gap:12, marginBottom:10, transition:"all .2s",
                }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:T.surface3, border:`1px solid ${T.border}`, fontSize:".75rem", fontWeight:700, display:"grid", placeItems:"center", flexShrink:0, color:T.textMuted }}>{letters[idx]}</div>
                  <span>{opt.replace(/^[A-Da-d]\)\s*/,"").replace(/^[א-ד]\)\s*/,"")}</span>
                </button>
              ))
            )}

            {qPhase === "feedback" && feedback && (
              <>
                {!feedback.open ? (
                  <>
                    {(currentQ.options||[]).map((opt, idx) => {
                      const isCorrect = idx === feedback.correctIdx;
                      const isChosen = idx === feedback.chosen;
                      const wrongChosen = isChosen && !isCorrect;
                      return (
                        <div key={idx} style={{
                          width:"100%", background: isCorrect ? "rgba(76,168,106,.1)" : wrongChosen ? "rgba(201,76,76,.1)" : T.surface,
                          border:`1px solid ${isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.border}`,
                          borderRadius:11, padding:"14px 18px",
                          fontSize:".88rem", color: isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.textDim,
                          textAlign: isHe?"right":"left", display:"flex", alignItems:"center", gap:12, marginBottom:10,
                        }}>
                          <div style={{ width:26, height:26, borderRadius:"50%", background: isCorrect ? "#4ca86a" : wrongChosen ? T.red : T.surface3, fontSize:".75rem", fontWeight:700, display:"grid", placeItems:"center", flexShrink:0, color: (isCorrect||wrongChosen) ? "#fff" : T.textMuted }}>{letters[idx]}</div>
                          <span>{opt.replace(/^[A-Da-d]\)\s*/,"").replace(/^[א-ד]\)\s*/,"")}</span>
                        </div>
                      );
                    })}
                    <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"20px 22px", marginTop:8 }}>
                      <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{feedback.isRight ? "✅" : "❌"}</div>
                      <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, color: feedback.isRight ? "#4ca86a" : T.red }}>{feedback.isRight ? tx.quizCorrect : tx.quizWrong}</div>
                      <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.75 }}>{feedback.explanation}</div>
                    </div>
                  </>
                ) : (
                  <div style={{ background:T.surface, border:`1px solid ${T.borderStrong}`, borderRadius:14, padding:"20px 22px" }}>
                    <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{feedback.score >= 2 ? "✅" : feedback.score === 1 ? "🟡" : "❌"}</div>
                    <div style={{ fontSize:"1rem", fontWeight:700, marginBottom:10, color: feedback.score >= 2 ? "#4ca86a" : T.red }}>{["⭐","⭐⭐","⭐⭐⭐"][Math.max(0,feedback.score-1)] || "—"} {feedback.score}/{feedback.max} {tx.quizPoints}</div>
                    <div style={{ color:T.textDim, fontSize:".87rem", lineHeight:1.75 }}>{feedback.feedbackText}</div>
                  </div>
                )}
                <Btn onClick={nextQuestion} variant="generate" style={{ marginTop:16 }}>{isLastQ ? tx.quizFinish : tx.quizNext}</Btn>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
