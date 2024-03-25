import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    // selecting all columns
    .select('*')
  // .order('id', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

//CREATE TASK
export const createTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).insert(task)

  if (error) {
    throw new Error(error.message)
  }
  return true
}

// UPDATE TASK
export const updateTask = async (id, updatedTask) => {
  const { error } = await supabase.from(TABLE_NAME).update(updatedTask).eq({ id: task.id })
  //  .match({ id: id })

  if (error) {
    throw new Error(error.message)
  }
  return true
}

// DELETE TASK
export const deleteTask = async (id) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq({ id: task.id })
  // .match({ id: id })

  if (error) {
    throw new Error(error.message)
  }
  return true
}
