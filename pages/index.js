import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const posts = await res.json()

  const allPostsData = await getSortedPostsData()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Umut. I'm a front-end developer. I'm learning Next.js to build modern web applications. I hope that it's going to be a fun learning journey 😊</p>
      </section>
      <section>
        <form action="/api/hello" method="post">
          <input type="text" name="email" />
          <button>Gönder!</button>
        </form>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
    
      </section>
    </Layout>
  )
}