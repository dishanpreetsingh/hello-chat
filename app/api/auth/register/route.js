import User from "@models/User";
import { connectToDB } from "@mongodb/connection";
import { hash } from "bcryptjs";

export const POST = async (req,res) =>{
  try {
    await connectToDB();
    const body = await req.json();
    const { username, email, password } = body;
    const existingUser = await User.findOne({email});

    if (existingUser){
      return new Response("User already exists",{
        status: 400
      });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({username, email, password: hashedPassword});

    await user.save();

    return new Response(JSON.stringify(user), {status:201});
  } catch (error) {
    console.log('error into register API :>> ', error);
    return new Response("Failed to create new user", {
      status: 500,
    })
  }
}