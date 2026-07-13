import mongoose from "mongoose";
import Task from "@/app/modules/route";
import connectDB from "@/db";
import { NextResponse } from "next/server";

// GET TODOS
export async function GET() {
    try{
        await connectDB();
        
        const task = await Task.find();

        if (!task || task.length === 0) {
            return NextResponse.json({ message: "No tasks found" }, { status: 404})
        }

        return NextResponse.json(task, {status: 200})

    }catch(err){
        return NextResponse.json('Error accured:', err)
    }
}

// ADD TODOS
export async function POST(request) {
     try{
        await connectDB();
        const body = await request.json();

        console.log(body)

        const {title} = body;

        console.log(title)

        if (!title) {
            return NextResponse.json('Error accured: title is requried', {status:400})
        }

        const newTask = await Task.create({
            title: title
        });

        return NextResponse.json(newTask)

     }catch(err){
        return NextResponse.json('Error accured:', err)
    }
}