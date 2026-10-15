import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

const COLORS = ["#8b7be0", "#4fae82", "#ee9650", "#4a86d8", "#e0709f", "#43819c", "#7fba55", "#c06fd0"];
const pad = (n) => String(n).padStart(2, "0");
const key = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const wdF = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const moF = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const clean = (s) => s.replace(".", "");
const getDays = (now) => {
  const off = (now.getDay() + 6) % 7;
  return [...Array(8)].map((_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() - off + i));
};

const Svg = ({ children }) => <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
const PaletteIcon = () => (
  <Svg>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4-4-7-9-7Z" />
    <circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" />
  </Svg>
);
const LogoutIcon = () => <Svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Svg>;
const PinIcon = () => (
  <Svg><path d="m15 4 5 5-3 1-3 3 .5 4-1.5 1.5-3.5-3.5L5 20l-1-1 4.5-4.5L5 11l1.5-1.5 4 .5 3-3z" /></Svg>
);

export default function Home() {
  const router = useRouter();
  const [now, setNow] = useState(null);
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const n = new Date();
    const days = getDays(n);
    setNow(n);

    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { router.replace("/login"); return; }
      setUser(s.session.user);

      const [g, t] = await Promise.all([
        supabase.from("goals").select("*").order("created_at"),
        supabase.from("tasks").select("*").gte("day", key(days[0])).lte("day", key(days[7])).order("created_at"),
      ]);
      if (g.error || t.error) {
        setError("Não foi possível carregar os dados. Confira as chaves do Supabase.");
        console.error(g.error || t.error);
        return;
      }
      setGoals(g.data);
      const byDay = {};
      t.data.forEach((x) => (byDay[x.day] = [...(byDay[x.day] || []), x]));
      setTasks(byDay);
    })();
  }, []);

  if (!now || !user) return null;
  const days = getDays(now);
  const fail = (e) => { console.error(e); setError("Erro ao salvar. Tente de novo."); };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  // ----- metas -----
  const addGoal = async (text) => {
    const { data, error } = await supabase.from("goals").insert({ text }).select().single();
    if (error) return fail(error);
    setGoals((g) => [...g, data]);
  };
  const toggleGoal = async (goal) => {
    setGoals((g) => g.map((x) => (x.id === goal.id ? { ...x, done: !x.done } : x)));
    const { error } = await supabase.from("goals").update({ done: !goal.done }).eq("id", goal.id);
    if (error) fail(error);
  };
  const deleteGoal = async (id) => {
    setGoals((g) => g.filter((x) => x.id !== id));
    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) fail(error);
  };

  // ----- tarefas -----
  const addTask = async (day, text) => {
    const { data, error } = await supabase.from("tasks").insert({ day, text }).select().single();
    if (error) return fail(error);
    setTasks((t) => ({ ...t, [day]: [...(t[day] || []), data] }));
  };
  const toggleTask = async (day, task) => {
    setTasks((t) => ({ ...t, [day]: t[day].map((x) => (x.id === task.id ? { ...x, done: !x.done } : x)) }));
    const { error } = await supabase.from("tasks").update({ done: !task.done }).eq("id", task.id);
    if (error) fail(error);
  };
  const deleteTask = async (day, id) => {
    setTasks((t) => ({ ...t, [day]: t[day].filter((x) => x.id !== id) }));
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) fail(error);
  };

  const onEnter = (e, fn) => {
    const v = e.target.value.trim();
    if (e.key !== "Enter" || !v) return;
    fn(v);
    e.target.value = "";
  };
  const toggleTheme = () => {
    const r = document.documentElement;
    const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    r.dataset.theme = dark ? "light" : "dark";
  };

  return (
    <>
      <Head>
        <title>Taskio</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <div className="logo">
          Taskio
          <button onClick={toggleTheme} aria-label="Alternar tema claro e escuro"><PaletteIcon /></button>
        </div>
        <button onClick={logout} aria-label="Sair da conta" title="Sair"><LogoutIcon /></button>
      </header>

      <main>
        {error && <p role="alert" style={{ color: "#d6453d", marginTop: 0 }}>{error}</p>}

        <section className="goals">
          <h2><PinIcon /> Metas da semana</h2>
          <div className="chips">
            {goals.map((g) => (
              <div key={g.id} className={`chip ${g.done ? "done" : ""}`}>
                <button className="star" aria-label="Marcar meta" onClick={() => toggleGoal(g)}>★</button>
                <span className="t">{g.text}</span>
                <button className="x" aria-label="Excluir meta" onClick={() => deleteGoal(g.id)}>×</button>
              </div>
            ))}
            <div className="chip add">
              <input placeholder="+ Nova meta" maxLength={60} aria-label="Nova meta"
                onKeyDown={(e) => onEnter(e, addGoal)} />
            </div>
          </div>
        </section>

        <section className="week">
          {days.map((d, i) => {
            const k = key(d);
            const list = tasks[k] || [];
            const done = list.filter((t) => t.done).length;
            const today = k === key(now);
            return (
              <article key={k} className={`day ${today ? "today" : ""}`} style={{ "--c": COLORS[i] }}>
                <div className="head">
                  <div>
                    <div className="wd">{clean(wdF.format(d))}</div>
                    <div className="num">{d.getDate()}</div>
                    <div className="mo">{clean(moF.format(d))}</div>
                  </div>
                  {today && <span className="badge">Hoje</span>}
                </div>

                <div className="meta"><span>Tarefas</span><span>{done}/{list.length}</span></div>
                <div className="pr"><i style={{ width: `${list.length ? (done / list.length) * 100 : 0}%` }} /></div>

                <ul>
                  {list.length === 0 && <li className="empty">Nenhuma tarefa neste dia.</li>}
                  {list.map((t) => (
                    <li key={t.id} className={`task ${t.done ? "done" : ""}`}>
                      <button className="ck" aria-label="Concluir tarefa" onClick={() => toggleTask(k, t)}>{t.done ? "✓" : ""}</button>
                      <span className="t">{t.text}</span>
                      <button className="x" aria-label="Excluir tarefa" onClick={() => deleteTask(k, t.id)}>×</button>
                    </li>
                  ))}
                </ul>

                <input className="new" placeholder="+ Adicionar tarefa" maxLength={80} aria-label={`Nova tarefa em ${k}`}
                  onKeyDown={(e) => onEnter(e, (v) => addTask(k, v))} />
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}