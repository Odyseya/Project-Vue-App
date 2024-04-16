import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  // selecting all columns
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
  // const { error } = await supabase.from(TABLE_NAME).insert([task])
  const { data, error } = await supabase.from(TABLE_NAME).insert(task).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

// UPDATE TASK
// export const updateTask = async (taskId, updatedTask) => {
//   const { error } = await supabase.from(TABLE_NAME).update(updatedTask).eq('id', taskId)
//   if (error) {
//     throw new Error(error.message)
//   }
//   return true
// }

export const updateTask = async (taskId, updatedTask) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedTask)
    .eq('id', taskId)
    .select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

// DELETE TASK
export const deleteTaskById = async (id) => {
  //.eq expects the column name and the value to match.
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id)
  if (error) {
    throw new Error(error.message)
  }
  return true
}

// MARK TASK AS COMPLETE
// export const markTaskAsComplete = async (id) => {
//   const { data, error } = await supabase
//     .from('tasks')
//     .update({ is_complete: true })
//     .eq('id', id)
//     .select()

//   if (error) {
//     throw new Error(error.message)
//   }
//   return data[0]
// }

// // MARK TASK AS INCOMPLETE
// export const markTaskAsIncomplete = async (id) => {
//   const { data, error } = await supabase
//     .from('tasks')
//     .update({ is_complete: false })
//     .eq('id', id)
//     .select()

//   if (error) {
//     throw new Error(error.message)
//   }
//   return data[0]
// }

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
