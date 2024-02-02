import { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '../../../lib/api';
import Post from '../../../ui/Post';

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return <h1>post not found!</h1>;
  }

  return (
    <div className="space-y-16">
      <Post key={post.slug}>
        <Post.Header className="text-xs">
          <Post.Datetime className="text-gray font-normal">
            {post.datetime}
          </Post.Datetime>
          <Post.Category className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
            {post.category}
          </Post.Category>
        </Post.Header>
        <Post.Body>
          <Post.Title className="mt-8 text-2xl font-medium tracking-tighter hover:underline hover:decoration-blue-500 hover:decoration-wavy dark:decoration-slate-400 dark:hover:decoration-slate-500/50">
            {post.title}
          </Post.Title>
          <Post.Content className="mt-4 space-y-4 leading-6">
            {post.content}
          </Post.Content>
        </Post.Body>
      </Post>
    </div>
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);

  return {
    openGraph: {
      title: post.title,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}
