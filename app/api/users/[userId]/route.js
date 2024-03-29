import Chat from "@models/Chat";
import Message from "@models/Message";
import User from "@models/User";
import { connectToDB } from "@mongodb/connection";

export const GET = async (req, {params}) => {
  try {
    await  connectToDB();

    const {userId} = params;
    
    const allChats = await Chat.find({members: userId})
      .sort({lastMessageAt: -1})
      .populate({
        path: "members",
        model: User,
      })
      .populate({
        path:"messages",
        model:Message,
        populate:{
          path:"sender seenBy",
          model: User
        },
      })
      .exec();

      return new Response(JSON.stringify(allChats), {status:200});
  } catch (error) {
    console.log("Error in getting ChatList", error);
    return new Response("Faild to get all chats of currecnt user", {status:500});
  }
}