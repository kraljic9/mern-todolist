import { NextResponse } from "next/server";
import connectDB from "@/db";
import Task from "../../../modules/route.js"

// GET SINGLE TASK
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const task = await Task.findById(id);
        
        if (!task) {
            return NextResponse.json({ message: `Error occurred: could not find task with id ${id}` }, { status: 404 });
        }

        return NextResponse.json(task, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Error occurred', error: err.message }, { status: 500 });
    }
}

// UPDATE TASK
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const body = await request.json();
        const { title, isCompleted } = body;
        const { id } = await params;

        const task = await Task.findById(id);
        if (!task) {
             return NextResponse.json({ message: `Error occurred: could not find task with id ${id}` }, { status: 404 });
        }

        if (title !== undefined) task.title = title;
        if (isCompleted !== undefined) task.isCompleted = isCompleted;

        const newTask = await task.save();
        return NextResponse.json({ message: "Task edited successfully", newTask }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Error occurred', error: err.message }, { status: 500 });
    }
}

// DELETE TASK
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return NextResponse.json({ message: `Error: could not find task with id ${id}` }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Error occurred', error: err.message }, { status: 500 });
    }
}