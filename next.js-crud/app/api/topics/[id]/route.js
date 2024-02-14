import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextResponse } from 'next/server'

// update method
export async function PUT(request, { params }) {
  const { id } = params
  const { newTitle: title, newDescription: description } = await request.json()
  await connectMongoDB()
  await Topic.findByIdAndUpdate(id, { title, description })
  return NextResponse.json({ message: 'Topic Updated' }, { status: 200 })
}

// get a single data: get method
export async function GET(request, { params }) {
  const { id } = params
  await connectMongoDB()
  const topic = await Topic.findOne({ _id: id })
  return NextResponse.json({ topic }, { status: 200 })
}
