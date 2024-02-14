import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextResponse } from 'next/server'

// Create a post : post method
export async function POST(request) {
  const { title, description } = await request.json()
  await connectMongoDB()
  await Topic.create({ title, description })
  return NextResponse.json({ message: 'Topic Created' }, { status: 201 })
}

// get method: reade data
export async function GET(request) {
  await connectMongoDB()
  const topic = await Topic.find()
  return NextResponse.json({ topic })
}

// delete method
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Topic.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Topic Deleted' }, { status: 200 })
}
