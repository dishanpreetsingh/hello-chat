import Chat from "@models/Chat";
import Message from "@models/Message";
import User from "@models/User";
import { connectToDB } from "@mongodb/connection";

export const GET = async (req, {params}) =>{
try {
  await connectToDB();

  const { userId, query} = params;
console.log('query :>> ', query);
  const searchedChat = await Chat.find({
    members: userId,
    name: { $regex: query, $options: "i"},
  }).populate({
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
  }).exec();
  
console.log('searchedChat :>> ', searchedChat);
  return new Response(JSON.stringify(searchedChat), {status: 200});
} catch (error) {
  console.log('error while searching chatList :>> ', error);

  return new Response("Faild to search Chat  List.", { status: 500 });
}
}