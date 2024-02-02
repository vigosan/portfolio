const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Vicent Gozalbes',
    description: 'Developer, biker, and dj.',
    site_url: 'https://vicent.io',
    feed_url: 'https://vicent.io/feed.xml',
  });

  const posts = await fs.readdir(path.join(__dirname, '..', '_posts'));

  await Promise.all(
    posts.map(async name => {
      const content = await fs.readFile(
        path.join(__dirname, '..', '_posts', name),
      );
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: '/blog/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.datetime,
        description: frontmatter.data.excerpt,
      });
    }),
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
