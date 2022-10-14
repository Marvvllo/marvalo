import SidebarItem from "../components/SidebarItem";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import Head from "next/head";

export const getStaticProps = async () => {
  const jsonRes = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );
  const res = await jsonRes.json();

  // Get data from response
  const agents = res.data;

  return {
    props: { agents },
  };
};

const Home = ({ agents }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Sidebar agents={agents} />
      </div>
    </>
  );
};

export default Home;
