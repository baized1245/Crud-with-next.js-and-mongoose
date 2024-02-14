'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const EditTopicForm = ({ id, description, title }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter()

  const hadleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Failed to update a topic')
      }
      router.refresh()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={hadleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={newTitle}
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={newDescription}
      />
      <button className="bg-rose-900 text-white p-2 w-fit" type="submit">
        Update Topic
      </button>
    </form>
  )
}

export default EditTopicForm
