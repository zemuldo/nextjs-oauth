import Head from 'next/head'
import { parseCookies } from 'nookies'

const Home = (props) => (
  <div className="container">
    <Head>
      <title>Nextjs OAuth with GitHub</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <man>
      <h1>Welcome to Nextjs OAuth with GitHub</h1>
      {
        !props.authorization && <a href={"http://localhost:3001/auth/github"} >Click here to login</a>
      }
    </man>
  </div>
)

Home.getInitialProps = (ctx) => {

  const { authorization } = parseCookies(ctx);
  return {
    authorization,
  };
}

export default Home
