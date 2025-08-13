/**
 * Todo service encapsulating Supabase calls.
 * Table schema expectation: 'todos' with columns:
 * - id: uuid (default)
 * - title: text
 * - completed: boolean (default false)
 * - created_at: timestamp (default now())
 */
import { getSupabase } from '../lib/supabaseClient';
import { TODO_TABLE } from '../utils/constants';

/** Utility: unwrap Supabase response or throw. */
function handleResponse({ data, error }) {
  if (error) throw error;
  return data;
}

/** Map raw record to application shape. */
function mapTodo(r) {
  return {
    id: r.id,
    title: r.title,
    completed: !!r.completed,
    created_at: r.created_at,
  };
}

// PUBLIC_INTERFACE
export async function fetchTodos() {
  /** Fetch all todos ordered by created_at DESC. */
  const supabase = getSupabase();
  const resp = await supabase.from(TODO_TABLE).select('*').order('created_at', { ascending: false });
  const data = handleResponse(resp);
  return (data || []).map(mapTodo);
}

// PUBLIC_INTERFACE
export async function addTodo(title) {
  /** Create a new todo with provided title (completed=false). */
  const supabase = getSupabase();
  const resp = await supabase
    .from(TODO_TABLE)
    .insert([{ title, completed: false }])
    .select()
    .single();
  const data = handleResponse(resp);
  return mapTodo(data);
}

// PUBLIC_INTERFACE
export async function updateTodo(id, partial) {
  /** Update an existing todo by id with provided fields. */
  const supabase = getSupabase();
  const resp = await supabase.from(TODO_TABLE).update(partial).eq('id', id).select().single();
  const data = handleResponse(resp);
  return mapTodo(data);
}

// PUBLIC_INTERFACE
export async function toggleTodoCompleted(id, nextCompleted) {
  /** Toggle completion state for a todo by id. */
  const supabase = getSupabase();
  const resp = await supabase.from(TODO_TABLE).update({ completed: nextCompleted }).eq('id', id).select().single();
  const data = handleResponse(resp);
  return mapTodo(data);
}

// PUBLIC_INTERFACE
export async function deleteTodo(id) {
  /** Delete a todo by id. Returns true if success. */
  const supabase = getSupabase();
  const resp = await supabase.from(TODO_TABLE).delete().eq('id', id);
  handleResponse(resp);
  return true;
}
