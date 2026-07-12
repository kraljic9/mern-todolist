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

        const body = request.json();

        const {title} = body;

        if (!title) {
            return NextResponse.json('Error accured: title is requried')
        }

        const newTask = Task.create({
            title: title
        });

        return NextResponse.json(newTask)

     }catch(err){
        return NextResponse.json('Error accured:', err)
    }
}