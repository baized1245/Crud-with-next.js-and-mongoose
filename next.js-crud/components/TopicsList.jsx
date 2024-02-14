import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Faild to fetch topics')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function TopicsList() {
  const { topic } = await getTopics()
  return (
    <>
      {topic.map((t) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-center">
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} key={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

// export default TopicsList
