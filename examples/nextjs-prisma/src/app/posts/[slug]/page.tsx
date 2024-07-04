import prisma from "@/libs/db";

export default async function PostPage({ params }) {
  const post = await prisma.posts.findUnique({
    where: {
        slug: params.slug,
    }
  });

  
  
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
    <p>{post?.content}</p>
    </main>
  );
}
