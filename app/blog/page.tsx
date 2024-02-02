import { getAllPosts } from '../../lib/api';
import Post from '../ui/Post';

export default function Page() {
  const posts = getAllPosts();

  return (
    <div>
      {posts.map(post => (
        <Post key={post.slug}>
          <Post.Header className="text-xs">
            <Post.Datetime className="text-gray font-normal">
              {post.datetime}
            </Post.Datetime>
            <Post.Category className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
              {post.category}
            </Post.Category>
          </Post.Header>
          <Post.Link href={`/blog/${post.slug}`}>
            <Post.Title className="tracking-tighte mt-4 text-2xl font-medium">
              {post.title}
            </Post.Title>
            <Post.Excerpt className="mt-4 line-clamp-3 leading-6">
              {post.excerpt}
            </Post.Excerpt>
          </Post.Link>
        </Post>
      ))}
    </div>
  );
}
