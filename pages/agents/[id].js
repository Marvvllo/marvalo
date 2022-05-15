import Image from "next/image";
import Sidebar from "../Sidebar";
import styles from "../../styles/Details.module.css";

export const getStaticPaths = async () => {
  const jsonRes = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );
  const res = await jsonRes.json();
  const data = res.data;

  const paths = data.map((agent) => {
    return {
      params: { id: agent.uuid },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const allAgentJson = await fetch(
    "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
  );
  const allAgentsRes = await allAgentJson.json();

  // Get data from response
  const allAgents = allAgentsRes.data;

  // sort agents by their roles
  const controllers = allAgents.filter(({ role }) => {
    return role.displayName === "Controller";
  });

  const duelists = allAgents.filter(({ role }) => {
    return role.displayName === "Duelist";
  });

  const initiators = allAgents.filter(({ role }) => {
    return role.displayName === "Initiator";
  });

  const sentinels = allAgents.filter(({ role }) => {
    return role.displayName === "Sentinel";
  });

  const id = context.params.id;
  const currentAgentJson = await fetch(
    "https://valorant-api.com/v1/agents/" + id
  );
  const currentAgentRes = await currentAgentJson.json();
  const currentAgent = currentAgentRes.data;

  return {
    props: {
      controllers,
      duelists,
      initiators,
      sentinels,
      agent: currentAgent,
    },
  };
};

const Details = ({
  agent,
  controllers,
  duelists,
  initiators,
  sentinels,
}) => {
  return (
    <div className={styles.container}>
      <Sidebar
        controllers={controllers}
        duelists={duelists}
        initiators={initiators}
        sentinels={sentinels}
      />
      <main className={styles.content}>
        <p>{agent.description}</p>
      </main>
      <div className={styles.agentDetail}>
        <h1>{agent.displayName}</h1>
        <div className={styles.agentPortrait}>
          <Image
            src={agent.fullPortraitV2}
            width={500}
            height={500}
          />
        </div>

        <div className={styles.agentRoleContainer}>
          <p>/ / ROLE</p>
          <div className={styles.agentRole}>
            <h2>{agent.role.displayName}</h2>
            <Image
              src={agent.role.displayIcon}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
