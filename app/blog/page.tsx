import { getAllPosts } from '../../lib/api';
import Post from '../../ui/Post';

export default function Page() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-medium tracking-tighter">blog</h1>
      <div className="mt-8 space-y-16 border-t border-gray-200 pt-8 ">
        {posts.map(post => (
          <Post key={post.slug}>
            <Post.Header className="text-xs">
              <Post.Datetime className="text-gray font-normal">
                {post.datetime}
              </Post.Datetime>
              <Post.Category className="rounded-full bg-gray-50 px-3 py-1.5 font-medium hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                {post.category}
              </Post.Category>
            </Post.Header>
            <Post.Link href={`/blog/${post.slug}`}>
              <Post.Body>
                <Post.Title
                  as="h2"
                  className="mt-4 text-2xl font-medium tracking-tighter hover:underline hover:decoration-blue-500 hover:decoration-wavy dark:decoration-slate-400 dark:hover:decoration-slate-500/50"
                >
                  {post.title}
                </Post.Title>
                <Post.Excerpt className="mt-4 leading-6">
                  {post.excerpt}
                </Post.Excerpt>
              </Post.Body>
            </Post.Link>
          </Post>
        ))}
      </div>
    </div>
  );
}
