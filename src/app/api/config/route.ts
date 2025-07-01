/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import bcrypt from 'bcrypt';

export async function GET(_request: NextRequest) {
    try {
        const { db } = await connectToDatabase();
        const config = await db.collection("infortoken").findOne({});

        if (!config) {
            return NextResponse.json({ message: "No configuration found" }, { status: 404 });
        }

        const { password_hash, ...rest } = config;
        return NextResponse.json(rest);
    } catch (error: unknown) {
        console.error("Error fetching configuration:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { db } = await connectToDatabase();
        const body = await request.json();

        // Extract password and other update data
        const { password, ...updateData } = body;

        // Fetch the existing configuration to get the stored password hash
        const existingConfig = await db.collection("infortoken").findOne({});

        if (!existingConfig || !existingConfig.password_hash) {
            // If no config exists or no password_hash, it's an initial setup or an error.
            // For initial setup, you might want a separate route or a default password.
            // For now, deny update if no password_hash exists.
            return NextResponse.json({ message: "Configuration not initialized or password not set." }, { status: 400 });
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, existingConfig.password_hash);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Mật khẩu không đúng." }, { status: 401 });
        }

        // Exclude password_hash and _id from the update operation
        const { password_hash: _password_hash, _id, ...finalUpdateData } = updateData;

        // Assuming there's only one config document, or you have a way to identify it.
        // For this example, we'll find the first document and update it.
        const filter = {}; // Find any document

        const result = await db.collection("infortoken").updateOne(
            filter,
            { $set: finalUpdateData },
            { upsert: true } // Create if not exists
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            return NextResponse.json({ message: "Failed to update or create configuration" }, { status: 500 });
        }

        return NextResponse.json({ message: "Configuration updated successfully" });
    } catch (error: unknown) {
        console.error("Error updating configuration:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
} 