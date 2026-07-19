import connectDB from "@/db";
import Task from "../../modules/route.js";
import { NextResponse } from "next/server";

// GET ALL TASKS
export async function GET() {
    try {
        await connectDB();
        const tasks = await Task.find();
        return NextResponse.json(tasks || [], { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Error occurred', error: err.message }, { status: 500 });
    }
}

// CREATE A TASK
export async function POST(request) {
     try {
        await connectDB();
        const body = await request.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json({ message: 'Error occurred: title is required' }, { status: 400 });
        }

        const newTask = await Task.create({ title });
        return NextResponse.json(newTask, { status: 201 });
     } catch (err) {
        return NextResponse.json({ message: 'Error occurred', error: err.message }, { status: 500 });
    }
}