import SidebarItem from "../components/SidebarItem";
import styles from "../styles/Home.module.css";
import Sidebar from "./Sidebar";

export const getStaticProps = async () => {
  const jsonRes = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );
  const res = await jsonRes.json();

  // Get data from response
  const data = res.data;

  // sort agents by their roles
  const controllers = data.filter(({ role }) => {
    return role.displayName === "Controller";
  });

  const duelists = data.filter(({ role }) => {
    return role.displayName === "Duelist";
  });

  const initiators = data.filter(({ role }) => {
    return role.displayName === "Initiator";
  });

  const sentinels = data.filter(({ role }) => {
    return role.displayName === "Sentinel";
  });

  return {
    props: { controllers, duelists, initiators, sentinels },
  };
};

// JSX Templates for mapping the agents
const mapAgent = (agent) => <SidebarItem agent={agent} />;

const Home = ({ controllers, duelists, initiators, sentinels }) => {
  return (
    <div className={styles.container}>
      <Sidebar
        controllers={controllers}
        duelists={duelists}
        initiators={initiators}
        sentinels={sentinels}
      />
    </div>
  );
};

export default Home;
