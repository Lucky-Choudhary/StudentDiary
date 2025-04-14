import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { app } from "../firebaseAuth/main";
import { FirebaseError } from "firebase/app";

export async function POST(req: NextRequest) {
    const auth = getAuth(app);

    try {
        const { email, password } = await req.json();

        // Validate email and password
        if (!email || !password) {
            return NextResponse.json({
                status: false,
                error: "Email and password are required"
            }, {
                status: 400
            });
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json({
                status: false,
                error: "Password must be at least 6 characters long"
            }, {
                status: 400
            });
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = await userCredential.user.getIdToken(false);

        return NextResponse.json({
            status: true,
            userId
        });
    } catch (error) {
        if (error instanceof FirebaseError) {
            let errorMessage = "An error occurred during signup";
            
            // Handle specific Firebase error codes
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This email is already registered";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address";
                    break;
                case "auth/operation-not-allowed":
                    errorMessage = "Email/password accounts are not enabled";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password is too weak";
                    break;
                default:
                    errorMessage = error.message;
            }

            return NextResponse.json({
                status: false,
                error: errorMessage
            }, {
                status: 400
            });
        } else {
            console.error("Unknown error during signup:", error);
            return NextResponse.json({
                status: false,
                error: "An unexpected error occurred"
            }, {
                status: 500
            });
        }
    }
}


