import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import AgentDetail from "../../components/AgentDetail";
import styles from "../../styles/Details.module.css";
import AbilitiesList from "../../components/AbilitiesList";
import AbilityDetails from "../../components/AbilityDetails";
import Head from "next/head";

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

  const id = context.params.id;
  const currentAgentJson = await fetch(
    "https://valorant-api.com/v1/agents/" + id
  );
  const currentAgentRes = await currentAgentJson.json();
  const currentAgent = currentAgentRes.data;

  const abilities = currentAgent.abilities.slice(0, 4);

  return {
    props: {
      allAgents,
      agent: currentAgent,
      abilities,
    },
  };
};

const Details = ({ allAgents, agent, abilities }) => {
  const [abilitySlot, setAbilitySlot] = useState("Ability1");

  return (
    <div className={styles.container}>
      <Head>
        <title>Marvalo - {agent.displayName}</title>
      </Head>
      <Sidebar agents={allAgents} />
      <main className={styles.content}>
        <div className={styles.abilitiesContainer}>
          <h2 className={styles.title}>Abilities</h2>
          <AbilityDetails
            abilities={abilities}
            abilitySlot={abilitySlot}
          />
          <AbilitiesList
            abilities={abilities}
            abilitySlot={abilitySlot}
            setAbilitySlot={setAbilitySlot}
          />
        </div>
      </main>
      <AgentDetail agent={agent} />
    </div>
  );
};

export default Details;
