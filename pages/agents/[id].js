import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import AgentDetail from "../../components/AgentDetail";
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

  const abilities = currentAgent.abilities.slice(0, 4);

  return {
    props: {
      controllers,
      duelists,
      initiators,
      sentinels,
      agent: currentAgent,
      abilities,
    },
  };
};

const AbilityDetails = ({ abilities, abilitySlot }) => {
  let currentAbility;
  let abilityKey;
  currentAbility = abilities.find(
    (ability) => ability.slot == abilitySlot
  );
  switch (currentAbility.slot) {
    case "Ability1":
      abilityKey = "Q - ";
      break;
    case "Ability2":
      abilityKey = "E - ";
      break;
    case "Grenade":
      abilityKey = "C - ";
      break;
    case "Ultimate":
      abilityKey = "X - ";
      break;
  }
  return (
    <div className={styles.abilityDetail}>
      <h3 className={styles.abilityName}>
        {abilityKey + currentAbility.displayName}
      </h3>
      <p className={styles.abilityDesc}>
        {currentAbility.description}
      </p>
    </div>
  );
};

const Details = ({
  agent,
  abilities,
  controllers,
  duelists,
  initiators,
  sentinels,
}) => {
  const [abilitySlot, setAbilitySlot] = useState("Ability1");
  const abilityClickHandler = (abilityClicked) => {
    setAbilitySlot(abilityClicked);
  };

  const mapAbilities = (ability) => {
    if (abilitySlot == ability.slot) {
      return (
        <div
          onClick={() => abilityClickHandler(ability.slot)}
          className={`${styles.ability} ${styles.active}`}
        >
          <Image src={ability.displayIcon} width={120} height={120} />
        </div>
      );
    }
    return (
      <div
        onClick={() => abilityClickHandler(ability.slot)}
        className={styles.ability}
      >
        <Image src={ability.displayIcon} width={120} height={120} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar
        controllers={controllers}
        duelists={duelists}
        initiators={initiators}
        sentinels={sentinels}
      />
      <main className={styles.content}>
        <div className={styles.abilitiesContainer}>
          <h2 className={styles.title}>Abilities</h2>
          <AbilityDetails
            abilities={abilities}
            abilitySlot={abilitySlot}
          />
          <div className={styles.abilitiesList}>
            {abilities.map(mapAbilities)}
          </div>
        </div>
      </main>
      <AgentDetail agent={agent} />
    </div>
  );
};

export default Details;
