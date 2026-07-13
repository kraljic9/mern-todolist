import { NextResponse } from "next/server";
import connectDB from "@/db";
import Task from "@/app/modules/route";

export async function GET(request, {params}) {
    try{
        await connectDB()
        
        const {id} = await params
        const task = await Task.findById(id)
        
        console.log(task)
        
        if (!task) {
            return NextResponse({message: `Error accured: could not find task with id ${id}`}, {status: 400})
        }

        return NextResponse.json(task, {status: 200})
    }catch(err){
        return NextResponse.json({message: 'Error accured:', err}, {status: 500})
    }
}

export async function PUT(request, {params}) {
    try{

        await connectDB();

        const body = await request.json();
        const {title, isCompleted} = body

        const {id} = await params;
        const task = await Task.findById(id);

        if (!task) {
             return NextResponse({message: `Error accured: could not find task with id ${id}`}, {status: 400})
        }

        if (title !== undefined) task.title = title
        if (isCompleted !== undefined) task.isCompleted = isCompleted

        const newTask = await task.save();

        return NextResponse.json({ message: "Task edited successfully", newTask }, { status: 200 });

    }catch(err) {
        return NextResponse.json({message: 'Error accured:', err}, {status: 500})
    }
}

export async function DELETE(request, {params}) {
    try{

        await connectDB();

        const {id} = await params;

        const deleteTask = await Task.findByIdAndDelete(id);

        if (!deleteTask) {
            return NextResponse.json(`Error could not find task with id ${id}`)
        }

        return NextResponse.json(`Task deleted sucessfully`, {status: 200});

    }catch(err){
        return NextResponse.json({message: 'Error accured:', err}, {status: 500})
    }
}