import Head from 'next/head'
import fetch from 'isomorphic-fetch'
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

      {
        props.user && <div> <h2>Hi {props.user.oAuthData.displayName}</h2> <img src={props.user.avatar_url} /> </div>
      }
    </man>
  </div>
)

async function getUser(authorization) {
  const res = await fetch('http://localhost:3001/user', { headers: { authorization } })
  const data = await res.json()


  if (res.status === 200) return { authorization, user: data }
  else return {authorization}
}

Home.getInitialProps = async (ctx) => {

  const { authorization } = parseCookies(ctx);
  const {token} = ctx.query

  const props = getUser(authorization || token)

  return props;
}

export default Home
