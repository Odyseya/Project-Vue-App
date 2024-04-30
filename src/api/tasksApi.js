import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  // .order('id', { ascending: false })
  console.log('Data:', data)
  console.log('Error:', error)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

// CREATE TASK
export const createTask = async (task) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert(task).select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

// UPDATE TASK
export const updateTask = async (taskId, updatedTask) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedTask)
    .eq('id', taskId) //.eq expects the column name and the value to match
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

// DELETE TASK
export const deleteTaskById = async (id) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
  return true
}

// UPDATE COMPLETION STATUS
export const updateTaskStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_complete: status })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}
