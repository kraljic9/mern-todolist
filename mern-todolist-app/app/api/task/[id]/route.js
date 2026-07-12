import { NextResponse } from "next/server";
import mongoose from "mongoose";
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
        return NextResponse({message: 'Error accured:', err}, {status: 500})
    }
}