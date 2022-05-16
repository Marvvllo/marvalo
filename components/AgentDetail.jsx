import styles from "../styles/AgentDetail.module.css";
import Image from "next/image";

const AgentDetail = ({ agent }) => {
  return (
    <div className={styles.agentDetail}>
      <h1>{agent.displayName}</h1>
      <div className={styles.agentPortrait}>
        <Image src={agent.fullPortraitV2} width={500} height={500} />
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
  );
};

export default AgentDetail;
